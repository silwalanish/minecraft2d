/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

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

  collidesWith (collider) {
    return (this.contains(collider.parent.pos) || 
      this.contains(Vector.add(collider.parent.pos, collider.parent.dims)) ||
      this.contains(Vector.add(collider.parent.pos, new Vector(collider.parent.dims.x, 0))) ||
      this.contains(Vector.add(collider.parent.pos, new Vector(0, collider.parent.dims.y))));
  }

  contains (pos) {
    return (pos.x >= this.parent.pos.x && pos.x <= this.parent.pos.x + this.parent.dims.x) && 
           (pos.y >= this.parent.pos.y && pos.y <= this.parent.pos.y + this.parent.dims.y);
  }

}