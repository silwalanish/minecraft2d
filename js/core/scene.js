"use strict";

class Scene {

  constructor (sceneManager) {
    this.sceneManager = sceneManager;
    this.background = null;
    this.objects = [];
    this.currentCamera = null;
    this.isInitilized = false;
  }

  init () {
    if(this.isInitilized) {
      return;
    }

    this.currentCamera = new Camera(0, 0, this.sceneManager.game.options.width, this.sceneManager.game.options.height);

    this.sceneManager.game.el.addEventListener('click', this.onClick.bind(this));
    this.sceneManager.game.el.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    this.isInitilized = true;
  }

  resize (width, height) {
    // Implemented in child class
  }

  onClick (e) {
    // Implemented in child class
  }

  onMouseMove (e) {
    // Implemented in child class
  }

  onKeyDown (e) {
    // Implemented in child class
  }

  onKeyUp (e) {
    // Implemented in child class
  }

  render (ctx) {
    if(this.background){
      this.background.draw(ctx, 0, 0, this.sceneManager.game.options.width, this.sceneManager.game.options.height);
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