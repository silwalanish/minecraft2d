"use strict";

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
    this.grid = new Grid(0, 0, this.sceneManager.game.options.width, this.sceneManager.game.options.width, 20);
    this.player = new Steve(this.grid, 400, 300);
    this.currentCamera.follow(this.player, this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height / 2);
    this.objects.push(this.player);
    
    for(let i = 0; i < 10; i ++){
      this.objects.push(new GrassGround(this.grid, i, 8));
    }

    this.mousePos = [0, 0];
    this.selectedGround = new GrassGround(this.grid, this.mousePos[0], this.mousePos[1]);

    this.isBuilding = false;
  }

  onClick (e) {
    let pos = this.currentCamera.toViewCoord(e.clientX, e.clientY);
    this.mousePos = this.grid.toGridCoord(pos[0], pos[1]);
    
    if(this.isBuilding){
      this.objects.push(new GrassGround(this.grid, this.mousePos[0], this.mousePos[1]));
    }
  }
  
  onMouseMove (e) {
    let pos = this.currentCamera.toViewCoord(e.clientX, e.clientY);  
    this.mousePos = this.grid.toGridCoord(pos[0], pos[1]);

    if(this.isBuilding){
      this.selectedGround.gridX = this.mousePos[0];
      this.selectedGround.gridY = this.mousePos[1];
    }
  }

  onKeyDown (e) {
    if(e.keyCode == 37){
      this.player.moveLeft();
    }else if(e.keyCode == 39){
      this.player.moveRight();
    }

    if(e.keyCode == 38 && this.player.canJump){
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

  render (ctx) {
    super.render(ctx);

    if(this.isBuilding){
      this.currentCamera.begin(ctx);
      ctx.globalAlpha = 0.5;
      this.selectedGround.draw(ctx);
      ctx.globalAlpha = 1;
      this.currentCamera.end(ctx);
    }
  }

  update (deltaTime) {
    super.update(deltaTime);
    if(this.isBuilding){
      this.selectedGround.update(deltaTime);
    }
    let playerTL = this.grid.toGridCoord(this.player.x, this.player.y);
    let playerTR = this.grid.toGridCoord(this.player.x + this.player.width, this.player.y);
    let playerBL = this.grid.toGridCoord(this.player.x, this.player.y + this.player.height);
    let playerBR = this.grid.toGridCoord(this.player.x + this.player.width, this.player.y + this.player.height);

    let collisionBL = false;
    let collisionBR = false;
    let collisionTR = false;
    let collisionTL = false;

    for (let i = 0; i < this.objects.length; i++) {
      const obj = this.objects[i];
      if(obj == this.player){
        continue;
      }
      if(obj.gridX == playerBR[0] && obj.gridY == playerBR[1]){
        collisionBR = true;
      }
      
      if(obj.gridX == playerBL[0] && obj.gridY == playerBL[1]){
        collisionBL = true;
      }
      
      if(obj.gridX == playerTR[0] && obj.gridY == playerTR[1]){
        collisionTR = true;
      }
      
      if(obj.gridX == playerTL[0] && obj.gridY == playerTL[1]){
        collisionTL = true;
      }
    }

    if(collisionBL && collisionBR){
      this.player.y = (playerBL[1]) * this.grid.gridSize - this.player.height;
      this.player.canJump = true;
      this.player.speedY = 0;
    }else if(collisionBR){
      this.player.x = (playerR[0]) * this.grid.gridSize - this.player.width;
      this.player.speedX = 0;
    }else if(collisionBL){
      this.player.x = (playerBL[0]) * this.grid.gridSize - this.player.width;
      this.player.speedX = 0;
    }else{
      this.player.canJump = false;
    }

    if(collisionTL || collisionBL){
      this.player.x = (playerTL[0] + 1) * this.grid.gridSize;
      this.player.speedX = 0;
    }
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