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
		//
		// @warning On mobile devices this takes FOREVER
		//          There must be a way I can warn the users
		//          of such behavior.
		me.levelDirector.loadLevel(game.data.currentLevel);

		// Reset the score
		game.data.score = 0;


		// Add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);


		// Placing a "pause" button right
		// on the bottom of the screen.
		// Must create a menu because no item
		// can live alone.
		this.menu = new me.Menu(-game.tile(2), me.game.viewport.height - game.tile_size);
		this.menu.addItem(
			"PAUSE", // label
			function() {
				((me.state.isPaused() ?
				  me.state.resume(true) :
				  me.state.pause(true)));
			},
			new me.Vector2d(game.tile(2) + 4, 12) //labeloffset
		);
		me.game.world.addChild(this.menu);

		// Input
		// Supporting both arrow keys and WASD
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.A,     "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.D,     "right");
		me.input.bindKey(me.input.KEY.UP,    "jump");
		me.input.bindKey(me.input.KEY.W,     "jump");
		me.input.bindKey(me.input.KEY.SHIFT, "boost", false, true);

		// Extra keys reserved for the developers
		// Don't you try to cheat using those!
		if (game.debugMode) {
			me.input.bindKey(me.input.KEY.I, "die");
			me.input.bindKey(me.input.KEY.O, "score+");
			me.input.bindKey(me.input.KEY.P, "score-");
			me.input.bindKey(me.input.KEY.K, "area+");
			me.input.bindKey(me.input.KEY.L, "area-");
		}

		// To make able to control the game with the mouse
		// we must watch for those events (mouse up and down)
		//
		// Unfortunately we have to keep two different functions
		// for this.
		//
		// But since they're events, we have MULTITOUCH support!
		me.input.registerPointerEvent(
			'pointerdown',
			me.game.viewport,
			this.mouseDown.bind(this)
		);
		me.input.registerPointerEvent(
			'pointerup',
			me.game.viewport,
			this.mouseUp.bind(this)
		);
	},

	/**
	 * User started pressing the mouse/finger
	 * anywhere on the screen.
	 * @note This is not an automatic callback from
	 *       melonJS! I register this function at
	 *       the end of `init`.
	 */
	mouseDown : function() {
		this.clickOnGameArea(true);
	},

	/**
	 * User released the mouse/finger
	 * anywhere on the screen.
	 * @note This is not an automatic callback from
	 *       melonJS! I register this function at
	 *       the end of `init`.
	 */
	mouseUp : function() {
		this.clickOnGameArea(false);
	},

	/**
	 * Reacts to a click/touch the user made on the
	 * game area.
	 * The argument tells if the mouse/finger is
	 * pressed or released.
	 *
	 * This is where the magic is!
	 * We trigger a false key event based on clicks!
	 *
	 * - If you click/touch the upper area, character
	 *   jumps.
	 * - If you click on the lower area left side the
	 *   character walks left, and on the right side
	 *   it walks right.
	 */
	clickOnGameArea : function (isClickDown) {

		var mouseX = me.input.mouse.pos.x;
		var mouseY = me.input.mouse.pos.y;

		// Top Area
		if (mouseY < me.game.viewport.height/2) {
			me.input.triggerKeyEvent(me.input.KEY.UP, isClickDown);
			return;
		}

		// Bottom Area
		// Character will run! That's why this SHIFT is here for.
		me.input.triggerKeyEvent(me.input.KEY.SHIFT, isClickDown);

		// Bottom Left Area
		if (mouseX < me.game.viewport.width/2)
			me.input.triggerKeyEvent(me.input.KEY.LEFT, isClickDown);

		// Bottom Right Area
		else
			me.input.triggerKeyEvent(me.input.KEY.RIGHT, isClickDown);
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

		if (game.debugMode) {
			me.input.unbindKey(me.input.KEY.I, "die");
			me.input.unbindKey(me.input.KEY.O, "score+");
			me.input.unbindKey(me.input.KEY.P, "score-");
			me.input.unbindKey(me.input.KEY.K, "area+");
			me.input.unbindKey(me.input.KEY.L, "area-");
		}
	}
});


