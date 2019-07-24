"use strict";

class Cell{

  constructor (grid, gridPos, texture){
    this.gridPos = gridPos;
    this.grid = grid;
    this.texture = texture;

    this.isMouseOver = false;
    this.isNearPlayer = false;
    this.canMineCell = false;
    this.isCollidingWithPlayer = false;
    this.isGround = true;
    this.isCulled = false;

    this.destroyed = 0;
    
    this.genWorldPos();
  }

  genWorldPos () {
    this.pos = this.grid.toWorldPos(this.gridPos);
    this.pos.x = Math.round(this.pos.x);
    this.pos.y = Math.round(this.pos.y);
  }

  draw (ctx){
    if(this.isCulled && !this.isNearPlayer){
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.fillRect(this.pos.x, this.pos.y, Math.round(this.grid.gridDims.x), Math.round(this.grid.gridDims.y));
      ctx.closePath();
    }else{
      ctx.beginPath();
      this.texture.draw(ctx, this.pos, this.grid.gridDims);
      ctx.closePath();
      
      if(this.isNearPlayer){
        if(this.canPlayerMine()){
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255, 0, 0, 1)";
          ctx.strokeRect(this.pos.x, this.pos.y, this.grid.gridDims.x, this.grid.gridDims.y);
          ctx.closePath();
        }
      }
    }
  }

  update (deltaTime) {
    this.genWorldPos();
  }

  canPlayerMine () {
    return this.canMineCell && this.isMouseOver;
  }

  dig (deltaTime) {
    this.destroyed += 2 * deltaTime;
    return;
  }

  isDestroyed () {
    return this.destroyed >= 1;
  }

}

class GrassGround extends Cell {

  constructor (grid, pos){
    super(grid, pos, new Sprite("./images/Minecraft/Grass.PNG", 0, 0));
  }

}

class DirtGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite("./images/Minecraft/Dirt.PNG", 0, 0));
  }

}

class WoodGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite("./images/Minecraft/Wood_ground.PNG", 0, 0));
  }

}

class StoneGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite("./images/Minecraft/Stone.PNG", 0, 0));
  }

}

class SandGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite("./images/Minecraft/Sand.PNG", 0, 0));
  }

}

class GoldGround extends Cell{

  constructor (grid, pos, goldAmount){
    super(grid, pos, new Sprite("./images/Minecraft/Gold.PNG", 0, 0));
    this.goldAmount = goldAmount || 200;
  }

  dig (deltaTime) {
    super.dig(deltaTime);
    if(this.goldAmount > 0){
      this.goldAmount -= 10;
      return { rewardType: "Gold", reward: 10 };
    }
    this.destroyed = 1;
  }

}

class Leaves extends Cell{

  constructor (grid, pos) {
    super(grid, pos, new Sprite("./images/Minecraft/Leaves.PNG", 0, 0));
    this.isGround = false;
  }

}

class Trunk extends Cell{

  constructor (grid, pos, leaves, woodAmount) {
    super(grid, pos, new Sprite("./images/Minecraft/Wood_trunk.PNG", 0, 0));
    this.isGround = false;
    this.woodAmount = woodAmount || 200;
    this.leaves = leaves || [];

    this.leaves.forEach(leaf => {
      this.grid.addObj(leaf);
    });
  }

  dig (deltaTime) {
    super.dig(deltaTime);
    if(this.woodAmount > 0){
      this.woodAmount -= 10;
      return { rewardType: "Wood", reward: 10 };
    }
    this.destroyed = 1;
    this.leaves.forEach(leaf => {
      this.grid.removeAt(leaf.gridPos);
    });
  }

}

