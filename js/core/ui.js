"use strict";

class UIHandler{

  constructor () {
    this.uiElements = [];
  }

  resolveEvent (eventType, e) {
    this.uiElements.forEach(element => {
      if(element.contains(new Vector(e.clientX, e.clientY))){
        switch (eventType){
          case 'click':
            element.onClick(e);
            break;
          case 'mouseover':
            element.onMouseOver(e);
            break;
          case 'mousedown':
            element.onMouseDown(e);
            break;
          case 'mouseup':
            element.onMouseUp(e);
            break;
          case 'mousemove':
            element.onMouseMove(e);
            break;
        }
      }else{
        if(element.isMouseOverState){
          element.onMouseOut(e);
        }
      }
    });
  }

  register (element) {
    this.uiElements.push(element);
  }

  render (ctx) {
    this.uiElements.forEach(element => {
      element.draw(ctx);
    });
  }

  update (deltaTime) {
    this.uiElements.forEach(element => {
      element.update(deltaTime);
    });
  }

}

class UIElement{

  constructor (pos, dims) {
    this.pos = pos;
    this.dims = dims;
    this.background = {
      color: null,
      image: null
    };
    this.borderColor = null;
    this.borderSize = null;
    this.onClickListener = null;
    this.onMouseOverListener = null;
    this.onMouseOutListener = null;
    this.onMouseDownListener = null;
    this.onMouseUpListener = null;
    this.onMouseMoveListener = null;

    this.isMouseOverState = false;
  }

  setEventListener(eventType, callback) {
    switch (eventType){
      case 'click':
        this.onClickListener = callback.bind(this);
        break;
      case 'mouseover':
        this.onMouseOverListener = callback.bind(this);
        break;
      case 'mouseout':
        this.onMouseOutListener = callback.bind(this);
        break;
      case 'mousedown':
        this.onMouseDownListener = callback.bind(this);
        break;
      case 'mouseup':
        this.onMouseUpListener = callback.bind(this);
        break;
      case 'mousemove':
        this.onMouseMoveListener = callback.bind(this);
        break;
    }
  }

  onClick (e) {
    if(this.onClickListener){
      this.onClickListener(e);
    }
  }

  onMouseOver (e) {
    this.isMouseOverState = true;
    if(this.onMouseOverListener){
      this.onMouseOverListener(e);
    }
  }

  onMouseOut (e) {
    this.isMouseOverState = false;
    if(this.onMouseOutListener){
      this.onMouseOutListener(e);
    }
  }

  onMouseDown (e) {
    if(this.onMouseDownListener){
      this.onMouseDownListener(e);
    }
  }

  onMouseUp (e) {
    if(this.onMouseUpListener){
      this.onMouseUpListener(e);
    }
  }

  onMouseMove (e) {
    if(this.onMouseMoveListener){
      this.onMouseMoveListener(e);
    }
  }

  update (deltaTime) {
    // Implemented in Child Classes
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rect(-this.dims.x / 2, -this.dims.y / 2, this.dims.x, this.dims.y);
    
    if(this.borderColor){
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderSize;
      ctx.stroke();
    }
    if(this.background){
      if(this.background.image){
        ctx.fillStyle = ctx.createPattern(this.background.image, "repeat");
        ctx.fill();
      }
      if(this.background.color){
        ctx.fillStyle = this.background.color;
        ctx.fill();
      }
    }
    ctx.restore();
    ctx.closePath();
  }

  contains (point) {
    return (point.x >= this.pos.x - this.dims.x / 2 && point.x <= this.pos.x + this.dims.x / 2) &&
           (point.y >= this.pos.y - this.dims.y / 2 && point.y <= this.pos.y + this.dims.y / 2);
  }

}

class UIText extends UIElement{

  constructor (text, pos, color = "#000", fontSize = 16, fontFamily = "Minecraft") {
    super(pos, new Vector(fontSize * text.length, fontSize));
    this.text = text;
    this.color = color;
    this.fontWeight = "normal";
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.textAlign = "center";
    this.image = null;
  }

  fillWithImage (image) {
    this.image = image;
  }

  draw (ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.save();
    ctx.textAlign = this.textAlign;
    ctx.fillStyle = this.image ? ctx.createPattern(this.image, "repeat") : this.color;
    ctx.font = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    ctx.fillText(this.text, this.pos.x, this.pos.y + this.dims.y / 2);
    ctx.restore();
    ctx.closePath();
  }

}

class UIButton extends UIElement{

  constructor (text, pos, dims, color = "#000", fontSize = 16, fontFamily) {
    super(pos, dims);
    this.textNode = new UIText(text, pos.copy(), color, fontSize, fontFamily);

  }

  draw (ctx) {
    super.draw(ctx);
    this.textNode.draw(ctx);
  }

}
