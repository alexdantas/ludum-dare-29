/**
 * Single-tile spike that kills the player in contact
 */

/*global game,me*/

game.spikeEntity = me.ObjectEntity.extend({

	init : function(x, y, settings) {

		// The `settings` hash is defined on Tiled.

		// This image is defined on `resources.js`
		settings.image = "spike";

		// Adjust the size setting to match the sprite size
		settings.spritewidth  = settings.width  = 32;
		settings.spriteheight = settings.height = 32;

		this.parent(x, y, settings);

		this.collidable = true;
		this.type = me.game.SPIKE_OBJECT;
	}

	// No need to overload more functions
	// since the entity will just stand there
});

