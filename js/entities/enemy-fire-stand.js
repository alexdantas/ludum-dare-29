/**
 * Simple enemy that simply stands there.
 */

/*global game,me*/

game.enemyFireStand = me.ObjectEntity.extend({

	init : function(x, y, settings) {

		// The `settings` hash is defined on Tiled.

		// This image is defined on `resources.js`
		settings.image = "fire-stand";

		// There we specify `width`, which we'll use as the path
		// this enemy will follow; saving it...
		var pathWidth  = settings.width;
		var pathHeight = settings.height;

		// Adjust the size setting to match the sprite size
		settings.spritewidth  = settings.width  = 32;
		settings.spriteheight = settings.height = 32;

		this.parent(x, y, settings);

		// Adjusting the collision rectangle to the sprite
		// (not taking the whole image)
		var shape = this.getShape();

		shape.pos.x = 6;
		shape.pos.y = 4;
		shape.resize(
			shape.width  - 2*shape.pos.x,
			shape.height - 2*shape.pos.y
		);

		// Animation!
		this.renderable.addAnimation("standing", [0, 1], 200);
		this.renderable.setCurrentAnimation("standing");

		this.health = 10;

		this.collidable = true;
		this.type = me.game.ENEMY_OBJECT;
	},

	/**
	 * Called by engine when colliding with other object.
	 * `obj` corresponds to object collided with
	 */
	onCollision : function(res, obj) {

		// `(res.y > 0)` means touched by something
		// on the bottom

		if (this.alive && (res.y > 0) && obj.falling) {
			this.renderable.flicker(750);
			this.health -= 5;
		}
	},

	// Manage enemy movement
	update : function(delta) {

		// Do nothing if not on the screen
		if (! this.inViewport)
			return false;

		if (this.health <= 0) {
			me.game.world.removeChild(this);
			return true;
		}

		// (is this necessary?)
		this.updateMovement();

		this.parent(delta);
		return true;
	}
});

