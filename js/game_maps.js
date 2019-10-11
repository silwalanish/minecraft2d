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
      let height = Math.max(1, Math.round(this.heightMap.height(i)));
      let peak = this.size.y - height;
      this.heights.push(peak);
      setTimeout(() => {
        for(let j = this.size.y - 1; j >= peak; j--) {
          if(j >= this.size.y - 5){
            this.grid.setObj(new StoneGround(this.grid, new Vector(i, j)));
          }else if(j == peak){
            this.grid.setObj(new GrassGround(this.grid, new Vector(i, j)));
            let generateTree = Math.round(Math.random() * 10);
            if(generateTree == 2){
              scene.addTree(i, j);
            }
          }else{
            let gold = Math.round(Math.random() * 100);
            if(gold == 28){
              this.grid.setObj(new GoldGround(this.grid, new Vector(i, j)));
            }else if(gold % 25 == 0){
              this.grid.setObj(new StoneGround(this.grid, new Vector(i, j)));
            }else{
              this.grid.setObj(new DirtGround(this.grid, new Vector(i, j)));
            }
          }
        }
      }, 0); 
    }
    this.spawnPos.x = Math.round(this.grid.dims.x * Math.random());
    this.spawnPos.y = (Math.round(this.heightAt(this.spawnPos.x)) - 4) * this.grid.gridDims.y;
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
              obj = new SandGround(this.grid, new Vector(i, j));
              break;
            case 5:
              obj = new WoodGround(this.grid, new Vector(i, j));
              break;
            case 6:
              obj = new GoldGround(this.grid, new Vector(i, j));
              break;
            case 7:
              obj = new Trunk(this.grid, new Vector(i, j));
              break;
            case 8:
              obj = new Leaves(this.grid, new Vector(i, j));
              break;
          }
          if(obj){
            this.grid.setObj(obj);
          }
        }
      });
    }
    return this.spawnPos.copy();
  }

}