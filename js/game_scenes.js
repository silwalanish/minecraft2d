"use strict";
const SMALL_MAP = 0;
const MEDIUM_MAP = 1;
const LARGE_MAP = 2;
const GRID_SIZE = 40;

class MainMenuScene extends Scene{

  init () {
    super.init();
    GetAssetsLoader().loadImage("./images/Minecraft/Stone.png", (img) => {
      this.background = new Sprite(img, 0, 0);
      this.background.createPattern("repeat");
      return img;
    });
  }

  initUI () {
    super.initUI();

    let title = new UIText("MINECRAFT", new Vector(this.sceneManager.game.options.width / 2, 120), "#fff", 100);
    title.fontWeight = "900";
    title.fillWithImage(GetAssetsLoader().loadImage("./images/Minecraft/Leaves.png"));
    
    let playBtn = new UIButton("Play", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height / 2), 
              new Vector(350, 50), "#fff", 30);

    playBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    playBtn.borderColor = "#000";
    playBtn.borderSize = 2;

    playBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    playBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    playBtn.setEventListener('click', () =>{
      this.play();
    });

    let playCreativeBtn = new UIButton("Play Creative", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height / 2 + 80), 
                      new Vector(350, 50), "#fff", 30);

    playCreativeBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    playCreativeBtn.borderColor = "#000";
    playCreativeBtn.borderSize = 2;

    playCreativeBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    playCreativeBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    playCreativeBtn.setEventListener('click', () =>{
      this.playCreative();
    });

    let helpBtn = new UIButton("Help", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 100),
            new Vector(120, 50), "#fff", 20);
    helpBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    helpBtn.borderColor = "#000";
    helpBtn.borderSize = 2;


    helpBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    helpBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    helpBtn.setEventListener('click', () =>{
      console.log("help");
    });

    this.uiHandler.register(title);
    this.uiHandler.register(playBtn);
    this.uiHandler.register(playCreativeBtn);
    this.uiHandler.register(helpBtn);
  }

  play () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, NormalGameScene));
  }

  playCreative () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, CreativeGameScene));
  }

}

class ChooseMapScene extends Scene{

  constructor (sceneManager, gameSceneClass) {
    super(sceneManager);
    this.gameSceneClass = gameSceneClass;
  }

  init () {
    super.init();
    GetAssetsLoader().loadImage("./images/Minecraft/Stone.png", (img) => {
      this.background = new Sprite(img, 0, 0);
      this.background.createPattern("repeat");
      return img;
    });

    this.mapType = null;
    this.customMap = null;
  }

  initUI () {
    super.initUI();

    this.errorText = new UIText("", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 150), "#f00", 30);
    this.uiHandler.register(this.errorText);

    let title = new UIText("CHOOSE MAP", new Vector(this.sceneManager.game.options.width / 2, 120), "#fff", 100);
    title.fontWeight = "900";

    let mapTypeText = new UIText("Map Type:", new Vector(200, 200), "#fff", 50);

    let smallMap = new UIButton("Small", new Vector(400, 190), new Vector(80, 30), "#fff", 20);
    let mediumMap = new UIButton("Medium", new Vector(490, 190), new Vector(80, 30), "#fff", 20);
    let largeMap = new UIButton("Large", new Vector(580, 190), new Vector(80, 30), "#fff", 20);

    smallMap.borderColor = "#000";
    mediumMap.borderColor = "#000";
    largeMap.borderColor = "#000";

    smallMap.setEventListener("mouseover", () => {
      smallMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
    });
    smallMap.setEventListener("click", () => {
      smallMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
      smallMap.selected = true;
      mediumMap.selected = false;
      largeMap.selected = false;
      mediumMap.background.image = null;
      largeMap.background.image = null;
      this.mapType = SMALL_MAP;
    });
    smallMap.setEventListener("mouseout", () => {
      if(!smallMap.selected){
        smallMap.background.image = null;
      }
    });

    mediumMap.setEventListener("mouseover", () => {
      mediumMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
    });
    mediumMap.setEventListener("click", () => {
      mediumMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
      mediumMap.selected = true;
      smallMap.selected = false;
      largeMap.selected = false;
      smallMap.background.image = null;
      largeMap.background.image = null;
      this.mapType = MEDIUM_MAP;
    });
    mediumMap.setEventListener("mouseout", () => {
      if(!mediumMap.selected){
        mediumMap.background.image = null;
      }
    });
    largeMap.setEventListener("mouseover", () => {
      largeMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
    });
    largeMap.setEventListener("click", () => {
      largeMap.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
      largeMap.selected = true;
      smallMap.selected = false;
      mediumMap.selected = false;
      mediumMap.background.image = null;
      smallMap.background.image = null;
      this.mapType = LARGE_MAP;
    });
    largeMap.setEventListener("mouseout", () => {
      if(!largeMap.selected){
        largeMap.background.image = null;
      }
    });
    
