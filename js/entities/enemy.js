/**
 * A simple enemy that follows a pre-determined path.
 *
 * It is specified on Tiled.
 */

/*global game,me*/

game.enemyEntity = me.ObjectEntity.extend({

	init : function(x, y, settings) {

		// The `settings` hash is defined on Tiled.
		settings.image = "enemy";

		// There we specify `width`, which we'll use as the path
		// this enemy will follow; saving it...
		var pathWidth  = settings.width;
		var pathHeight = settings.height;

		// Adjust the size setting to match the sprite size
		settings.spritewidth  = settings.width  = 49;
		settings.spriteheight = settings.height = 48;

		this.parent(x, y, settings);

		// Set start/end position based on that initial area
		// size given by Tiled.
		x = this.pos.x;

		this.startX = x;
		this.endX   = x + pathWidth - settings.spritewidth;

		// Make him start from the right
		this.pos.x    = x + pathWidth - settings.spritewidth;
		this.walkLeft = true;

		// Adjusting the collision rectangle
		// to the sprite - not taking the whole image.
		var shape = this.getShape();
		shape.pos.x = 3;
		shape.resize(43, shape.height);
		//this.updateColRect(3, 43, 0, 44);

		// X and Y velocities
		this.setVelocity(2.5, 6);

		this.health = 10;

		this.renderable.addAnimation("walking", [0, 1], 400);
		this.renderable.setCurrentAnimation("walking");

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

		// Making it stay between it's boundaries
		if (this.alive) {

			if (this.walkLeft && this.pos.x <= this.startX)
				this.walkLeft = false;

			else if (!this.walkLeft && this.pos.x >= this.endX)
				this.walkLeft = true;

			// Make it walk
			this.vel.x += ((this.walkLeft) ? (-this.accel.x * me.timer.tick) : (this.accel.x * me.timer.tick));

			// Fliip the sprite if necessary
			this.flipX(this.walkLeft);

		} else {
			this.vel.x = 0;
		}

		this.updateMovement();

		// Update animation if necessary
		if (this.vel.x != 0 || this.vel.y != 0) {

			// Update object animation
			this.parent(delta);
			return true;
		}
		return false;
	}
});

