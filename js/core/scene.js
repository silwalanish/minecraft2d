"use strict";

class Scene {

  constructor (sceneManager) {
    this.sceneManager = sceneManager;
    this.background = null;
    this.objects = [];
    this.uiHandler = null;
    this.currentCamera = null;
    this.isInitilized = false;
  }

  init () {
    if(this.isInitilized) {
      return;
    }

    this.uiHandler = new UIHandler();
    this.currentCamera = new Camera(new Vector(0, 0), 
                            new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height),
                            new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height));

    this.sceneManager.game.el.addEventListener('click', this.onClick.bind(this));
    this.sceneManager.game.el.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.sceneManager.game.el.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.sceneManager.game.el.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    this.isInitilized = true;
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
    this.uiHandler.resolveEvent('mousemove', e);
  }

  onMouseOver (e) {
    this.uiHandler.resolveEvent('mouseover', e);
  }

  onMouseOut (e) {
    this.uiHandler.resolveEvent('mouseout', e);
  }

  onKeyDown (e) {
    // Implemented in child class
  }

  onKeyUp (e) {
    // Implemented in child class
  }

  render (ctx) {
    if(this.background){
      this.background.draw(ctx, new Vector(0, 0), new Vector(this.sceneManager.game.options.width, this.sceneManager.game.options.height));
    }
    this.currentCamera.begin(ctx);
    this.objects.forEach(object => {
      object.draw(ctx);
    });
    this.currentCamera.end(ctx);
  }

  update (deltaTime) {
    this.currentCamera.update(deltaTime);
    this.objects.forEach(object => {
      object.update(deltaTime);
    });
  }

}

class SceneManager {

  constructor (game, startSceneClass) {
    this.game = game;
    this.currentScene = new startSceneClass(this);
    this.isInitilized = false;
  }

  init () {
    if(this.isInitilized){
      return;
    }
    if(this.currentScene){
      this.currentScene.init();
    }
  }

  switchToScene (scene) {
    this.currentScene = scene;
    this.currentScene.init();
  }

  render (ctx) {
    if(this.currentScene){
      this.currentScene.render(ctx);
    }
  }

  update (deltaTime) {
    if(this.currentScene){
      this.currentScene.update(deltaTime);
    }
  }

  resize (width, height){
    this.currentScene.resize(width, height);
  }

  set CurrentScene (scene) {
    this.currentScene = scene;
    this.currentScene.init();
  }

  get CurrentScene () {
    return this.currentScene;
  }

}