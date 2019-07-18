"use strict";

class Ground{

  constructor (grid, x, y, texture){
    this.gridX = x;
    this.gridY = y;
    this.grid = grid;
    this.texture = texture;

    this.genWorldPos();
  }

  genWorldPos () {
    let pos = this.grid.toWorldCoord(this.gridX, this.gridY);
    this.x = pos[0];
    this.y = pos[1];
  }

  draw (ctx){
    ctx.beginPath();
    this.texture.draw(ctx, this.x, this.y, this.grid.gridSize, this.grid.gridSize);
    ctx.closePath();
  }

  update (deltaTime) {
    this.genWorldPos();
  }

}

class GrassGround extends Ground {

  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Grass.PNG", 0, 0));
  }

}

class DirtGround extends Ground{
  
  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Dirt.PNG", 0, 0));
  }

}

class WoodGround extends Ground{
  
  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Wood_ground.PNG", 0, 0));
  }

}

class StoneGround extends Ground{
  
  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Stone.PNG", 0, 0));
  }

}

class SandGround extends Ground{
  
  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Sand.PNG", 0, 0));
  }

}

class GoldGround extends Ground{

  constructor (grid, x, y){
    super(grid, x, y, new Sprite("./images/Minecraft/Gold.PNG", 0, 0));
  }

}

class Leaves extends Ground{

  constructor (grid, x, y) {
    super(grid, x, y, new Sprite("./images/Minecraft/Leaves.PNG", 0, 0));
  }

}

class Trunk extends Ground{

  constructor (grid, x, y) {
    super(grid, x, y, new Sprite("./images/Minecraft/Wood_trunk.PNG", 0, 0));
  }

}
