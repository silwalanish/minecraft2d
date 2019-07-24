"use strict";

const DEFAULT_STEVE_OPTIONS = {
  gravity: 200,
  vel: new Vector(100, 0),
  sprite: GetAssetsLoader().loadImage("./images/Steve/anim-sheet.png"),
  jumpForce: 140
};

class Steve{

  constructor (pos, dims, options) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = dims;

    this.options = options || {};
    this.options = this.options.extends(DEFAULT_STEVE_OPTIONS);

    this.vel = this.options.vel;
    this.gravity = this.options.gravity;

    this.sprite = this.options.sprite;

    this.spriteSheet = new Sprite(this.sprite, 0, 0, 64, 64);
    this.walkingAnim = new SpriteAnimation(this.spriteSheet, 0, 2, 10);
    this.miningAnim = new SpriteAnimation(this.spriteSheet, 3, 4, 5);
    this.animation = null;

    this.isWalking = false;
    this.isMining = false;
    this.canMine = true;
    this.isOnGround = false;
    this.minningDelay = 0.2;
    this.timer = 0;
    this.direction = 1;

    this.rewards = {
      gold: 0,
      wood: 0,
      stone: 0
    };

    this.isOnGround = false;

    this.collider = new Collider(this);
  }

  jump () {
    this.vel.y = -this.options.jumpForce;
    this.isOnGround = false;
    if(this.animation){
      this.animation.reset();
      this.animation = null;
    }
  }

  moveLeft () {
    this.vel.x = 100;
    this.direction = -1;
    this.isWalking = true;
  }

  moveRight () {
    this.vel.x = 100;
    this.direction = 1;
    this.isWalking = true;
  }

  mine () {
    if(this.canMine){
      this.isMining = true;
    }
  }

  stopMinning () {
    this.isMining = false;
    this.animation = this.walkingAnim;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.pos.x + this.dims.x / 2, this.pos.y + this.dims.y / 2);
    ctx.scale(this.direction, 1);
    if(this.animation){
      this.animation.render(ctx, new Vector(-this.dims.x / 2, -this.dims.y / 2), this.dims);
    }else if(this.spriteSheet){
      if(!this.isOnGround && this.isWalking){
        this.spriteSheet.sx = this.spriteSheet.sw;
      }else{
        this.spriteSheet.sx = 0;
      }
      this.spriteSheet.draw(ctx, new Vector(-this.dims.x / 2, -this.dims.y / 2), this.dims);
    }
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(-this.dims.x / 2, -this.dims.y / 2, this.dims.x, this.dims.y);
    ctx.restore();
    ctx.closePath();
  }

  update (deltaTime) {
    this.timer += deltaTime;
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;

    if(this.animation){
      this.animation.update(deltaTime);
    }

    if(this.isWalking){
      this.pos.x += this.direction * this.vel.x * deltaTime;
      if(this.isOnGround){
        this.animation = this.walkingAnim;
      }
    }else if(this.isMining){
      this.animation = this.miningAnim;
    }else{
      if(this.animation){
        this.animation.reset();
      }
      this.animation = null;
    }

    this.pos.y += this.vel.y * deltaTime;
    this.vel.y += this.gravity * deltaTime;
    
    if(this.timer > this.minningDelay){
      this.timer = 0;
      this.canMine = true;
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

  addReward (rewards) {
    switch(rewards.rewardType){
      case "Gold":
        this.rewards.gold += rewards.reward;
        break;
      case "Stone":
        this.rewards.stone += rewards.reward;
        break;
      case "Wood":
        this.rewards.wood += rewards.reward;
        break;
    }
  }

  getCenterPos () {
    return Vector.add(this.pos, Vector.mul(this.dims, 0.5));
  }

  getGoldRewards () {
    return this.rewards.gold;
  }

  getStoneRewards () {
    return this.rewards.stone;
  }

  getWoodRewards () {
    return this.rewards.wood;
  }

}