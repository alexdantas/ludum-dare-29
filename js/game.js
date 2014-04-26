/* This is where it all starts.
 *
 * Initializing melonJS and the "Game Namespace".
 */

/*global me*/

var game = {

	/* Stores some information
	 * that can be saved later
	 */
	data : {
		score : 0
	},

	/* Run as soon as the page loads
	 * (all resources downloaded)
	 */
	"onload" : function() {

		// Initialize the video.
		if (!me.video.init("screen", 640, 480, true)) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// Add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function() {
				me.plugin.register.defer(this, debugPanel, "debug");
			});
		}

		// Initialize the audio.
		me.audio.init("mp3,ogg");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		// (pre-defined state)
		me.state.change(me.state.LOADING);
	},

	/* Run as soon as all the game resources loads
	 * (past the loading screen)
	 */
	"loaded" : function() {

		// All the game states/screens
		// Each has it's file under the `js/screens` directory
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Global transition to occur between all states
		me.state.transition("fade", "#000000", 250);

		// Add game entities to the entity pool.
		// They're defined on the `js/entities` directory
		//
		// That first string is the name we'll look for
		// when reading Tiled maps' entities.
		me.pool.register("player", game.playerEntity);
		me.pool.register("coin",   game.coinEntity);
		me.pool.register("enemy",  game.enemyEntity);

		// Enable the keyboard
		// Supporting both arrow keys and WASD
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.A,     "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.D,     "right");
		me.input.bindKey(me.input.KEY.UP,    "jump",  true);
		me.input.bindKey(me.input.KEY.W,     "jump",  true);
		me.input.bindKey(me.input.KEY.SHIFT, "boost", true);

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
