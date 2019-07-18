"use strict";

class Sprite{

  constructor (imgSrc, sx, sy, sw, sh) {
    this.imgSrc = imgSrc;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw || false;
    this.sh = sh || false;

    this.loaded = false;
    this.pattern = false;

    this.load();
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

  draw (ctx, x, y, w, h) {
    if(this.loaded){
      if(this.pattern){
        ctx.save();
        ctx.fillStyle = ctx.createPattern(this.image, this.imagePattern);
        ctx.fillRect(x, y, w, h);
        ctx.restore();
      }else{
        ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, x, y, w, h);
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

  render (ctx, x, y, w, h) {
    this.sprite.sx = this.currentIndex * this.sprite.sw;
    if(!this.sprite.draw(ctx, x, y, w, h)){
      ctx.fillStyle = this.color;
      ctx.fillRect(x, y, w, h);
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