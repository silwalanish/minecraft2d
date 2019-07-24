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
      this.options.width = window.innerWidth;
      this.options.height = window.innerHeight;
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
      this.options.width = window.innerWidth;
      this.options.height = window.innerHeight - 5;
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