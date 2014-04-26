/* Player entity.
 *
 * The character you control around the game.
 */

/*global game,me*/

game.playerEntity = me.ObjectEntity.extend({

	// Constructor
	init : function(x, y, settings) {

		// Aside from the `settings` passed by Tiled
		settings.image = "brian";
		settings.width = 31;
		settings.height = 52;
		settings.spritewidth = 31;
		settings.spriteheight = 52;

		this.parent(x, y, settings);

		// Adjusting the collision rectangle to the sprite
		// (not assuming the whole image)
		var shape = this.getShape();
		shape.pos.x = 7;
		shape.resize(16, shape.height - 1);

		// Deceleration
		this.setFriction(0.65, 0);

		// Initial speed when walking
		this.setVelocity(0.9, 15);

		// Maximum velocity the player can get
		// while walking.
		this.maxWalkingVelocity = new me.Vector2d();
		this.maxWalkingVelocity.x = 3.1;
		this.maxWalkingVelocity.y = 15;

		// Maximum velocity the player can get
		// while running.
		this.maxRunningVelocity = new me.Vector2d();
		this.maxRunningVelocity.x = 5;
		this.maxRunningVelocity.y = 15;

		// melonJS assures it'll never go faster
		// than this.
		this.setMaxVelocity(
			this.maxRunningVelocity.x,
			this.maxRunningVelocity.y
		);

		// Deceleration
		this.decel = new me.Vector2d(0.7, 0);

		// Animations based on a sprite sheet.
		//
		// We tell what sprite indexes makes the animation,
		// with an optional ms delay between them.
		this.renderable.addAnimation("standing", [0, 5], 4000);
		this.renderable.addAnimation("jumping",  [1, 1]);
		this.renderable.addAnimation("walking",  [2, 3, 4, 3], 150);
		this.renderable.addAnimation("climbing", [3, 4, 5, 4]);

		// This forces the current animation.
		//
		// Just a note, if you keep calling this every frame,
		// the animation will NOT happen.
		// You need to check first if this is the current
		// animation AND THEN calling this.
		this.renderable.setCurrentAnimation("standing");

		// Here's all the flags
		// They tell how the player is behaving _right now_
		this.facingRight = true;
		this.running     = false;
		this.invincible  = false;

		this.health = 100;

		// Tells display to follow our position on both axis.
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.type = me.game.PLAYER_OBJECT;
	},

	// Update the player position.
	update : function(delta) {

		// If we died, let's go back to the main menu
		if (!this.inViewport || this.health <= 0) {

			me.device.vibrate(500);
			me.game.world.removeChild(this);

			me.state.change(me.state.MENU);
			return false;
		}

		// Handling input

		// If player holds this key, we make the player run
		this.running = me.input.keyStatus("boost");

		if (me.input.isKeyPressed("left")) {

			this.facingRight = false;

			// Smooth movement - also, considering the ticker
			this.vel.x -= ((this.vel.x <= 0) ? this.accel.x : this.decel.x);
			this.vel.x *= me.timer.tick;

			// If the player is running, will achieve maximum
			// speed anyways.
			//
			// If it's only walking, we should limit the speed
			// here.
			if (! this.running) {
				this.vel.x = this.vel.x.clamp(
					-this.maxWalkingVelocity.x,
					 this.maxWalkingVelocity.x
				);
				// set walking animation
			}
			// set running animation
			if (!this.renderable.isCurrentAnimation("walking"))
				this.renderable.setCurrentAnimation("walking");

		} else if (me.input.isKeyPressed("right")) {

			this.facingRight = true;

			// Smooth movement - also, considering the ticker
			this.vel.x += ((this.vel.x >= 0) ? this.accel.x : this.decel.x);
			this.vel.x *= me.timer.tick;

			// If the player is running, will achieve maximum
			// speed anyways.
			//
			// If it's only walking, we should limit the speed
			// here.
			if (! this.running) {
				this.vel.x = this.vel.x.clamp(
					-this.maxWalkingVelocity.x,
					 this.maxWalkingVelocity.x
				);
				// set walking animation
			}
			// set running animation
			if (!this.renderable.isCurrentAnimation("walking"))
				this.renderable.setCurrentAnimation("walking");

		} else {

			if (!this.renderable.isCurrentAnimation("standing"))
				this.renderable.setCurrentAnimation("standing");

			// No need to make the player stop
			// (friction is handled by melonJS)

			// Sudden stop
			//this.vel.x = 0;
		}

		if (me.input.isKeyPressed("jump")) {

			if (!this.jumping && !this.falling) {

				// Set y speed to it's maximum defined value.
				// Gravity will take care of the rest.
				this.vel.y = -this.maxVel.y * me.timer.tick;

				// Update the internal flag
				this.jumping = true;
			}
		}

		if (this.jumping || this.falling)
			if (!this.renderable.isCurrentAnimation("jumping"))
				this.renderable.setCurrentAnimation("jumping");

		// Flipping the sprite if needed.
		this.flipX(this.facingRight);

		// Updates the animation.
		this.parent(delta);

		// Now, to updating the logical movement.
		this.updateMovement();

		if (!this.renderable.isFlickering())
			this.invincible = false;

		// Checking for collision with other things...
		var res = me.game.world.collide(this);

		if (res) {

			// Did we Collided with an enemy?
			if (res.obj.type == me.game.ENEMY_OBJECT) {

				// Check if we jumped on it
				if ((res.y > 0) && !this.jumping) {

					// Bounce
					this.falling = false;
					this.vel.y = -this.maxVel.y * me.timer.tick;

					this.jumping = true;

				} else {

					// Oops, we got hit by an enemy
					if (!this.invincible) {

						this.health -= 20;

						// Throw the player a la Castlevania
						this.vel.x -= this.maxVel.x / 2 * me.timer.tick;
						this.vel.y -= this.maxVel.y / 2 * me.timer.tick;
						this.jumping = true;

						// Flickering the animation and
						// making us invincible
						this.renderable.flicker(750);
						this.invincible = true;
					}
				}
			}
		}

		// If we return false, the player does
		// not get redrawn.
		return true;
	}
});