    let customMapChooser = new UIButton("Choose Custom Map", new Vector(this.sceneManager.game.options.width / 2, 300), new Vector(300, 50), "#000", 20);
    customMapChooser.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Grass.png");
    customMapChooser.borderColor = "#000";
    customMapChooser.borderSize = 2;
    customMapChooser.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
      customMapChooser.borderColor = "#fff";
    });

    customMapChooser.setEventListener('mouseout', function() {
      this.background.color = null;
      customMapChooser.borderColor = "#000";
    });

    customMapChooser.setEventListener('click', () =>{
      let mapName = prompt("Enter the map name: ");
      if(mapName){
        let map = localStorage.getItem("minecraft-map__"+mapName.toLowerCase());
        if(map){
          this.customMap = map;
        }else{
          this.errorText.text = "Map not found.";
        }
      }
    });

    let chooseBtn = new UIButton("Choose", new Vector(this.sceneManager.game.options.width / 2 + 80, this.sceneManager.game.options.height - 100), 
    new Vector(120, 50), "#fff", 20);

    chooseBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    chooseBtn.borderColor = "#000";
    chooseBtn.borderSize = 2;

    chooseBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    chooseBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    chooseBtn.setEventListener('click', () =>{
      this.choose();
    });

    let backBtn = new UIButton("Back", new Vector(this.sceneManager.game.options.width / 2 - 80, this.sceneManager.game.options.height - 100), 
              new Vector(120, 50), "#fff", 20);
    backBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    backBtn.borderColor = "#000";
    backBtn.borderSize = 2;


    backBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(255, 0, 0, 0.5)";
    });

    backBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    backBtn.setEventListener('click', () =>{
      this.back();
    });

    this.uiHandler.register(title);
    this.uiHandler.register(mapTypeText);
    this.uiHandler.register(smallMap);
    this.uiHandler.register(largeMap);
    this.uiHandler.register(mediumMap);
    this.uiHandler.register(customMapChooser);
    this.uiHandler.register(chooseBtn);
    this.uiHandler.register(backBtn);
  }

  choose () {
    if(this.mapType != null || this.customMap != null){
      let map;
      if(this.customMap){
        map = this.customMap;
      }else{
        let size;
        switch (this.mapType) {
          case 0:
            size = new Vector(50, 50);
            break;
          case 1:
            size = new Vector(250, 50);
            break;
          case 2:
            size = new Vector(500, 50);
            break;
        }
        map = new RandomGameMap(size);
      }
      this.sceneManager.switchToScene(new this.gameSceneClass(this.sceneManager, map));
    }else{
      this.errorText.text = "Please Choose A Map.";
    }
  }

  back () {
    this.sceneManager.switchToScene(new MainMenuScene(this.sceneManager));
  }

}

class NormalGameScene extends Scene{

  constructor (sceneManager, map) {
    super(sceneManager);
    this.map = map;
    this.timer = 0;
    this.frames = 0;
  }

  init () {
    super.init();
    this.isInitialized = false;

    this.background = new Sprite("./images/Skies/day.png", 0, 0);

    let playerPos = this.map.generate();

    this.worldSize = new Vector(GRID_SIZE * this.map.size.x, GRID_SIZE * this.map.size.y);
    this.currentCamera.world = this.worldSize;

    this.player = new Steve(playerPos, new Vector(GRID_SIZE, GRID_SIZE));
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));

    this.mousePos = new Vector(0, 0);
    this.selectedGround = new GrassGround(this.map.grid, this.mousePos);

    this.isBuilding = false;
    
    this.isInitialized = true;
  }

  onClick (e) {
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY));
    this.mousePos = this.map.grid.toGridPos(pos);
    
    if(this.isBuilding){
      this.map.grid.addObj(new GrassGround(this.map.grid, this.mousePos));
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
    this.mousePos = this.map.grid.toGridPos(pos);
    this.map.grid.onMouseOver(this.mousePos);
    
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
    this.map.render(ctx);

    if(this.isBuilding){
      ctx.globalAlpha = 0.5;
      this.selectedGround.draw(ctx);
      ctx.globalAlpha = 1;
    }
    this.player.draw(ctx);
    this.currentCamera.end(ctx);
    
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
    this.timer += deltaTime;
    this.frames++;
    if(this.timer > 10){
      this.timer = 0;
      console.log(this.frames / 10);
      this.frames = 0;
    }
    if(this.isBuilding){
      this.selectedGround.update(deltaTime);
    }

    if(this.player.isMining){
      let cell = this.map.grid.cellAt(this.mousePos);
      if(cell && cell.canPlayerMine()){
        let reward = cell.dig(deltaTime);
        if(reward){
          this.player.addReward(reward);
        }
        
        if(cell.isDestroyed()){
          this.map.grid.removeAt(this.mousePos);
        }
      }
    }

    this.map.update(deltaTime, this.currentCamera, this.player.getCenterPos());
    this.player.update(deltaTime);
    this.map.grid.onMouseOver(this.mousePos);


    this.player.collideWithWorldBounds(this.worldSize);
    this.player.collideWithGrid(this.map.grid);
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