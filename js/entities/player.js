/* Player entity.
 *
 * The character you control around the game.
 *
 * Thanks:
 * - For giving a perspective on implementing variable-height jump
 *   http://gamedev.stackexchange.com/a/44766
 * - Same here (this is way easier to implement)
 *   http://documentation.flatredball.com/frb/docs/?title=Tutorials:Platforer:Variable-Height_Jumps
 * - Nice tutorial on jump physics' ideas
 *   http://poemdexter.com/blog/jump-physics-games/
 */

/*global game,me*/

game.playerEntity = me.ObjectEntity.extend({

	// Constructor
	init : function(x, y, settings) {

		// Aside from the `settings` passed by Tiled
		settings.image = "player-spritesheet";

		settings.width  = 32;
		settings.height = 64;
		settings.spritewidth  = 32;
		settings.spriteheight = 64;

		this.parent(x, y, settings);

		// Normally things outside the screen (viewport)
		// are not updated.
		// It's not the case of the player.
		this.alwaysUpdate = true;

		// Adjusting the collision rectangle to the sprite
		// (not assuming the whole image)
		var shape = this.getShape();
		shape.pos.x = 7;
		shape.resize(16, shape.height - 1);

		// Maximum speed on which we
		// throw the player up
		var maxJumpVelocity = 10;

		// Deceleration when walking and falling.
		// (it is automatically handled by melonJS)
		this.setFriction(0.65, 0);

		// Initial speed when walking
		this.setVelocity(0.9, maxJumpVelocity);

		// Maximum velocity the player can get
		// while walking.
		this.maxWalkingVelocity   = new me.Vector2d();
		this.maxWalkingVelocity.x = 3.1;
		this.maxWalkingVelocity.y = maxJumpVelocity;

		// Maximum velocity the player can get
		// while running.
		this.maxRunningVelocity   = new me.Vector2d();
		this.maxRunningVelocity.x = 5;
		this.maxRunningVelocity.y = maxJumpVelocity;

		// The absolute maximum velocity the player
		// can be at any times
		// (melonJS assures it'll never get faster than this)
		this.setMaxVelocity(
			this.maxRunningVelocity.x,
			this.maxRunningVelocity.y
		);

		// X speed must be lower than this so
		// we can apply the "standing" sprite
		// (absolute value, don't worry)
		this.standingThreshold = 0.2;

		// Animations based on a sprite sheet.
		//
		// First argument are the sprite indexes for the animation,
		// with an optional ms delay between them.
		this.renderable.addAnimation("standing", [0]);
		this.renderable.addAnimation("jumping",  [9]);
		this.renderable.addAnimation("falling",  [10]);
		this.renderable.addAnimation("walking",  [1, 2, 3, 2], 150);
		this.renderable.addAnimation("running",  [4, 5, 6, 7], 75);

		// This forces the current animation.
		//
		// Just a note, if you keep calling this every frame,
		// the animation will NOT happen.
		// You need to check first if this is the current
		// animation AND THEN calling this.
		this.renderable.setCurrentAnimation("standing");

		// Here's all the flags
		// They tell how the player is behaving _right now_
		this.standing    = true;
		this.facingLeft  = false;
		this.running     = false;
		this.invincible  = false;
		this.jumping     = false;

		// Maximum time (ms) that the user can hold
		// the jump key, thus making the player jump higher
		this.jumpTimerDelta = 150;

		// Number of seconds that holding the Jump key
		// will have effect
		this.jumpKeyReleased = false;

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

		this.handleJump();

		var walkedOnThisFrame = false;

		if (me.input.isKeyPressed("left")) {

			this.standing     = false;
			this.facingLeft   = true;
			walkedOnThisFrame = true;

		} else if (me.input.isKeyPressed("right")) {

			this.standing     = false;
			this.facingLeft   = false;
			walkedOnThisFrame = true;

		} else {

			// No need to make the player stop
			// (friction is handled by melonJS)

			// Sudden stop
			//this.vel.x = 0;

			if ((this.vel.x >= -this.standingThreshold) &&
				(this.vel.x <=  this.standingThreshold))
				this.standing = true;
		}

		// Updating speed based on the previous input.
		if (! this.standing && walkedOnThisFrame) {

			var speedIncrease = this.accel.x *= me.timer.tick;

			this.vel.x += ((this.facingLeft) ?
						    -speedIncrease :
						     speedIncrease);

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
			}
		}

		// Updates and commits the animation.
		this.updateAnimation();
		this.parent(delta);

		// Now, to updating the logical movement.
		// (melonJS function)
		this.updateMovement();

		if (!this.renderable.isFlickering())
			this.invincible = false;

		// Checking for collision with other things...
		var res = me.game.world.collide(this);

		if (res) {

			// Did we Collided with an enemy?
			if (res.obj.type === me.game.ENEMY_OBJECT) {

				// Check if we jumped on it
				if ((res.y > 0) && !this.jumping) {

					// Bounce
					this.falling = false;
					this.vel.y = -this.maxVel.y * me.timer.tick;

					this.jumping = true;

				}
				else {

					// Oops, we got hit by an enemy
					if (!this.invincible) {

						this.health -= 20;

						// Throw the player a la Castlevania
						this.vel.x = 3 * ((this.vel.x > 0) ?
										  -this.maxVel.x :
										   this.maxVel.x) * me.timer.tick;
						this.vel.y = -this.maxVel.y * me.timer.tick;
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
	},

	/**
	 * Updates internal animation, based on
	 * all the player's flags.
	 *
	 * @note: Must be called before melonJS' `updateAnimation`!
	 */
	updateAnimation : function() {

		// Which animation we'll apply now
		// By default, we'll assume the player is standing
		var animation = "";

		if      (this.jumping)  animation = "jumping";
		else if (this.falling)  animation = "falling";
		else if (this.standing) animation = "standing";
		else if (this.running)  animation = "running";
		else                    animation = "walking";

		// Flipping the sprite if needed.
		// (since all sprites are by default facing right)
		this.flipX(this.facingLeft);

		// Applying!
		if (!this.renderable.isCurrentAnimation(animation))
			this.renderable.setCurrentAnimation(animation);
	},

	/**
	 * Logic behind the player jumping.
	 *
	 * It has a variable jumping height - like dem Mario gamezz biatch.
	 */
	handleJump : function() {

		var iWannaJump = (me.input.keyStatus("jump"));
		var imOnGround = (!this.falling && !this.jumping);

		// Static local variable that we use to
		// measure if we can jump higher by holding
		// the jump key
		this.jumpTimer = this.jumpTimer || 0;

		if (imOnGround && iWannaJump) {

			this.jumping = true;

			this.vel.y = -this.maxVel.y * me.timer.tick;

			// Opening a window of time on which the player
			// can hold the button to jump higher
			this.jumpTimer = me.timer.getTime();
		}
		else if (!imOnGround && iWannaJump) {

			// Only jumping a little higher if the
			// timer allows.
			if ((me.timer.getTime() - this.jumpTimer) < this.jumpTimerDelta) {

				this.vel.y = -this.maxVel.y * me.timer.tick;
			}
		}

		// Why is this here?
		this.standing = false;
	}
});

