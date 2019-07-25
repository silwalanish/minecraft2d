"use strict";
const SMALL_MAP = 0;
const MEDIUM_MAP = 1;
const LARGE_MAP = 2;
const GRID_SIZE = 40;

class MainMenuScene extends Scene{

  init () {
    super.init();
    this.background = GetAssetsLoader().loadImage("./images/Minecraft/Stone.png");
    this.background.createPattern("repeat");
  }

  initUI () {
    super.initUI();

    let title = new UIText("MINECRAFT", new Vector(this.sceneManager.game.options.width / 2, 100), "#fff", 100);
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

    this.background = GetAssetsLoader().loadImage("./images/Minecraft/Stone.png");
    this.background.createPattern("repeat");
    this.mapType = null;
    this.customMapData = null;
  }

  initUI () {
    super.initUI();

    this.errorText = new UIText("", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 150), "#f00", 30);
    this.uiHandler.register(this.errorText);

    let title = new UIText("CHOOSE MAP", new Vector(this.sceneManager.game.options.width / 2, 100), "#fff", 100);
    title.fontWeight = "900";

    let mapTypeText = new UIText("Map Type:", new Vector(200, 190), "#fff", 50);

    let smallMap = new UIButton("Small", new Vector(400, 200), new Vector(80, 30), "#fff", 20);
    let mediumMap = new UIButton("Medium", new Vector(490, 200), new Vector(80, 30), "#fff", 20);
    let largeMap = new UIButton("Large", new Vector(580, 200), new Vector(80, 30), "#fff", 20);

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

    this.uiHandler.register(new UIText("Or,", new Vector(500, 250), "#fff", 30));

    let customMapChooser = new UIButton("Choose Custom Map", new Vector(500, 300), new Vector(300, 50), "#fff", 20);
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
        let mapData = localStorage.getItem("minecraft-map__"+mapName.toLowerCase());
        
        if(mapData){
          this.customMapData = JSON.parse(mapData);
          this.choosedText.text = "Map choosen: "+mapName;
        }else{
          this.errorText.text = "Map not found.";
        }
      }
    });

    this.choosedText = new UIText("", new Vector(500, 400), "#0f0", 30);
    this.uiHandler.register(this.choosedText);

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
    if(this.mapType != null || this.customMapData != null){
      let map;
      if(this.customMapData){
        map = new CustomMap(this.customMapData.size, this.customMapData.grid, this.customMapData.heights, this.customMapData.spawnPos);
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

class GameScene extends Scene {

  constructor (sceneManager, map) {
    super(sceneManager);
    this.map = map;
    this.timer = 0;    
  }

  init () {
    super.init();
    this.className = GameScene;
    this.isInitialized = false;

    this.background = new Sprite("./images/Skies/day.png", 0, 0);

    this.spawnPos = this.map.generate(this);

    this.worldSize = new Vector(GRID_SIZE * this.map.size.x, GRID_SIZE * this.map.size.y);
    this.currentCamera.world = this.worldSize;

    this.mousePos = new Vector(0, 0);

    this.foods = [];

    this.isInitialized = true;
  }

  initUI () {
    super.initUI();

    this.quitBtn = new UIButton("Quit", new Vector(this.sceneManager.game.options.width - 80, 20), new Vector(80, 30), "#fff", 20);
    this.quitBtn.borderColor = "#f00";
    this.quitBtn.setEventListener("mouseover", () => {
      this.quitBtn.background.color = "#f00";
    });
    this.quitBtn.setEventListener("click", () => {
      this.endGame();
    });
    this.quitBtn.setEventListener("mouseout", () => {
      this.quitBtn.background.color = null;
    });

    this.helpText = new UIText("USE W/A/S/D or Arrow Keys to move. Press B to toggle Build/Mine mode.", 
      new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 20), "#000", 20);
 
    this.uiHandler.register(this.helpText);
    this.uiHandler.register(this.quitBtn);
  }
  
  onClick (e) {
    super.onClick(e);
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY));
    this.mousePos = this.map.grid.toGridPos(pos);
  }

  
  onMouseDown (e) {
    super.onMouseDown(e);
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY)); 
    this.mousePos = this.map.grid.toGridPos(pos);
  }

  onMouseUp (e) {
    super.onMouseUp(e);
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY)); 
    this.mousePos = this.map.grid.toGridPos(pos);
  }

  onMouseMove (e) {
    super.onMouseMove(e);
    let pos = this.currentCamera.toWorldPos(new Vector(e.clientX, e.clientY)); 
    this.mousePos = this.map.grid.toGridPos(pos);
    this.map.grid.onMouseOver(this.mousePos);
  }
  
  resize (width, height) {
    this.currentCamera.viewport = new Vector(width, height);
  }

  
  render (ctx) {
    super.render(ctx);

    this.currentCamera.begin(ctx);
    
    this.map.render(ctx);

    this.foods.forEach(food => {
      food.draw(ctx);
    });

    this.currentCamera.end(ctx);

  }

  
  update (deltaTime) {
    super.update(deltaTime);
    this.timer += deltaTime;
  }

  
  addFood () {
    if(this.foods.length < 10){
      let x = Math.round(Math.random() * this.map.size.x);
      let y = Math.round(this.map.heightAt(x));
      y = this.map.size.y - y;
      this.foods.push(new Food(this.map.grid.toWorldPos(new Vector(x, y - 1))));
    }
  }

  addTree (i, j) {
    if(!this.map.grid.hasTreeAt(new Vector(i - 1, this.map.size.y - Math.round(this.map.heightAt(i - 1)) - 1)) && 
      !this.map.grid.hasTreeAt(new Vector(i + 1, this.map.size.y - Math.round(this.map.heightAt(i + 1)) - 1)) &&
      this.map.grid.cellAt(new Vector(i, j)) instanceof GrassGround)
    {
      this.map.grid.addObj(new Trunk(this.map.grid, new Vector(i, j-1)));
      this.map.grid.addObj(new Trunk(this.map.grid, new Vector(i, j-2)));
      this.map.grid.addObj(new Trunk(this.map.grid, new Vector(i, j-3), [
        new Leaves(this.map.grid, new Vector(i-1, j-3)),
        new Leaves(this.map.grid, new Vector(i+1, j-3)),
        new Leaves(this.map.grid, new Vector(i-1, j-4)),
        new Leaves(this.map.grid, new Vector(i, j-4)),
        new Leaves(this.map.grid, new Vector(i+1, j-4)),
        new Leaves(this.map.grid, new Vector(i-1, j-5)),
        new Leaves(this.map.grid, new Vector(i, j-5)),
        new Leaves(this.map.grid, new Vector(i+1, j-5))
      ]));
      return true;
    }
    return false;
  }

  endGame () {
    this.sceneManager.switchToScene(new GameEndScene(this.sceneManager, this.className));
  }

}

