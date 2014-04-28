/**
 * A (vertical) menu that can be interacted with
 * both the keyboard and mouse (and thus touch).
 *
 * Displays items that can be selected or not.
 * It automatically handles positioning, images and
 * stuff.
 *
 * All you need to do is provide item titles and callbacks.
 *
 * Example:
 *
 * var menu = new me.Menu(x, y);
 *
 * // You can add as many as you want
 * menu.addItem(
 *     "title",
 *     function() {
 *         console.log("Clicked");
 *     }
 * );
 */

/*global me game*/

/**
 * A single Menu Item.
 *
 * @note Don't create standalone Items!
 *       They're nothing without a menu to be attached to.
 *
 * Keep scrollin'.
 */
me.MenuItem = me.GUI_Object.extend({

	init : function (x, y, label, menu, callback) {

		this.select(false);

		// Sending the argument list to the parent
		// constructor
		var settings = {};
		settings.image = this.image;
		settings.spritewidth  = this.image.width;
		settings.spriteheight = this.image.height;
		this.parent(x, y, settings);

		this.label    = label;
		this.callback = callback;

		// Our big daddy
		this.menu = menu;

		// We'll randomly flip the sprite horizontally
		// and vertically, making the menu look nice
		//
		// (testing if a random number is even, 50% chance)
		if (Number.prototype.random(0, 9)%2 == 0)
			this.flipX(true);

		if (Number.prototype.random(0, 9)%2 == 0)
			this.flipY(true);

		// Make sure we use screen coordinates
		this.floating = true;

		// Putting on front of most things
		// (related to the menu z order)
		this.z = 24;

		// Let's track if the mouse hovers me.
		//
		// This `bind` stuff is a fancy way of making
		// a callback for an object method.
		//
		// So that `this.name.bind(this)` is the same as
		// calling `this.name()` when the event happens.
		me.input.registerPointerEvent(
			'pointermove',
			this,
			this.onHover.bind(this)
		);
	},

	/**
	 * Mouse passed over us.
	 * @note This is _NOT_ automatically called by
	 *       melonJS! If you look at the end of the
	 *       `init` function, this is set up by ourselves.
	 */
	onHover : function() {
		if (this.selected)
			return;

		// Forces the menu to select ourselves.
		this.menu.select(this);
	},

	/**
	 * Marks this item as selected (or not).
	 *
	 * @note Option is a boolean.
	 * @note The selected state only changes the way
	 *       this item is drawn.
	 */
	select : function(option) {
		this.selected = option;

		this.image = me.loader.getImage(
			((this.selected) ?
			 "menu-button-on" :
			 "menu-button-off")
		);
	},

	/**
	 * Toggles the selected state of this item.
	 */
	toggle : function(option) {
		this.select(! this.selected);
	},

	/**
	 * Gets called when the user clicks on the item.
	 */
	onClick : function(event) {

		this.callback();

		// Don't propagate the click event
		return false;
	},

	draw : function(context) {
		// Making sure the image is drawn
		this.parent(context);

		me.game.font.draw(
			context,
			this.label,
			this.pos.x + 4,
			this.pos.y + 8
		);
	},

	/**
	 * Freeing resources when destroyed
	 */
	onDestroyEvent : function() {
		me.input.releasePointerEvent('pointermove', this);

		this.parent();
	}
});

/**
 * The Menu!
 *
 * Basically a container of items.
 * It keeps track of which item is selected
 * right now and can activate it at any time.
 */
me.Menu = me.ObjectContainer.extend({

	init : function(x, y) {

		// Occupying the whole screen (viewport)
		this.parent(x, y);

		// The index of the currently selected item
		// inside our `children` Array
		this.selectedIndex = 0;

		// Not wasting CPU with this
		this.autoSort   = false;
		this.collidable = false;

		// Put at the front of most things
		this.z = 25;
	},

	/**
	 * Creates a new Menu Item.
	 */
	addItem : function(title, callback) {

		var bottom_margin = 5;

		this.addChild(new me.MenuItem(
			this.pos.x,
			this.pos.y + game.tile(this.children.length) + (this.children.length * bottom_margin),
			title,
			this,
			callback
		));

		if (this.children.length === 1)
			this.children[0].select(true);
	},

	/**
	 * Activates the currently selected item.
	 */
	activate : function() {
		if (this.children.length <= 0)
			return;

		this.children[this.selectedIndex].onClick();
	},

	/**
	 * Highlights the next item.
	 *
	 * @note It wraps to the first if it's on the last.
	 */
	next : function() {

		this.children[this.selectedIndex].select(false);

		this.selectedIndex++;

		if (this.selectedIndex >= this.children.length)
			this.selectedIndex = 0;

		// Play a sound?
		this.children[this.selectedIndex].select(true);
	},

	/**
	 * Highlights the previous item.
	 *
	 * @note It wraps to the last if it's on the first.
	 */
	previous : function() {

		this.children[this.selectedIndex].select(false);
		this.selectedIndex--;

		if (this.selectedIndex < 0)
			this.selectedIndex = this.children.length - 1;

		// Play a sound?
		this.children[this.selectedIndex].select(true);
	},

	/**
	 * Forces the menu to select a specific Item.
	 *
	 * @warning It is not an index, it's the Item
	 *          Object itself!
	 *
	 * @note This is a costly function, since we need
	 *       to check every element in the items array.
	 * TODO: Remove this somehow
	 */
	select : function(item) {
		this.children[this.selectedIndex].select(false);

		this.selectedIndex = this.children.indexOf(item);

		this.children[this.selectedIndex].select(true);
	}
});

