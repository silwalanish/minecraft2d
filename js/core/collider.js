"use strict";

class Collider{

  constructor (parent) {
    this.parent = parent;
    this.offset = 0.001;
  }

  collideTop (row, gridYSize) {
    let top = row * gridYSize;
    if(this.parent.pos.y + this.parent.dims.y > top && this.parent.oldPos.y + this.parent.dims.y <= top){
      this.parent.isOnGround = true;
      this.parent.vel.y = 0;
      this.parent.pos.y = top - this.parent.dims.y - this.offset;
      return true;
    }
    return false;
  }

  collideBottom (row, gridYSize) {
    let bottom = (row + 1) * gridYSize;
    if(this.parent.pos.y < bottom && this.parent.oldPos.y >= bottom){
      this.parent.vel.y = 0;
      this.parent.pos.y = bottom - this.offset;
      return true;
    }
    return false;
  }

  collideLeft (col, gridXSize) {
    let left = col * gridXSize;
    if(this.parent.pos.x + this.parent.dims.x > left && this.parent.oldPos.x + this.parent.dims.x <= left){
      this.parent.vel.x = 0;
      this.parent.pos.x = left - this.parent.dims.x - this.offset;
      return true;
    }
    return false;
  }

  collideRight (col, gridXSize) {
    let right = (col + 1) * gridXSize;
    if (this.parent.pos.x < right && this.parent.oldPos.x >= right) {
      this.parent.vel.x = 0;
      this.parent.pos.x = right;
      return true;
    } 
    return false;
  }

  collide (pos, gridDims) {
    if(this.collideTop(pos.y, gridDims.y)){
      return;
    }
    if(this.collideLeft(pos.x, gridDims.x)){
      return;
    }
    if(this.collideRight(pos.x, gridDims.x)){
      return;
    }
    this.collideBottom(pos.y, gridDims.y);
  }

  handleCollision (grid) {
    // Collision Top
    let TL = grid.toGridPos(this.parent.pos);
    let cell = grid.cellAt(TL);
    if(cell && cell.isGround){
      this.collide(TL, grid.gridDims);
    }
    
    let TR = grid.toGridPos(Vector.add(this.parent.pos, new Vector(this.parent.dims.x, 0)));
    cell = grid.cellAt(TR);
    if(cell && cell.isGround){
      this.collide(TR, grid.gridDims);
    }

    // Collision Bottom
    let BL = grid.toGridPos(Vector.add(this.parent.pos, new Vector(0, this.parent.dims.y)));
    cell = grid.cellAt(BL);
    if(cell && cell.isGround){
      this.collide(BL, grid.gridDims);
    }

    let BR = grid.toGridPos(Vector.add(this.parent.pos, this.parent.dims));
    cell = grid.cellAt(BR);
    if(cell && cell.isGround){
      this.collide(BR, grid.gridDims);
    }

    // Collision Left
    TL = grid.toGridPos(this.parent.pos);
    cell = grid.cellAt(TL);
    if(cell && cell.isGround){
      this.collide(TL, grid.gridDims);
    }

    BL = grid.toGridPos(Vector.add(this.parent.pos, new Vector(0, this.parent.dims.y)));
    cell = grid.cellAt(BL);
    if(cell && cell.isGround){
      this.collide(BL, grid.gridDims);
    }

    // Collision Right
    TR = grid.toGridPos(Vector.add(this.parent.pos, new Vector(this.parent.dims.x, 0)));
    cell = grid.cellAt(TR);
    if(cell && cell.isGround){
      this.collide(TR, grid.gridDims);
    }

    BR = grid.toGridPos(Vector.add(this.parent.pos, this.parent.dims));
    cell = grid.cellAt(BR);
    if(cell && cell.isGround){
      this.collide(BR, grid.gridDims);
    }
  }

}