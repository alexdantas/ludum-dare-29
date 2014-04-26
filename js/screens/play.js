/**
 * Screen that will be shown while the game
 * is being played.
 *
 * Note: The game loop is hidden inside melonJS.
 *       So the whole game logic is specified inside
 *       each entity.
 *       Go look the files on `js/entities`
 */

/*global game,me*/

game.PlayScreen = me.ScreenObject.extend({

	/**
	 *  What to do when starting this screen.
	 */
	onResetEvent : function() {

		// Load the first level
		me.levelDirector.loadLevel("area01");

		// Reset the score
		game.data.score = 0;

		// Add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},

	/**
	 *  What to do when leaving this screen.
	 */
	onDestroyEvent : function() {

		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});


