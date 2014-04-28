/**
 * Little coin, that can be collected by the player
 * increasing score.
 */

/*global game,me*/

game.starEntity = me.CollectableEntity.extend({

	init : function(x, y, settings) {

		settings.image = "star-spritesheet";

		settings.width  = 32;
		settings.height = 32;
		settings.spritewidth  = 32;
		settings.spriteheight = 32;

		this.parent(x, y, settings);

		this.renderable.addAnimation("shine", [0, 1, 2, 3], 150);
		this.renderable.setCurrentAnimation("shine");
	},

	// Function called by the engine when object
	// is touched by something
	onCollision : function() {

		// do something when collected
		game.data.score += 5;

		// make sure it can't be collected again
		this.collidable = false;

		me.game.world.removeChild(this);
		me.audio.play("cling");
	}
});

