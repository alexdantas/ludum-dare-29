/**
 * Displays information on the screen
 * (like health and score).
 */

/*global game,me*/

game.HUD = game.HUD || {};

/**
 * Container for all possible HUDs on the game.
 */
game.HUD.Container = me.ObjectContainer.extend({

	init : function() {
		// call the constructor
		this.parent();

		// persistent across level change
		this.isPersistent = true;

		// non collidable
		this.collidable = false;

		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";

		// Adding our Score HUD at the right-bottom position
		this.addChild(
			new game.HUD.score(
				me.game.viewport.width,
				me.game.viewport.height - 16
			)
		);
	}
});

/**
 * Basic HUD item to display score.
 */
game.HUD.score = me.Renderable.extend({

	init : function(x, y) {

		// call the parent constructor
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10);

		// Won't use the global font because to draw
		// the score it needs to be aligned to the right
		this.font = new me.BitmapFont("font16x16", 16);
		this.font.set("right");

		// local copy of the global score
		this.score = -1;

		// Make sure we use screen coordinates
		// (not relative)
		this.floating = true;
	},

	update : function() {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * Draw the score
	 */
	draw : function(context) {
		this.font.draw(context, game.data.score, this.pos.x, this.pos.y);
	}
});

