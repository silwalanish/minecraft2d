"use strict";

class Sprite{

  constructor (imgSrc, sx, sy, sw, sh) {
    this.image = imgSrc;
    this.sx = sx;
    this.sy = sy;
    this.sw = (!sw) ? imgSrc.width : sw;
    this.sh = (!sh) ? imgSrc.height : sh;

    this.loaded = false;
    this.pattern = false;

    if(!(imgSrc instanceof Image)){
      this.imgSrc = imgSrc;
      this.load();
    }else{
      this.image = imgSrc;
      this.loaded = true;
    }
  }

  createPattern (repeat) {
    this.imagePattern = repeat;
    this.pattern = true;
  }

  load () {
    this.image = new Image();
    this.image.onload = (e) => {
      this.loaded = true;
      if(!this.sw){
        this.sw = this.image.width;
      }

      if(!this.sh){
        this.sh = this.image.height;
      }
    };
    this.image.src = this.imgSrc;
  }

  draw (ctx, pos, dims) {
    if(this.loaded){
      if(this.pattern){
        ctx.save();
        ctx.fillStyle = ctx.createPattern(this.image, this.imagePattern);
        ctx.fillRect(pos.x, pos.y, dims.x, dims.y);
        ctx.restore();
      }else{
        ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, pos.x, pos.y, dims.x, dims.y);
      }
      return true;
    }
    return false;
  }

}

class SpriteAnimation{

  constructor (sprite, startIndex, endIndex, animSpeed){
    this.sprite = sprite;
    this.startIndex = startIndex;
    this.currentIndex = this.startIndex;
    this.endIndex = endIndex;
    this.progress = 0;
    this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

    this.animSpeed = animSpeed;
  }

  reset () {
    this.sprite.sx = this.startIndex * this.sprite.sw;
  }

  render (ctx, pos, dims) {
    this.sprite.sx = this.currentIndex * this.sprite.sw;
    if(!this.sprite.draw(ctx, pos, dims)){
      ctx.fillStyle = this.color;
      ctx.fillRect(pos.x, pos.y, dims.x, dims.y);
    }
  }

  update (deltaTime) {
    
    this.progress += this.animSpeed * deltaTime;
    if(this.progress > 1){
      this.currentIndex ++;
      if(this.currentIndex > this.endIndex){
        this.currentIndex = this.startIndex;
      }
      this.progress = 0;
    }
  }

}