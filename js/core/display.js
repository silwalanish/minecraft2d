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
      throw new Error("Canvas is not supported by this b.dims.yer.");
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