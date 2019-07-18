"use strict";

class Camera {

  constructor (x, y, viewW, viewH){
    this.x = x;
    this.y = y;
    this.viewW = viewW;
    this.viewH = viewH;

    this.following = false;
    this.xDeadZone = 0;
    this.yDeadZone = 0;
  }

  update (deltaTime) {
    if(this.following){
      if(this.following.x - this.x + this.xDeadZone > this.viewW){
        this.x = this.following.x - (this.viewW - this.xDeadZone);
      }else if(this.following.x - this.xDeadZone < this.x){
        this.x = this.following.x - this.xDeadZone;
      }

      if(this.following.y - this.y + this.yDeadZone > this.viewH){
        this.y = this.following.y - (this.viewH - this.yDeadZone);
      }else if(this.following.y - this.yDeadZone < this.y){
        this.y = this.following.y - this.yDeadZone;
      }
    }
  }

  follow (obj, xDeadZone, yDeadZone)
  {
    this.following = obj;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  begin (ctx) {
    ctx.save();
    ctx.translate(-this.x, -this.y);
  }

  end (ctx) {
    ctx.restore();
  }

  toViewCoord (x, y) {
    return [
      x + this.x,
      y + this.y
    ];
  }

}