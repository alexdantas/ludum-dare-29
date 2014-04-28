/* This is where it all starts.
 *
 * Initializing melonJS and the "Game Namespace".
 */

/*global me debugPanel*/

var game = {

	/* Stores some information
	 * that can be saved later
	 */
	data : {
		score : 0
	},

	/**
	 * Global tile size.
	 * Throughout the game, this is the value that
	 * will be used for the square tiles, width AND height.
	 */
	tile_size : 32,

	/**
	 * Returns the pixel coordinates for a specific
	 * tile.
	 *
	 * This is so we can always work with tile sizes
	 * instead of directly with pixels.
	 */
	tile : function(n) {
		return (n * game.tile_size);
	},

	/**
	 * Returns the pixel coordinates for half the
	 * size of a regular tile.
	 */
	half_tile : function(n) {
		return (n * (game.tile_size/2));
	},

	/**
	 * This function runs as soon as the page loads.
	 *
	 * Meaning when all resources were downloaded from
	 * the server (GET requests).
	 *
	 * At the end, it launches the Loading Screen.
	 */
	"onload" : function() {

		// Initialize the video.
		if (! me.video.init("screen", 480, 480, true)) {
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
		me.audio.init("ogg,mp3");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		// (pre-defined state)
		me.state.change(me.state.LOADING);
	},

	/**
	 * Run as soon as all the game resources loads
	 * (past the loading screen).
	 */
	"loaded" : function() {

		// Defining all our game states.
		// They're used by `me.state.change()`
		// (these are just constants, ignore the right side)
		me.state.STATE_MAIN_MENU    = me.state.USER + 0;
		me.state.STATE_OPTIONS_MENU = me.state.SETTINGS;
		me.state.STATE_CREDITS      = me.state.CREDITS;
		me.state.STATE_GAME_OVER    = me.state.GAMEOVER;
		me.state.STATE_AREA_SELECT  = me.state.USER + 2;
		me.state.STATE_PLAY         = me.state.PLAY;

		// Attaching our state constants to actual
		// objects.
		// Each one has it's file under the `js/screens` directory
		me.state.set(me.state.STATE_MAIN_MENU, new game.MainMenuState());
		me.state.set(me.state.STATE_PLAY,      new game.PlayState());
		me.state.set(me.state.STATE_GAME_OVER, new game.GameOverState());

		// Global transition to occur between all states
		me.state.transition("fade", "#000000", 250);

		// Add game entities to the entity pool.
		// They're defined on the `js/entities` directory
		//
		// That first string is the name we'll look for
		// when reading Tiled maps' entities.
		me.pool.register("player", game.playerEntity);
		me.pool.register("star",   game.starEntity);
		me.pool.register("spike",  game.spikeEntity);

		me.pool.register("enemy-fire-walk",  game.enemyFireWalk);
		me.pool.register("enemy-fire-stand", game.enemyFireStand);

		// Defining some custom constants to uniquely
		// identify some entities
		me.game.SPIKE_OBJECT = "spike";

		// Global font - we'll use this to draw
		// text on all game states
		me.game.font = new me.BitmapFont("font16x16", 16);

		// Default settings for the whole game.
		// If we already have saved these settings,
		// they won't have their default values.
		me.save.add({
			// Flag to tell if this is the first time
			// the player's running this game.
			firstTime : true,

			sound : true
		});


		// If these settings have different values
		// than the default it means we saved the
		// settings and the user is restarting the game.
		if (me.save.firstTime) {
			// Do somethin'
		}
		else {
			// Greet the player for returning
			// to the game
		}
		me.save.firstTime = false;

		// Due to the way melonJS is designed, we must
		// first play the background music AND THEN
		// enable/disable the audio based on the
		// settings...
		me.audio.playTrack("dst-inertexponent");

		if (! me.save.sound)
			me.audio.disable();

		// Start the game.
		me.state.change(me.state.STATE_MAIN_MENU);
	}
};

