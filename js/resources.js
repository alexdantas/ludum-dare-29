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
		name: "player-spritesheet",
		type: "image",
		src:  "data/image/sprite/player.png"
	},

	{
		// Collectable star
		name: "star-spritesheet",
		type: "image",
		src:  "data/image/sprite/star.png"
	},

	// Enemies
	{
		name: "fire-walk",
		type: "image",
		src:  "data/image/sprite/enemy-1.png"
	},
	{
		name: "fire-stand",
		type: "image",
		src:  "data/image/sprite/enemy-2.png"
	},
	{
		name: "spike",
		type: "image",
		src:  "data/image/sprite/spike.png"
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
		name: "main-menu-bg",
		type: "image",
		src:  "data/image/gui/title_screen.png"
	},

	{
		name: "menu-button-on",
		type: "image",
		src:  "data/image/gui/menu-button-on.png"
	},
	{
		name: "menu-button-off",
		type: "image",
		src:  "data/image/gui/menu-button-off.png"
	},

	/* Atlases
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/image/example_tps.json"},
	 */

	//  ____  ___   _     _____
	// | |_  / / \ | |\ |  | |
	// |_|   \_\_/ |_| \|  |_|
	{
		name: "font16x16",
		type: "image",
		src:  "data/image/font/font16x16.png"
	},

	//  _       __    ___   __
	// | |\/|  / /\  | |_) ( (`
	// |_|  | /_/--\ |_|   _)_)
	{
		name: "area00",
		type: "tmx",
		src:  "data/map/area00.tmx"
	},
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