class NormalGameScene extends GameScene{

  init () {
    super.init();
    this.isInitialized = false;

    this.className = NormalGameScene;

    this.player = new Steve(this.spawnPos, new Vector(GRID_SIZE * 0.9, GRID_SIZE * 0.9));
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));

    this.selectedGround = new GrassGround(this.map.grid, this.mousePos);
    this.selectedGround.isCulled = false;

    this.isBuilding = false;
    
    this.isInitialized = true;
  }

  initUI () {
    super.initUI();
    this.goldCounts = new UIText("0", new Vector(45, 17), "gold", 20);
    this.woodCounts = new UIText("0", new Vector(200, 17), "brown", 20);
    this.stoneCounts = new UIText("0", new Vector(355, 17), "gray", 20);
    this.foodCounts = new UIText("0", new Vector(510, 17), "red", 20);
    this.healthUI = new UIText("0", new Vector(170, 56), "red", 20);
    this.hungerUI = new UIText("0", new Vector(170, 86), "blue", 20);
    this.modeText = new UIText("MINE MODE", new Vector(100, 110), "green", 20);
    this.goldCounts.textAlign = "left";
    this.woodCounts.textAlign = "left";
    this.healthUI.textAlign = "left";
    this.hungerUI.textAlign ="left";
    this.stoneCounts.textAlign = "left";
    this.foodCounts.textAlign = "left";

    this.uiHandler.register(this.goldCounts);
    this.uiHandler.register(this.woodCounts);
    this.uiHandler.register(this.stoneCounts);
    this.uiHandler.register(this.foodCounts);
    this.uiHandler.register(this.healthUI);
    this.uiHandler.register(this.hungerUI);
    this.uiHandler.register(this.modeText);
  }

  onClick (e) {
    super.onClick(e);
    if(this.player.isBuilding && this.map.grid.isEmpty(this.mousePos)){
      this.map.grid.addObj(new GrassGround(this.map.grid, this.mousePos));
    }
  }

  onMouseDown (e) {
    super.onMouseDown(e);
    let playerGridPos = this.map.grid.toGridPos(this.player.pos.rounded());
    if(Vector.distance(this.mousePos, playerGridPos) <= 2){
      if(playerGridPos.x > this.mousePos.x){
        this.player.direction = -1;
      }else if(playerGridPos.x < this.mousePos.x) {
        this.player.direction = 1;
      }
      this.player.mine();
    }
  }

  onMouseUp (e) {
    super.onMouseUp(e);
    this.player.stopMinning();
  }
  
  onMouseMove (e) {
    super.onMouseMove(e);
    
    if(this.player.isBuilding && this.map.grid.isEmpty(this.mousePos)){
      this.selectedGround.gridPos = this.mousePos;
    }
  }

  onKeyDown (e) {
    super.onKeyDown(e);
    if(e.keyCode == KEY_B){
      this.player.toggleBuilding();
      if(this.player.isBuilding){
        this.modeText.text = "BUILD MODE";
      }else{
        this.modeText.text = "MINE MODE";
      }
    }
    if(e.keyCode == KEY_E){
      this.player.eatFood();
    }
  }

  render (ctx) {
    super.render(ctx);
    
    this.currentCamera.begin(ctx);

    if(this.player.isBuilding){
      ctx.globalAlpha = 0.5;
      this.selectedGround.draw(ctx);
      ctx.globalAlpha = 1;
    }

    this.player.draw(ctx);
    
    this.currentCamera.end(ctx);
    
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, this.sceneManager.game.options.width, 40);
    
    GetAssetsLoader().assets["./images/gold_block.png"].draw(ctx, new Vector(10, 10), new Vector(20, 20));
    GetAssetsLoader().assets["./images/birch_planks.png"].draw(ctx, new Vector(165, 10), new Vector(20, 20));
    GetAssetsLoader().assets["./images/cobblestone.png"].draw(ctx, new Vector(320, 10), new Vector(20, 20));
    GetAssetsLoader().assets["./images/apple.png"].draw(ctx, new Vector(475, 10), new Vector(20, 20));

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, this.sceneManager.game.options.height - 40, this.sceneManager.game.options.width, 40);
    ctx.closePath();

    ctx.beginPath();
    GetAssetsLoader().assets["./images/health.png"].draw(ctx, new Vector(20, 50), new Vector(20, 20));
    ctx.fillStyle = "#f00";
    ctx.fillRect(50, 50, Math.round(this.player.health), 20);
    ctx.strokeStyle = "#f00";
    ctx.strokeRect(50, 50, 100, 20);
    ctx.closePath();

    ctx.beginPath();
    GetAssetsLoader().assets["./images/apple.png"].draw(ctx, new Vector(20, 80), new Vector(20, 20));
    ctx.fillStyle = "#00f";
    ctx.fillRect(50, 80, Math.round(this.player.hunger), 20);
    ctx.strokeStyle = "#00f";
    ctx.strokeRect(50, 80, 100, 20);
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);

    if(this.timer > 15){
      let x = Math.round(Math.random() * this.map.size.x);
      let tries = 0;
      while (tries < 10){
        if(this.addTree(x, this.map.size.y - Math.round(this.map.heightAt(x)))) {
          break;
        }
        x = Math.round(Math.random() * this.map.size.x);
        tries++;
      }
      this.addFood();
      this.timer = 0;
    }

    if(this.player.isBuilding){
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

    this.player.update(deltaTime);
    this.map.update(deltaTime, this.currentCamera, this.player);
    this.map.grid.onMouseOver(this.mousePos);

    for(let i = 0; i < this.foods.length; i++){
      this.foods[i].update(deltaTime, this.map.grid, this.player);
      if(this.foods[i].isCollected){
        this.foods.splice(i, 1);
        i--;
      }
    }

    this.player.collideWithWorldBounds(this.worldSize);
    this.player.collider.handleCollision(this.map.grid);    

    this.goldCounts.text = this.player.getGoldRewards().toString();
    this.stoneCounts.text = this.player.getStoneRewards().toString();
    this.woodCounts.text = this.player.getWoodRewards().toString();
    this.foodCounts.text = this.player.getFoodRewards().toString();
    this.healthUI.text = Math.round(this.player.health).toString();
    this.hungerUI.text = Math.round(this.player.hunger).toString();

    if(this.player.health <= 0){
      this.endGame();
    }
  }

}

