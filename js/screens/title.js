/**
 * Title screen.
 * Shows the main menu and if the user presses
 * ENTER or clicks or taps the screen, goes to
 * the Play screen.
 *
 * It's a simple background image with a scrollable text.
 */

/*global game,me*/

game.TitleScreen = me.ScreenObject.extend({

	/**
	 * Runs when entering the screen.
	 */
	onResetEvent : function() {

		// Creating and adding the background image
		me.game.world.addChild(
			new me.SpriteObject(
				0, 0,
				me.loader.getImage("title_screen")
			),
			1
		);

		// Creating and adding the scrollable text
		me.game.world.addChild(new (me.Renderable.extend ({

			// Constructor
			init : function() {
				this.parent(new me.Vector2d(0, 0),
				            me.game.viewport.width,
				            me.game.viewport.height);

				// font for the scrolling text
				// this.font = new me.BitmapFont("menu_font", 32);
				this.font = new me.Font("Arial", 32);

				// tween to animate the arrow
				this.scrollertween = new me.Tween(this)
					.to({ scrollerpos: -2200 }, 10000)
					.onComplete(this.scrollover.bind(this))
					.start();

				// For now the only messages supported are
				// in ALL CAPS due to the bitmap font
				this.scroller    = "Thanks for playing this game!";
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
				this.font.draw(context, "Press Enter, Click or Tap to play", 15, 340);
				this.font.draw(context, this.scroller, this.scrollerpos, 440);
			},

			onDestroyEvent : function() {
				// just in case
				this.scrollertween.stop();
			}
		})), 2);

		// Change to Play state when pressing Enter or click/tap
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {

			if (action == "enter") {
				// Play some audio on tap/enter

				me.state.change(me.state.PLAY);
			}
		});
	},

	/**
	 * Action to perform when leaving the screen (state change).
	 */
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.mouse.LEFT);

		me.event.unsubscribe(this.handler);
	}
});

