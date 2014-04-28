/**
 * Main Menu game state.
 *
 * Shows the main menu and if the user presses
 * ENTER or clicks or taps the state, goes to
 * the Play state.
 *
 * It's a simple background image with a scrollable text.
 */

/*global game,me*/

game.MainMenuState = me.ScreenObject.extend({

	/**
	 * Runs when entering the state.
	 */
	onResetEvent : function() {

		// Creating and adding the background image
		me.game.world.addChild(
			new me.SpriteObject(
				0, 0,
				me.loader.getImage("main-menu-bg")
			),
			1
		);

		this.menu = new me.Menu(game.tile(1), game.tile(8));
		this.menu.addItem(
			"START",
			function () {
				// It's very ugly to directly
				// access a game state...
				me.state.current().startGame();

//				menu.label = "LEL";
//				me.state.current().menu.toggle();
				console.log("Clicked first button");
			}
		);
		this.menu.addItem(
			"OPTIONS",
			function () {
				console.log("Clicked second button");
			}
		);
		this.menu.addItem(
			"CREDITS",
			function () {
				console.log("Clicked third button");
			}
		);

		me.game.world.addChild(this.menu);

		// Creating and adding the scrollable text
		me.game.world.addChild(new (me.Renderable.extend ({

			// Constructor
			init : function() {
				this.parent(new me.Vector2d(0, 0),
				            me.game.viewport.width,
				            me.game.viewport.height);

				// tween to animate the arrow
				this.scrollertween = new me.Tween(this)
					.to({ scrollerpos: -2200 }, 10000)
					.onComplete(this.scrollover.bind(this))
					.start();

				// For now the only messages supported are
				// in ALL CAPS due to the bitmap font
				this.scroller    = "*THANKS FOR PLAYING THIS GAME*";
				this.scrollerpos = 600;
			},

			// Callback for the tween objects
			scrollover : function() {

				// reset to default value
				this.scrollerpos = 600;
				this.scrollertween
					.to({scrollerpos: -2200 }, 10000)
					.onComplete(this.scrollover.bind(this))
					.start();
			},

			update : function(dt) {
				return true;
			},

			draw : function(context) {
				var xoffset = game.half_tile(10);

				me.game.font.draw(context, "PRESS ENTER", xoffset, game.half_tile(24));
				me.game.font.draw(context, "   CLICK", xoffset, game.half_tile(25));
				me.game.font.draw(context, "   TOUCH",       xoffset, game.half_tile(26));

				me.game.font.draw(context, this.scroller, this.scrollerpos, game.half_tile(29));
			},

			onDestroyEvent : function() {
				// just in case
				this.scrollertween.stop();
			}
		})), 2);


		// Checking out the user input:
		// control the menu with arrow keys and select with Enter
		me.input.bindKey(me.input.KEY.DOWN,  "down");
		me.input.bindKey(me.input.KEY.UP,    "up");
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);

//		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {

			if (action == "down")
				me.state.current().menu.next();

			else if (action == "up")
				me.state.current().menu.previous();

			else if (action == "enter")
				me.state.current().menu.activate();
		});
	},

	startGame : function() {
		// Play some audio before startin'

		me.state.change(me.state.STATE_PLAY);
	},

	/**
	 * Action to perform when leaving the state (state change).
	 */
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.DOWN, "down");
		me.input.unbindKey(me.input.KEY.UP,   "up");
		me.input.unbindKey(me.input.KEY.ENTER);

		me.event.unsubscribe(this.handler);
	}
});

