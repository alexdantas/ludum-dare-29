/**
 * All resources that need to be loaded.
 * (images, fonts, maps and audio)
 */

/*global game*/

game.resources = [

	//  __    ___    __    ___   _     _   __    __
	// / /`_ | |_)  / /\  | |_) | |_| | | / /`  ( (`
	// \_\_/ |_| \ /_/--\ |_|   |_| | |_| \_\_, _)_)
	{
		// Level Tileset
		name: "tiles32x32",
		type: "image",
		src:  "data/image/tile/tiles32x32.png"
	},

	{
		// Player Spritesheet
		name: "brian",
		type: "image",
		src:  "data/image/sprite/brian-sheet.png"
	},

	{
		// Collectable Beer
		name: "beer",
		type: "image",
		src:  "data/image/sprite/beer.png"
	},

	{
		// Enemy
		name: "enemy",
		type: "image",
		src:  "data/image/sprite/quagmire.png"
	},

	{
		// Parallax 1
		name: "area01_bkg0",
		type: "image",
		src:  "data/image/area01_bkg0.png"
	},
	{
		// Parallax 2
		name: "area01_bkg1",
		type: "image",
		src:  "data/image/area01_bkg1.png"
	},
	{
		// Title Screen
		name: "title_screen",
		type: "image",
		src:  "data/image/gui/title_screen.png"
	},

	/* Atlases
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/image/example_tps.json"},
	 */

	//  ____  ___   _     _____
	// | |_  / / \ | |\ |  | |
	// |_|   \_\_/ |_| \|  |_|
	{
		name: "menu_font",
		type: "image",
		src:  "data/image/font/32x32_font.png"
	},

	//  _       __    ___   __
	// | |\/|  / /\  | |_) ( (`
	// |_|  | /_/--\ |_|   _)_)
	{
		name: "area01",
		type: "tmx",
		src:  "data/map/area01.tmx"
	},
	{
		name: "area02",
		type: "tmx",
		src:  "data/map/area02.tmx"
	}


	/* Background music.
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */

	/* Sound effects.
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
];

