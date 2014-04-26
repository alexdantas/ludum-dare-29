/**
 * Little coin, that can be collected by the player
 * increasing score.
 */

/*global game,me*/

game.coinEntity = me.CollectableEntity.extend({

	init : function(x, y, settings) {

		settings.image = "beer";
		settings.width = 21;
		settings.height = 24;
		settings.spritewidth = 21;
		settings.spriteheight = 24;

		this.parent(x, y, settings);
	},

	// Function called by the engine when object
	// is touched by something
	onCollision : function() {

		// do something when collected
		game.data.score += 5;

		// make sure it can't be collected again
		this.collidable = false;

		me.game.world.removeChild(this);
	}
});

