# melonJS game

A simple HTML5 test platformer.

## Instructions

[To play the game now, follow this link][play].

If you want a **local version**, [download the repository][repo] and open
`index.html` on your favorite browser.

Note that this repository is a **development version** of the game.  It splits
the code over several `.js` files.

You can build a **production version**, that compresses all the `.js` files into
minified versions. This way it'll be way faster to load the game. This is the
recommended way to host it on your own website.

To build, be sure you have [node](http://nodejs.org) installed. On the project
directory, run:

    npm install

And then:

    grunt

[play]:
[repo]:

## Project structure

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
| `js/entities`        | All entities things that interact with each other |
| `js/screens`         | All screens that can be shown; game states |
| `lib`                | Libraries used for the game (MelonJS) |
| `lib/plugins`        | MelonJS plugins |
| `css`                | Stylesheets |

## Credits

* Game made with **melonJS**.
  melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

* Huge thanks to the melonJS tutorial
  [A Step-by-step Game Creation Tutorial][tut], the best introduction to HTML5
  game development ever.
* This project started with the [MelonJS boilerplate][boilerplate].

[tut]: http://melonjs.github.io/tutorial/
[boilerplate]: https://github.com/melonjs/boilerplate

## License

The whole game is licensed under the MIT-license.
Check file `LICENSE.md` for details on what you can and cannot do with the code.

