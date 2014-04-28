# Rabbit Hole

![logo](http://alexdantas.net/games/ld29/data/image/logo.png)

Game entry for [the Ludum Dare #29 competition][ld29] ([here's the entry][entry]).
It's a simple HTML5 2D platformer, made in 72h and powered by [melonJS][melonjs].

It works on most web browsers, including on mobile devices.

## Gameplay

You control a girl in a rabbit outfit who has to save her friends, also dressed
as animals. She needs to descend into the depths of hell, fighting all sorts of
strange enemies on her way (mostly walking-fire-people).

### Controls

| key                        | action        |
| -------------------------- | ------------- |
| **Arrow keys** or **WASD** | Walk and jump |
| Hold **Shift**             | Run           |

This game supports touch screens.

| touch/click at...          | action        |
| -------------------------- | ------------- |
| **Upper area**             | Jump          |
| **Lower-right area**       | Run right     |
| **Lower-left area**        | Run left      |

## Instructions

[To play the game right now, follow this link][play].

If you want your own **local version**, [download the repository][repo], start a
web server and open `index.html` on your favorite browser.

Note that this repository is a **development version** of the game. It splits
the code over several `.js` files.

You can build a **production version**, that compresses all the
`.js` files into minified versions.
This way it'll be way faster to load the game.
It is the recommended way to host it on your own website.

To build, be sure you have [node](http://nodejs.org) installed.
On the project directory, run:

    npm install

And then:

    grunt

## Development

Here's how the code is laid out:

| directory            | contents |
| -------------------- | -------- |
| `index.html`         | Entry point for the game; visual elements |
| `data`               | All resources; images, audio, fonts, maps... |
| `data/audio`         | All things related to sound |
| `data/audio/bgm`     | Background music, songs |
| `data/audio/sfx`     | Sound effects |
| `data/image`         | All images |
| `data/image/font`    | Bitmap fonts |
| `data/image/gui`     | Backgrounds and borders for game screens |
| `data/image/tile`    | Tilesets used on the Tiled maps |
| `data/image/sprite`  | Spritesheets or single sprites |
| `data/map`           | Tiled maps |
| `js`                 | Source code for the whole game; main `.js` files |
| `js/entities`        | Things that interact with each other (player, enemies...)|
| `js/states`          | Game states (screens that can be shown |
| `js/gui`             | Components of the user interface (menu, buttons...) |
| `lib`                | Libraries used for the game (MelonJS) |
| `lib/plugins`        | MelonJS plugins |
| `css`                | Stylesheets |

## Credits

The team:

* **Lead Developer**: *Alexandre Dantas*              ([homepage][alexdantas])
* **Main Artist**:    *Natália Cristina Alves Barros* ([deviantArt][bdnachi])

Acknowledgments:

* Game made with [melonJS][melonjs]. This library is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
* Huge thanks to the melonJS tutorial
  [A Step-by-step Game Creation Tutorial][tut], the best introduction to HTML5
  game development ever.
* This project started with the [MelonJS boilerplate][boilerplate].
* Some of the graphics (tileset and font) were modified from
  [GFXLib FuZED][fuzed], a package of free assets for 2D platformers.
  Thanks a lot, [Marc Russell][marc]!
* Background music and sound effects by [Anders Svensson][anders],
  originally featured on [Alex4][alex4].

## License

The whole code is released under the *MIT-license*.

Check file `LICENSE.md` for details on what you can and
cannot do with it.

[ld29]:        http://www.ludumdare.com/compo/ludum-dare-29/
[entry]:       http://www.ludumdare.com/compo/ludum-dare-29/?action=preview&uid=36899
[melonjs]:     http://melonjs.org/
[play]:        http://alexdantas.net/games/ld29
[repo]:        http://github.com/alexdantas/ludum-dare-29
[alexdantas]:  http://alexdantas.net
[bdnachi]:     http://bdnachi.deviantart.com/
[tut]:         http://melonjs.github.io/tutorial/
[boilerplate]: https://github.com/melonjs/boilerplate
[fuzed]:       http://opengameart.org/content/gfxlib-fuzed
[marc]:        http://spicypixel.net/
[anders]:      http://www.freelunchdesign.com/
[alex4]:       https://sourceforge.net/p/allegator/alex4/ci/master/tree/

