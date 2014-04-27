/**
 * State that will be shown while the game
 * is being played.
 *
 * Note: The game loop is hidden inside melonJS.
 *       So the whole game logic is specified inside
 *       each entity.
 *       Go look the files on `js/entities`
 */

/*global game,me*/

game.PlayState = me.ScreenObject.extend({

	/**
	 *  What to do when starting this state.
	 */
	onResetEvent : function() {

		// Load the first level
		me.levelDirector.loadLevel("area00");

		// Reset the score
		game.data.score = 0;

		// Add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		// Supporting both arrow keys and WASD
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.A,     "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.D,     "right");
		me.input.bindKey(me.input.KEY.UP,    "jump");
		me.input.bindKey(me.input.KEY.W,     "jump");
		me.input.bindKey(me.input.KEY.SHIFT, "boost", false, true);
	},

	/**
	 *  What to do when leaving this state.
	 */
	onDestroyEvent : function() {

		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);

		// Supporting both arrow keys and WASD
		me.input.unbindKey(me.input.KEY.LEFT,  "left");
		me.input.unbindKey(me.input.KEY.A,     "left");
		me.input.unbindKey(me.input.KEY.RIGHT, "right");
		me.input.unbindKey(me.input.KEY.D,     "right");
		me.input.unbindKey(me.input.KEY.UP,    "jump",  true);
		me.input.unbindKey(me.input.KEY.W,     "jump",  true);
		me.input.unbindKey(me.input.KEY.SHIFT, "boost", true);
	}
});


