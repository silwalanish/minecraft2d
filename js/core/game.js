const GAME_DEFAULT_OPTIONS = {
  width: 800,
  height: 600,
  backgroundColor: {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  },
  fullScreen: false
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
    this.display.clearColor(`rgba(${this.options.backgroundColor.r}, ${this.options.backgroundColor.g}, ${this.options.backgroundColor.b}, ${this.options.backgroundColor.a})`);
    this.sceneManager.render(this.display.context);
  }

  gameloop () {
    let currentTime = Date.now();
    let deltaTime = (currentTime - this.startTime) / 1000;
    this.startTime = currentTime;

    this.render();
    this.update(deltaTime);

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