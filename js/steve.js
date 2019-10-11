"use strict";

const DEFAULT_STEVE_OPTIONS = {
  gravity: 200,
  vel: new Vector(100, 0),
  sprite: GetAssetsLoader().loadImage("./images/anim-sheet.png"),
  jumpForce: 140,
  minningDelay: 0.2,
  maxHealth: 100,
  maxHunger: 100,
  startRewardGold: 200,
  startRewardWood: 200,
  startRewardStone: 200,
  startRewardFood: 3,
  hungerModifier: 0.7
};

const LEFT_DIR = -1;
const RIGHT_DIR = 1;

class Steve{

  constructor (pos, dims, options) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = dims;

    this.options = options || {};
    this.options = this.options.extends(DEFAULT_STEVE_OPTIONS);

    this.vel = this.options.vel.copy();
    this.gravity = this.options.gravity;

    this.spriteSheet = new Sprite(this.options.sprite, 0, 0, 64, 64);
    this.walkingAnim = new SpriteAnimation(this.spriteSheet, 0, 2, 10);
    this.miningAnim = new SpriteAnimation(this.spriteSheet, 3, 4, 5);
    this.animation = null;

    this.isWalking = false;
    this.isMining = false;
    this.isBuilding = false;
    this.canMine = true;
    this.isOnGround = false;
    this.minningDelay = this.options.minningDelay;
    this.timer = 0;
    this.direction = LEFT_DIR;
    this.hunger = this.options.maxHunger;
    this.health = this.options.maxHealth;

    this.rewards = {
      gold: this.options.startRewardGold,
      wood: this.options.startRewardWood,
      stone: this.options.startRewardStone,
      food: this.options.startRewardFood
    };

    this.isOnGround = false;

    this.collider = new Collider(this);
  }

  eatFood () {
    if(this.rewards.food > 0 && this.hunger <= 50){
      this.rewards.food--;
      this.health += 50;
      this.hunger += 50;
      this.health = Math.min(this.health, this.options.maxHealth);
      this.hunger = Math.min(this.hunger, this.options.maxHunger);
    }
  }

  toggleBuilding () {
    this.isBuilding = !this.isBuilding;
    if(this.isBuilding){
      this.stopMinning();
    }
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
    this.vel.x = this.options.vel.x;
    this.direction = LEFT_DIR;
    this.isWalking = true;
  }

  moveRight () {
    this.vel.x = this.options.vel.x;
    this.direction = RIGHT_DIR;
    this.isWalking = true;
  }

  mine () {
    if(this.canMine && !this.isBuilding){
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
    ctx.restore();
    ctx.closePath();
  }

  update (deltaTime) {
    this.timer += deltaTime;
    if(this.hunger > 0){
      this.hunger -= deltaTime * this.options.hungerModifier;
    }else{
      this.hunger = 0;
      this.health -= deltaTime;
    }

    if(KEYBOARD.isKeyPressed(KEY_A) || KEYBOARD.isKeyPressed(KEY_LEFT)){
      this.moveLeft();
    }else if(KEYBOARD.isKeyPressed(KEY_D) || KEYBOARD.isKeyPressed(KEY_RIGHT)){
      this.moveRight();
    }else{
      this.isWalking = false;
    }

    if((KEYBOARD.isKeyPressed(KEY_W) || KEYBOARD.isKeyPressed(KEY_UP)) && this.isOnGround){
      this.jump();
    }

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
      case "Food":
        this.rewards.food += rewards.reward;
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

  getFoodRewards () {
    return this.rewards.food;
  }

}