class CreativeGameScene extends GameScene{

  init () {
    super.init();
    this.isInitialized = false;
    
    this.className = CreativeGameScene;
    
    this.currentCamera.pos = this.spawnPos;
    this.currentCamera.collideWithWorldBounds();

    this.selectedGround = new GrassGround(this.map.grid, this.mousePos);
    this.selectedGround.isCulled = false;

    this.isBuilding = false;
    
    this.isInitialized = true;
  }

  initUI () {
    super.initUI();
    
    this.modeText = new UIText("MINE MODE", new Vector(100, 110), "green", 20);

    this.saveBtn = new UIButton("Save", new Vector(this.sceneManager.game.options.width - 200, 20), new Vector(80, 30), "#fff", 20);
    this.saveBtn.borderColor = "#0f0";
    this.saveBtn.setEventListener("mouseover", () => {
      this.saveBtn.background.color = "#0f0";
    });
    this.saveBtn.setEventListener("click", () => {
      this.saveGame();
    });
    this.saveBtn.setEventListener("mouseout", () => {
      this.saveBtn.background.color = null;
    });
    
    this.uiHandler.register(this.saveBtn);
  }

  resize (width, height) {
    super.resize(width, height);
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));
  }

  onKeyDown (e) {
    super.onKeyDown(e);
    switch(e.keyCode){
      case KEY_B:
        this.modeText.text = "BUILD MODE";
        break;
    }
  }

  onKeyUp (e) {
    super.onKeyUp(e);
    switch(e.keyCode){
      case KEY_W:
      case KEY_UP:
      case KEY_S:
      case KEY_DOWN:
      case KEY_A:
      case KEY_LEFT:
      case KEY_D:
      case KEY_RIGHT:
        this.currentCamera.isMoving = false;
        break;
    }
  }

  render (ctx) {
    super.render(ctx);
    
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, this.sceneManager.game.options.width, 40);
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);
    
    if(KEYBOARD.isKeyPressed(KEY_A) || KEYBOARD.isKeyPressed(KEY_LEFT)){
      this.currentCamera.moveLeft();
    }else if(KEYBOARD.isKeyPressed(KEY_D) || KEYBOARD.isKeyPressed(KEY_RIGHT)){
      this.currentCamera.moveRight();
    }else{
      this.currentCamera.isMoving = false;
    }

    if(KEYBOARD.isKeyPressed(KEY_W) || KEYBOARD.isKeyPressed(KEY_UP)){
      this.currentCamera.moveUp();
    }else if(KEYBOARD.isKeyPressed(KEY_S) || KEYBOARD.isKeyPressed(KEY_DOWN)){
      this.currentCamera.moveDown();
    }

    this.map.update(deltaTime, this.currentCamera);
    this.map.grid.onMouseOver(this.mousePos);

  }

  saveGame () {
    let mapName = prompt("Enter the map name: ");
    if(mapName){
      window.localStorage.setItem("minecraft-map__"+mapName, JSON.stringify({
        size: this.map.size,
        grid: this.map.grid.asArray(),
        heights: this.map.heights,
        spawnPos: this.map.spawnPos
      }));
    }
  }

}


