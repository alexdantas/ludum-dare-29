/**
 * Game Over game state.
 *
 * Simply shows a text and waits for a keypress (or click/touch)
 * so we can return to the main menu.
 */

/*global game,me*/

game.GameOverState = me.ScreenObject.extend({

	/**
	 * Runs when entering the state.
	 */
	onResetEvent : function() {

		// Creating the text to be printed
		// showing "GAME OVER"
		me.game.world.addChild(new (me.Renderable.extend ({

			init : function() {

				// Rectangle of the size of the screen
				this.parent(new me.Vector2d(0, 0),
				            me.game.viewport.width,
				            me.game.viewport.height);
			},

			update : function(dt) {
				return true;
			},

			draw : function(context) {
				var xoffset = 16 * 5;
				var yoffset = 16 * 22;

				me.game.font.draw(context, "GAME OVER", xoffset, yoffset);
			}

		})), 2);

		// When we press any key or click/tap, will return to the
		// main menu.
		//
		// But we don't want to check for that immediately, since the
		// user might be banging his head on the keyboard when he dies.
		//
		// So we'll create a timeout (in milliseconds).
		// When it happens, we'll look out for keypress events.
		me.timer.setTimeout(me.state.current().watchForKeypresses, 500);
	},

	/**
	 * Starts monitoring user's keypresses.
	 *
	 * @note This function is called independently
	 *       of the object existing!
	 *       That's why we access ourselves with
	 *       `me.state.current()` instead of `this`
	 */
	watchForKeypresses : function() {

		// Here we're making the click/tap event seem like the key ENTER
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);

		// This way, for any key pressed (or click/tap),
		// we'll go to the main menu
		me.state.current().handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
			me.state.change(me.state.STATE_MAIN_MENU);
		});
	},

	/**
	 * Action to perform when leaving the state (state change).
	 */
	onDestroyEvent : function() {
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindPointer(me.input.mouse.LEFT);
		me.event.unsubscribe(this.handler);
	}
});

