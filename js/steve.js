"use strict";

class Steve{

  constructor (grid, x, y) {
    this.x = x;
    this.y = y;
    this.speedX = 100;
    this.speedY = 0;
    this.gravity = 100;
    this.width = 40;
    this.height = 40;
    this.spriteSheet = new Sprite("./images/Steve/anim-sheet.png", 0, 0, 64, 64);
    this.walkingAnim = new SpriteAnimation(this.spriteSheet, 0, 2, 10);
    this.miningAnim = new SpriteAnimation(this.spriteSheet, 3, 4, 5);
    this.animation = null;
    this.isWalking = false;
    this.direction = 1;

    this.canJump = false;

    this.grid = grid;
  }

  jump () {
    this.speedY = -110;
    this.canJump = false;
  }

  moveLeft () {
    this.speedX = 100;
    this.direction = -1;
    this.isWalking = true;
  }

  moveRight () {
    this.speedX = 100;
    this.direction = 1;
    this.isWalking = true;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.scale(this.direction, 1);
    if(this.animation){
      this.animation.render(ctx, -this.width / 2, -this.height / 2, this.width, this.height);
    }else{
      this.spriteSheet.draw(ctx, -this.width / 2, -this.height / 2, this.width, this.height);
    }
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
    ctx.closePath();
  }

  update (deltaTime) {
    if(this.animation){
      this.animation.update(deltaTime);
    }

    if(this.isWalking){
      this.x += this.direction * this.speedX * deltaTime;
      this.animation = this.walkingAnim;
    }else{
      if(this.animation){
        this.animation.reset();
      }
      this.animation = null;
    }

    this.y += this.speedY * deltaTime;
    this.speedY += this.gravity * deltaTime;
  }

}