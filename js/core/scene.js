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

class Scene {

  constructor (sceneManager) {
    this.sceneManager = sceneManager;
    this.background = null;
    this.objects = [];
    this.uiHandler = null;
    this.currentCamera = null;
    this.isInitialized = false;
  }

  init () {
    if(this.isInitialized) {
      return;
    }

    this.currentCamera = new Camera(new Vector(0, 0), 
                            new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height),
                            new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height));

    
    this.sceneManager.game.el.onclick = this.onClick.bind(this);
    this.sceneManager.game.el.onmousedown = this.onMouseDown.bind(this);
    this.sceneManager.game.el.onmouseup = this.onMouseUp.bind(this);
    this.sceneManager.game.el.onmousemove = this.onMouseMove.bind(this);
    this.sceneManager.game.el.onmouseover = this.onMouseOver.bind(this);
    this.sceneManager.game.el.onmouseout = this.onMouseOut.bind(this);

    document.addEventListener("keydown", this.onKeyDown.bind(this));
    document.addEventListener("keyup", this.onKeyUp.bind(this));

    this.isInitialized = true;

    this.initUI();
  }

  initUI () {
    this.uiHandler = new UIHandler();
  }

  resize (width, height) {
    // Implemented in child class
  }

  onClick (e) {
    this.uiHandler.resolveEvent('click', e);
  }

  onMouseDown (e) {
    this.uiHandler.resolveEvent('mousedown', e);
  }

  onMouseUp (e) {
    this.uiHandler.resolveEvent('mouseup', e);
  }

  onMouseMove (e) {
    this.uiHandler.resolveEvent('mouseout', e);
    this.uiHandler.resolveEvent('mouseover', e);
    this.uiHandler.resolveEvent('mousemove', e);
  }

  onMouseOver (e) {
    // Implemented in child class
  }

  onMouseOut (e) {
    // Implemented in child class
  }

  onKeyDown (e) {
    // Implemented in child class
  }

  onKeyUp (e) {
    // Implemented in child class
  }

  render (ctx) {
    if(this.isInitialized){
      if(this.background){
        this.background.draw(ctx, new Vector(0, 0), new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height));
      }
      this.currentCamera.begin(ctx);
      this.objects.forEach(object => {
        object.draw(ctx);
      });
      this.currentCamera.end(ctx);
    }
  }

  update (deltaTime) {
    if(this.isInitialized){
      this.currentCamera.update(deltaTime);
      this.objects.forEach(object => {
        object.update(deltaTime);
      });
      this.uiHandler.update(deltaTime);
    }
  }

  renderUI (ctx) {
    this.uiHandler.render(ctx);
  }

}

class SceneManager {

  constructor (game, startSceneClass) {
    this.game = game;
    this.currentScene = new startSceneClass(this);
    this.isInitialized = false;
    this.i = 0;
    this.loadingDisplay = new Display(this.game.options.width, this.game.options.height);
    this.game.el.appendChild(this.loadingDisplay.init());
    this.game.el.style.position = "relative";
    this.loadingDisplay.canvas.style.position = "absolute";
    this.loadingDisplay.canvas.style.top = "0px";
    this.loadingDisplay.canvas.style.left = "0px";
    this.loadingDisplay.canvas.style.display = "block";
  }

  init () {
    if(this.isInitialized){
      return;
    }
    this.showLoadingScreen();
    setTimeout(() => {
      if(this.currentScene){
        this.currentScene.init();
      }
      this.isInitialized = true;
    }, 100);
  }

  loadingScreen () {
    this.loadingDisplay.clearColor("#000");
    this.loadingDisplay.context.beginPath();
    this.loadingDisplay.context.font = "20px Minecraft";
    this.loadingDisplay.context.fillStyle = "#fff";
    this.loadingDisplay.context.fillText("Loading"+".".repeat(this.i), this.game.options.width / 2, this.game.options.height / 2);
    this.loadingDisplay.context.closePath();

    this.i = (this.i + 1) % 3;
    if(this.isInitialized){
      window.cancelAnimationFrame(this.loading);
      this.loadingDisplay.canvas.style.display = "none";
    }else{
      this.loading = window.requestAnimationFrame(this.loadingScreen.bind(this));
    }
  }

  showLoadingScreen () {
    this.loadingDisplay.canvas.style.display = "block";
    this.isInitialized = false;
    this.loading = this.loadingScreen();
  }


  switchToScene (scene) {
    this.isInitialized = false;
    this.showLoadingScreen();
    setTimeout(() => {
      this.currentScene = scene;
      this.currentScene.init();
      this.isInitialized = true;
    }, 100);
  }

  render (ctx) {
    if(this.currentScene && this.isInitialized){
      this.currentScene.render(ctx);
      this.currentScene.renderUI(ctx);
    }
  }

  update (deltaTime) {
    if(this.currentScene && this.isInitialized){
      this.currentScene.update(deltaTime);
    }
  }

  resize (width, height){
    this.currentScene.resize(width, height);
    this.loadingDisplay.resize(width, height);
  }

  set CurrentScene (scene) {
    this.currentScene = scene;
    this.currentScene.init();
  }

  get CurrentScene () {
    return this.currentScene;
  }

}