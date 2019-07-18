"use strict";

class Grid{

  constructor (x, y, width, height, numGrids) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.numGrids = numGrids;
    this.numRows = Math.ceil(this.height / this.numGrids);
    this.cells = new Array(this.numRows).fill(new Array(this.numGrids).fill(null));

    this.gridSize = this.width / this.numGrids;
  }

  resize (width, height) {
    this.width = width;
    this.height = height;
    this.gridSize = this.width / this.numGrids;
  }

  render (ctx) {
    for(let i = 0; i < this.numRows; i++){
      for(let j = 0; j < this.numGrids; j++){
        let cell = this.cells[i][j];
        if(cell){
          ctx.beginPath();
          ctx.fillStyle = "#fff";
          ctx.fillRect(i * this.gridSize, j * this.gridSize, this.gridSize, this.gridSize);
          ctx.closePath();
        }
      }
    }
  }

  update (deltaTime) {
    for(let i = 0; i < this.numRows; i++){
      for(let j = 0; j < this.numGrids; j++){
        let cell = this.cells[i][j];
        if(cell){
          //cell.update(deltaTime);
        }
      }
    }
  }

  collide (gridPos) {
    if(this.cells[gridPos[1]][gridPos[0]]){
      return true;
    }
  }

  addObj (obj) {
    this.cells[obj.gridY][obj.gridX] = true;
  }
  
  toWorldCoord (x, y) {
    return [
      this.x + this.gridSize * x,
      this.y + this.gridSize * y
    ];
  }

  toGridCoord (x, y) {
    return [
      Math.floor(x / this.gridSize),
      Math.floor(y / this.gridSize)
    ];
  }
}