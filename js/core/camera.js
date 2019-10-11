/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

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