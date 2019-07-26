"use strict";

class Camera{

	constructor (pos, viewport, world) {
		this.pos = pos;
		this.viewport = viewport;
		this.world = world;
		this.vel = new Vector(0, 0);

		this.following = null;
		this.isMoving = false;
		this.offset = new Vector();
	}
	
	moveLeft () {
    this.vel.x = -100;
    this.isMoving = true;
  }

  moveRight () {
    this.vel.x = 100;
    this.isMoving = true;
	}
	
	moveUp () {
    this.vel.y = -100;
    this.isMoving = true;
  }

  moveDown () {
    this.vel.y = 100;
    this.isMoving = true;
  }


	update (deltaTime) {
		if(this.following){
			if(this.following.pos.x + this.offset.x - this.pos.x > this.viewport.x){
				this.pos.x = this.following.pos.x - (this.viewport.x - this.offset.x);
			}else if(this.following.pos.x - this.offset.x < this.pos.x){
				this.pos.x = this.following.pos.x - this.offset.x;
			}

			if(this.following.pos.y + this.offset.y - this.pos.y > this.viewport.y){
				this.pos.y = this.following.pos.y - (this.viewport.y - this.offset.y);
			}else if(this.following.pos.y - this.offset.y < this.pos.y){
				this.pos.y = this.following.pos.y - this.offset.y;
			}

			this.collideWithWorldBounds();
		}else if(this.isMoving){
			this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
			this.isMoving = false;
			
			this.collideWithWorldBounds();
		}else{
			this.vel.x = 0;
			this.vel.y = 0;
		}

		
	}

	collideWithWorldBounds () {
    if(this.pos.x < 0){
			this.pos.x = 0;
		}else if(this.pos.x > (this.world.x - this.viewport.x)){
			this.pos.x = this.world.x - this.viewport.x;
		}

		if(this.pos.y < 0){
			this.pos.y = 0;
		}else if(this.pos.y > (this.world.y - this.viewport.y)){
			this.pos.y = this.world.y - this.viewport.y;
		}
  }

	begin (ctx) {
		ctx.save();
		ctx.translate(-Math.round(this.pos.x), -Math.round(this.pos.y));
	}

	end (ctx) {
		ctx.restore();
	}
	
	follow (obj, offset) {
		this.following = obj;
		this.offset = offset;
	}

	contains (pos) {
		return (pos.x >= this.pos.x && pos.x <= (this.pos.x + this.viewport.x)) &&
					 (pos.y >= this.pos.y && pos.y <= (this.pos.y + this.viewport.y));
	}

	toWorldPos (pos) {
		return new Vector(pos.x + this.pos.x, pos.y + this.pos.y);
	}

}