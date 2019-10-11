/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, subject 
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

"use strict";

const GAME_DEFAULT_OPTIONS = {
  width: 800,
  height: 600,
  backgroundColor: "#000",
  fullScreen: false,
  worldSteps: 1
};

class Game {

  constructor (el, options) {
    if(!el){
      throw new Error("el is required");
    }

    this.el = el;
    this.options = options || {};
    this.options = this.options.extends(GAME_DEFAULT_OPTIONS);
    if(this.options.fullScreen){
      this.options.width = window.innerWidth - 10;
      this.options.height = window.innerHeight - 10;
    }
    this.isInitialized = false;
  }

  init () {
    if(this.isInitialized){
      return;
    }
    this.display = new Display(this.options.width, this.options.height);
    this.el.appendChild(this.display.init());

    this.sceneManager = new SceneManager(this, this.options.startScene);
    this.sceneManager.init();

    window.addEventListener('resize', this.onResize.bind(this));
    this.isInitialized = true;
  }

  onResize (e) {
    if(this.options.fullScreen){
      this.options.width = window.innerWidth - 10;
      this.options.height = window.innerHeight - 10;
      this.display.resize(this.options.width, this.options.height);
      this.sceneManager.resize(this.options.width, this.options.height);
    }
    
  }

  update (deltaTime) {
    this.sceneManager.update(deltaTime);
  }

  render () {
    this.display.clearColor(this.options.backgroundColor);
    this.sceneManager.render(this.display.context);
  }

  gameloop () {
    let currentTime = Date.now();
    let deltaTime = (currentTime - this.startTime) / 1000;
    this.startTime = currentTime;

    this.render();
    for(let i = 0; i < this.options.worldSteps; i++){
      this.update(deltaTime / this.options.worldSteps);
    }

    window.requestAnimationFrame(this.gameloop.bind(this));
  }

  run () {
    if(!this.isInitialized){
      this.init();
    }
    this.startTime = Date.now();
    window.requestAnimationFrame(this.gameloop.bind(this));
  }

}