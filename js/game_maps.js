"use strict";

class GameMap{

  constructor (size) {
    this.size = size;
    this.grid = new Grid(new Vector(0, 0), this.size, new Vector(GRID_SIZE, GRID_SIZE));
    this.heightMap = null;
    this.numTree = 0;
    this.timer = 0;
  }

  update (deltaTime, camera, playerPos) {
    this.grid.update(deltaTime, camera, playerPos);
    this.timer += deltaTime;
    if(this.timer > 2){
      let x = Math.round(Math.random() * this.size.x);
      let tries = 0;
      while (tries < 10 && this.numTree < 20){
        if(this.addTree(x, this.size.y - Math.round(this.heightMap.height(x)))) {
          break;
        }
        x = Math.round(Math.random() * this.size.x);
        tries++;
      }
      this.timer = 0;
    }
  }

  render (ctx) {
    this.grid.render(ctx);
  }

  addTree (i, j) {
    if(!this.grid.hasTreeAt(new Vector(i - 1, this.grid.dims.y - Math.round(this.heightMap.height(i - 1)) - 1)) && 
      this.grid.cellAt(new Vector(i, j)) instanceof GrassGround)
    {
      this.grid.addObj(new Trunk(this.grid, new Vector(i, j-1)));
      this.grid.addObj(new Trunk(this.grid, new Vector(i, j-2)));
      this.grid.addObj(new Trunk(this.grid, new Vector(i, j-3), [
        new Leaves(this.grid, new Vector(i-1, j-3)),
        new Leaves(this.grid, new Vector(i+1, j-3)),
        new Leaves(this.grid, new Vector(i-1, j-4)),
        new Leaves(this.grid, new Vector(i, j-4)),
        new Leaves(this.grid, new Vector(i+1, j-4)),
        new Leaves(this.grid, new Vector(i-1, j-5)),
        new Leaves(this.grid, new Vector(i, j-5)),
        new Leaves(this.grid, new Vector(i+1, j-5))
      ]));
      this.numTree++;
      return true;
    }
    return false;
  }

  generate () {
    // Implemented in child class
  }

}

class RandomGameMap extends GameMap {

  constructor (size) {
    super(size);
    this.heightMap = new HeightMapGenerator(this.grid.dims.y - 5, 0.03);
  }

  generate () {
    for (let i = 0; i < this.grid.dims.x; i++) {
      let height = Math.round(this.heightMap.height(i));
      let peak = this.grid.dims.y - height;
      this.grid.heights.push(peak);
      setTimeout(() => {
        for(let j = this.grid.dims.y - 1; j >= peak; j--) {
          if(j >= this.grid.dims.y - 5){
            this.grid.addObj(new StoneGround(this.grid, new Vector(i, j)));
          }else if(j == peak){
            this.grid.addObj(new GrassGround(this.grid, new Vector(i, j)));
            let generateTree = Math.round(Math.random() * 10);
            if(generateTree == 2){
              this.addTree(i, j);
            }
          }else{
            let gold = Math.round(Math.random() * 100);
            if(gold == 28){
              this.grid.addObj(new GoldGround(this.grid, new Vector(i, j)));
            }else if(gold % 25 == 0){
              this.grid.addObj(new StoneGround(this.grid, new Vector(i, j)));
            }else{
              this.grid.addObj(new DirtGround(this.grid, new Vector(i, j)));
            }
          }
        }
      }, 0);
      
    }
    let posX = Math.round(this.grid.dims.x * Math.random());
    let posY = (this.grid.dims.y - Math.round(this.heightMap.height(posX)) - 10);
    return new Vector(posX * this.grid.gridDims.x, posY * this.grid.gridDims.y);
  }

}

class CustomMap extends GameMap {

  constructor (size, grid) {
    super(size);
    this.grid = grid;
  }

}