class GameEndScene extends Scene{

  constructor (sceneManager, gameSceneClass) {
    super(sceneManager);
    this.gameSceneClass = gameSceneClass;
  }

  init () {
    super.init();
    
    this.background = GetAssetsLoader().loadImage("./images/Minecraft/Stone.png");
    this.background.createPattern("repeat");
  }

  initUI () {
    super.initUI();
    let gameOverText = new UIText("GAME OVER", new Vector(this.sceneManager.game.options.width / 2, 100), "#f00", 100);
    gameOverText.fontWeight = "900";

    let exitToMenuBtn = new UIButton("Exit", new Vector(this.sceneManager.game.options.width / 2 + 80, this.sceneManager.game.options.height - 100), 
    new Vector(120, 50), "#fff", 20);

    exitToMenuBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    exitToMenuBtn.borderColor = "#000";
    exitToMenuBtn.borderSize = 2;

    exitToMenuBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(255, 0, 0, 0.5)";
    });

    exitToMenuBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    exitToMenuBtn.setEventListener('click', () =>{
      this.exitToMainMenu();
    });

    let playAgainBtn = new UIButton("Play Again", new Vector(this.sceneManager.game.options.width / 2 - 80, this.sceneManager.game.options.height - 100), 
              new Vector(120, 50), "#fff", 20);
    playAgainBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    playAgainBtn.borderColor = "#000";
    playAgainBtn.borderSize = 2;


    playAgainBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 255, 0, 0.5)";
    });

    playAgainBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    playAgainBtn.setEventListener('click', () =>{
      this.playAgain();
    });

    this.uiHandler.register(gameOverText);
    this.uiHandler.register(exitToMenuBtn);
    this.uiHandler.register(playAgainBtn);
  }

  playAgain () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, this.gameSceneClass));
  }

  exitToMainMenu () {
    this.sceneManager.switchToScene(new MainMenuScene(this.sceneManager));
  }

}