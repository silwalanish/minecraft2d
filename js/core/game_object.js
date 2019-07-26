"use strict";

class GameObject {

  constructor (pos, dims) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = dims;

    this.isMoving = false;
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

  input () {
    if(KEYBOARD.isKeyPressed(KEY_A) || KEYBOARD.isKeyPressed(KEY_LEFT)){
      this.moveLeft();
    }else if(KEYBOARD.isKeyPressed(KEY_D) || KEYBOARD.isKeyPressed(KEY_RIGHT)){
      this.moveRight();
    }

    if(KEYBOARD.isKeyPressed(KEY_W) || KEYBOARD.isKeyPressed(KEY_UP)){
      this.moveUp();
    }else if(KEYBOARD.isKeyPressed(KEY_S) || KEYBOARD.isKeyPressed(KEY_DOWN)){
      this.moveDown();
    }
  }

  draw (ctx) {
    // Implemented in Child Class
  }

  update (deltaTime) {
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;

    if(this.isMoving){
			this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
      this.isMoving = false;
		}else{
      this.vel.x = 0;
      this.vel.y = 0;
    }
  }
  
  collideWithWorldBounds (worldSize) {
    if(this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = 0;
    }else if(this.pos.x > (worldSize.x - this.dims.x)){
      this.pos.x = worldSize.x - this.dims.x;
      this.vel.x = 0;
    }
    
    if(this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = 0;
    }else if(this.pos.y > (worldSize.y - this.dims.y)){
      this.pos.y = worldSize.y - this.dims.y;
      this.vel.y = 0;
    }
  }

}