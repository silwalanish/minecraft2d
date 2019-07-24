"use strict";

const GRID_SIZE = 40;

class MainMenuScene extends Scene{

  init () {
    super.init();
  }

  play () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, NormalGameScene));
  }

}

class ChooseMapScene extends Scene{

  constructor (sceneManager, gameSceneClass) {
    super(sceneManager);
    this.gameSceneClass = gameSceneClass;
  }

  init () {
    super.init();
  }

  choose () {
    this.sceneManager.switchToScene(new this.gameSceneClass(this.sceneManager));
  }

}

class NormalGameScene extends Scene{

  init () {
    super.init();

    this.background = new Sprite("./images/Skies/day.png", 0, 0);
    this.worldSize = new Vector(GRID_SIZE * 250, GRID_SIZE * 50);
    this.currentCamera.world = this.worldSize;

    this.grid = new Grid(new Vector(0, 0), new Vector(250, 50), new Vector(GRID_SIZE, GRID_SIZE));

    this.player = new Steve(new Vector(200, 300), new Vector(GRID_SIZE * 1.5, GRID_SIZE * 1.5));
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));
    
    
    let heightMap = new HeightMapGenerator(this.grid.dims.y - 5, 0.03);
    this.heights = [];
    for (let i = 0; i < this.grid.dims.x; i++) {
      let height = Math.round(heightMap.height(i));
      let peak = this.grid.dims.y - height;
      this.heights.push(height);
      for(let j = this.grid.dims.y - 1; j >= peak; j--) {
        if(j >= this.grid.dims.y - 5){
          this.grid.addObj(new StoneGround(this.grid, new Vector(i, j)));
        }else if(j == peak){
          this.grid.addObj(new GrassGround(this.grid, new Vector(i, j)));
        }else{
          let gold = Math.round(Math.random() * 100);
          if(gold == 28){
            this.grid.addObj(new GoldGround(this.grid, new Vector(i, j)));
          }else{
            this.grid.addObj(new DirtGround(this.grid, new Vector(i, j)));
          }
        }
      }
      let generateTree = Math.round(Math.random() * 10);
      let j = peak;
      if(generateTree == 2 && !this.grid.hasTreeAt(new Vector(i - 1, this.grid.dims.y - this.heights[i-1] - 1))){
        this.grid.addObj(new Trunk(this.grid, new Vector(i, j-1)));
        this.grid.addObj(new Trunk(this.grid, new Vector(i, j-2)));
        this.grid.addObj(new Trunk(this.grid, new Vector(i, j-3), [
          new Leaves(this.grid, new Vector(i-1, j-3)),
          new Leaves(this.grid, new Vector(i+1, j-3)),
          new Leaves(this.grid, new Vector(i-1, j-4)),
          new Leaves(this.grid, new Vector(i, j-4)),
          new Leaves(this.grid, new Vector(i+1, j-4)),
          new Leaves(this.grid, new Vector(i-1, j-5)),
          new Leaves(this.grid, new Vector(i, j-5)),
          new Leaves(this.grid, new Vector(i+1, j-5))
        ]));
      }
    }

    console.log("Map generated");

    // console.log(grid.cells);
    console.log(this.heights);

    this.mousePos = new Vector(0, 0);
    this.selectedGround = new GrassGround(this.grid, this.mousePos);

    this.isBuilding = false;
  }

  onClick (e) {
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY));
    this.mousePos = this.grid.toGridPos(pos);
    
    if(this.isBuilding){
      this.grid.addObj(new GrassGround(this.grid, this.mousePos));
    }
  }

  

  onMouseDown (e) {
    this.player.mine();
    console.log("Mining Started");
    
  }

  onMouseUp (e) {
    this.player.stopMinning();
  }
  
  onMouseMove (e) {
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY)); 
    this.mousePos = this.grid.toGridPos(pos);
    this.grid.onMouseOver(this.mousePos);
    
    if(this.isBuilding){
      this.selectedGround.gridPos = this.mousePos;
    }
  }

  onKeyDown (e) {
    if(e.keyCode == 37){
      this.player.moveLeft();
    }else if(e.keyCode == 39){
      this.player.moveRight();
    }

    if(e.keyCode == 38 && this.player.isOnGround){
      this.player.jump();
    }

    if(e.keyCode == 66){
      this.isBuilding = !this.isBuilding;
      console.log("Build Mode: "+ this.isBuilding);
      
    }
  }

  onKeyUp (e) {
    if(e.keyCode == 37){
      this.player.isWalking = false;
    }else if(e.keyCode == 39){
      this.player.isWalking = false;
    }
  }

  resize (width, height) {
    this.currentCamera.viewport = new Vector(width, height);
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));
  }

  render (ctx) {
    super.render(ctx);

    this.currentCamera.begin(ctx);
    this.grid.render(ctx);

    if(this.isBuilding){
      ctx.globalAlpha = 0.5;
      this.selectedGround.draw(ctx);
      ctx.globalAlpha = 1;
    }
    this.player.draw(ctx);
    this.currentCamera.end(ctx);
    
    
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    for(let i = 0; i < 250; i++){
      ctx.lineTo(i + 20, 50 - this.heights[i]);
    } 
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    let x = Math.floor(this.player.pos.x / this.grid.gridDims.x);
    ctx.fillStyle = "#f00";
    ctx.arc(x + 20, 50 - this.heights[x], 2, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "gold";
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillText(this.player.getGoldRewards(), 200, 200);
    
    ctx.fillStyle = "gray";
    ctx.fillText(this.player.getStoneRewards(), 300, 200);
    
    ctx.fillStyle = "brown";
    ctx.fillText(this.player.getWoodRewards(), 400, 200);
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);
    if(this.isBuilding){
      this.selectedGround.update(deltaTime);
    }

    if(this.player.isMining){
      let cell = this.grid.cellAt(this.mousePos);
      if(cell && cell.canPlayerMine()){
        let reward = cell.dig(deltaTime);
        if(reward){
          this.player.addReward(reward);
        }
        
        if(cell.isDestroyed()){
          this.grid.removeAt(this.mousePos);
        }
      }
    }

    this.grid.update(deltaTime, this.currentCamera);
    this.player.update(deltaTime);
    this.grid.onMouseOver(this.mousePos);


    this.player.collideWithWorldBounds(this.worldSize);
    this.player.collideWithGrid(this.grid);
  }

  endGame () {
    this.sceneManager.switchToScene(new GameEndScene(this.sceneManager, NormalGameScene));
  }

}

class GameEndScene extends Scene{

  constructor (sceneManager, gameSceneClass) {
    super(sceneManager);
    this.gameSceneClass = gameSceneClass;
  }

  init () {
    super.init();
  }

  playAgain () {
    this.sceneManager.switchToScene(new this.gameSceneClass(this.sceneManager));
  }

  exitToMainMenu () {
    this.sceneManager.switchToScene(new MainMenuScene(this.sceneManager));
  }

}