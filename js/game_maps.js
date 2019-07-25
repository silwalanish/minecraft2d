"use strict";

class GameMap{

  constructor (size) {
    this.size = size;
    this.grid = new Grid(this, new Vector(0, 0), this.size, new Vector(GRID_SIZE, GRID_SIZE));
    this.heights = [];
    this.numTree = 0;
    this.timer = 0;
    this.spawnPos = new Vector(0, 0);
  }

  update (deltaTime, camera, player) {
    if(player){
      this.grid.update(deltaTime, camera, player.getCenterPos());
    }else{
      this.grid.update(deltaTime, camera);
    }
    this.timer += deltaTime;
  }

  render (ctx) {
    this.grid.render(ctx);
  }

  generate (scene) {
    // Implemented in child class
    return this.spawnPos.copy();
  }

  heightAt (x) {
    return this.heights[x];
  }

}

class RandomGameMap extends GameMap {

  constructor (size) {
    super(size);
    this.heightMap = new HeightMapGenerator(this.grid.dims.y - 5, 0.03);
  }

  generate (scene) {
    for (let i = 0; i < this.size.x; i++) {
      let height = Math.round(this.heightMap.height(i));
      let peak = this.size.y - height;
      this.heights.push(peak);
      setTimeout(() => {
        for(let j = this.size.y - 1; j >= peak; j--) {
          if(j >= this.size.y - 5){
            this.grid.addObj(new StoneGround(this.grid, new Vector(i, j)));
          }else if(j == peak){
            this.grid.addObj(new GrassGround(this.grid, new Vector(i, j)));
            let generateTree = Math.round(Math.random() * 10);
            if(generateTree == 2){
              scene.addTree(i, j);
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
    this.spawnPos.x = Math.round(this.grid.dims.x * Math.random());
    this.spawnPos.y = (this.grid.dims.y - Math.round(this.heightMap.height(this.spawnPos.x)) - 10) * this.grid.gridDims.y;
    this.spawnPos.x *= this.grid.gridDims.y;
    return this.spawnPos.copy();
  }

}

class CustomMap extends GameMap {

  constructor (size, gridData, heights, spawnPos) {
    super(new Vector(size.x, size.y));
    this.gridData = gridData;
    this.heights = heights;
    this.spawnPos = new Vector(spawnPos.x, spawnPos.y);
  }

  generate (scene) {
    for (let i = 0; i < this.size.x; i++) {
      setTimeout(() => {
        for(let j = 0; j < this.size.y; j++) {
          let obj = null;
          switch (this.gridData[j][i]){
            case 1:
              obj = new GrassGround(this.grid, new Vector(i, j));
              break;
            case 2:
              obj = new DirtGround(this.grid, new Vector(i, j));
              break;
            case 3:
              obj = new StoneGround(this.grid, new Vector(i, j));
              break;
            case 4:
              obj = new Trunk(this.grid, new Vector(i, j));
              break;
            case 5:
              obj = new Leaves(this.grid, new Vector(i, j));
              break;
          }
          if(obj){
            this.grid.addObj(obj);
          }
        }
      });
    }
    return this.spawnPos.copy();
  }

}