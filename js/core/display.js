"use strict";

class Display {

  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.isInitialized = false;
  }

  init () {
    if(this.isInitialized){
      return this.canvas;
    }
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext("2d");
    if(!this.context){
      throw new Error("Canvas is not supported by this browser.");
    }

    this.isInitialized = true;
    return this.canvas;
  }

  clearColor (color) {
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();
  }

  resize (width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  set Width (value) {
    this.width = value;
    this.canvas.width = this.width;
  }

  get Width () {
    return this.width;
  }

  set Height (value) {
    this.height = value;
    this.canvas.height = this.height;
  }
  
  get Height () {
    return this.height;
  }

}