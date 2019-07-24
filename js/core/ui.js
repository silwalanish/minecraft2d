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
          case 'mouseout':
            element.onMouseOut(e);
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
      element.update(ctx);
    });
  }

}

class UIElement{

  constructor (pos, dims) {
    this.pos = pos;
    this.dims = dims;
    this.background = null;
    this.borderColor = null;
    this.borderSize = null;
    this.onClickListener = null;
    this.onMouseOverListener = null;
    this.onMouseOutListener = null;
    this.onMouseDownListener = null;
    this.onMouseUpListener = null;
    this.onMouseMoveListener = null;
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
    if(this.onMouseOver){
      this.onMouseOverListener(e);
    }
  }

  onMouseOut (e) {
    if(this.onMouseOut){
      this.onMouseOutListener(e);
    }
  }

  onMouseDown (e) {
    if(this.onMouseDown){
      this.onMouseDownListener(e);
    }
  }

  onMouseUp (e) {
    if(this.onMouseUp){
      this.onMouseUpListener(e);
    }
  }

  setFontSize (fontSize) {
    this.fontSize = fontSize;
    this.dims.x = this.fontSize * this.text.length + 10;
    this.dims.y = this.fontSize + 10;
  }


  update (deltaTime) {
    // Implemented in Child Classes
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.pos.x + this.dims.x / 2, this.pos.y + this.dims.y / 2);
    ctx.rect(-this.dims.x / 2, -this.dims.y / 2, this.dims.x, this.dims.y);
    if(this.background){
      ctx.fillStyle = this.background;
      ctx.fill();
    }
    if(this.borderColor){
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderSize;
      ctx.stroke();
    }
    ctx.restore();
    ctx.closePath();
  }

  contains (point) {
    return (point.x >= this.pos.x && point.x <= this.pos.x + this.dims.x) &&
           (point.y >= this.pos.y && point.y <= this.pos.y + this.dims.y);
  }

}

class UIText extends UIElement{

  constructor (text, pos, color = "#000", fontSize = 16, fontFamily = "Arial") {
    super(pos, new Vector(fontSize * text.length + 10, fontSize + 10));
    this.text = text;
    this.color = color;
    this.fontWeight = "normal";
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.textAlign = "center";
  }

  draw (ctx) {
    super.draw(ctx);
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.pos.x + this.dims.x / 2, this.pos.y + this.dims.y / 2);
    ctx.textAlign = this.textAlign;
    ctx.font = "${fontWeight} ${fontSize}px ${fontFamily}";
    ctx.fillText(this.text, 0, -this.dims.y / 2);
    ctx.restore();
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);
  }

}

class UIButton extends UIElement{

  constructor (text, pos, dims, color = "#000", fontSize = 16, fontFamily) {
    super(pos, dims);
    this.text = new UIText(text, pos, color, fontSize, fontFamily);

  }

  update (deltaTime) {

  }

  draw (ctx) {
    super.draw(ctx);
    this.text.draw(ctx);
  }

}