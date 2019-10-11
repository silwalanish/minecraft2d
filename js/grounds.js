/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, subject 
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

"use strict";

class Cell{

  constructor (grid, gridPos, texture){
    this.gridPos = gridPos;
    this.grid = grid;
    this.texture = texture;

    this.isMouseOver = false;
    this.isNearPlayer = false;
    this.canMineCell = false;
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
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Grass.png"), 0, 0));
  }

}

class DirtGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png"), 0, 0));
  }

}

class WoodGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Wood_ground.png"), 0, 0));
  }

}

class StoneGround extends Cell{
  
  constructor (grid, pos, stoneAmount){
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0));
    this.stoneAmount = stoneAmount || 200;
  }

  
  dig (deltaTime) {
    super.dig(deltaTime);
    if(this.stoneAmount > 0){
      this.stoneAmount -= 10;
      return { rewardType: "Stone", reward: 10 };
    }
    this.destroyed = 1;
  }

}

class SandGround extends Cell{
  
  constructor (grid, pos){
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Sand.png"), 0, 0));
  }

}

class GoldGround extends Cell{

  constructor (grid, pos, goldAmount){
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Gold.png"), 0, 0));
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
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Leaves.png"), 0, 0));
    this.isGround = false;
  }

}

class Trunk extends Cell{

  constructor (grid, pos, leaves, woodAmount) {
    super(grid, pos, new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Wood_trunk.png"), 0, 0));
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

