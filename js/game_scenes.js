"use strict";
const SMALL_MAP = 0;
const MEDIUM_MAP = 1;
const LARGE_MAP = 2;
const GRID_SIZE = 40;

class MainMenuScene extends Scene{

  init () {
    super.init();
    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0); 
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

    this.uiHandler.register(title);
    this.uiHandler.register(playBtn);
    this.uiHandler.register(playCreativeBtn);
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

    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0);
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

    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Skies/day.png"), 0, 0);

    this.spawnPos = this.map.generate(this);

    this.worldSize = new Vector(GRID_SIZE * this.map.size.x, GRID_SIZE * this.map.size.y);
    this.currentCamera.world = this.worldSize;

    this.mousePos = new Vector(0, 0);
    this.errorMsgTimer = 0;
    this.isCreative = false;
    this.uiClicked = false;

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
      this.uiClicked = true;
      let ok = confirm("Are you sure you want to exit?");
      if(ok){
        this.endGame();
      }
    });
    this.quitBtn.setEventListener("mouseout", () => {
      this.quitBtn.background.color = null;
    });
    
    this.errorText = new UIText("", new Vector(this.sceneManager.game.options.width / 2, 150), "#f00", 30);
      this.uiHandler.register(this.errorText);

    this.helpText = new UIText("USE W/A/S/D or Arrow Keys to move. Press B to toggle Build/Mine mode. LEFT CLICK ON OBJECT TO MINE/PLACE OBJECT/KILL ZOMBIES", 
      new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 20), "#000", 15);

    this.grassGroundSelect = new UIButton("1", new Vector(this.sceneManager.game.options.width - 40, 100), new Vector(40, 40), "#fff", 10);
    this.grassGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Grass.png");
    this.grassGroundSelect.borderColor = "#000";
    this.grassGroundSelect.setEventListener("mouseover", () => {
      this.grassGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.grassGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(1);
    });
    this.grassGroundSelect.setEventListener("mouseout", () => {
      this.grassGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.grassGroundSelect);

    this.dirtGroundSelect = new UIButton("2", new Vector(this.sceneManager.game.options.width - 40, 140), new Vector(40, 40), "#fff", 10);
    this.dirtGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
    this.dirtGroundSelect.borderColor = "#000";
    this.dirtGroundSelect.setEventListener("mouseover", () => {
      this.dirtGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.dirtGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(2);
    });
    this.dirtGroundSelect.setEventListener("mouseout", () => {
      this.dirtGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.dirtGroundSelect);

    this.sandGroundSelect = new UIButton("4", new Vector(this.sceneManager.game.options.width - 40, 220), new Vector(40, 40), "#fff", 10);
    this.sandGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Sand.png");
    this.sandGroundSelect.borderColor = "#000";
    this.sandGroundSelect.setEventListener("mouseover", () => {
      this.sandGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.sandGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(4);
    });
    this.sandGroundSelect.setEventListener("mouseout", () => {
      this.sandGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.sandGroundSelect);

    this.woodGroundSelect = new UIButton("5", new Vector(this.sceneManager.game.options.width - 40, 260), new Vector(40, 40), "#fff", 10);
    this.woodGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Wood_ground.png");
    this.woodGroundSelect.borderColor = "#000";
    this.woodGroundSelect.setEventListener("mouseover", () => {
      this.woodGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.woodGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(5);
    });
    this.woodGroundSelect.setEventListener("mouseout", () => {
      this.woodGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.woodGroundSelect);
    
    this.selectedGroundText = new UIText("GRASSGROUND", new Vector(100, 130), "red", 20);
    this.uiHandler.register(this.selectedGroundText);
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
    this.uiClicked = false;
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
    if(this.errorMsgTimer > 0){
      this.errorMsgTimer -= deltaTime;
    }else if(this.errorMsgTimer <= 0){
      this.errorMsgTimer = 0;
      this.errorText.text = "";
    }
  }

  setError (msg) {
    this.errorMsgTimer = 3;
    this.errorText.text = msg;
  }
  
  addFood () {
    if(this.foods.length < 10){
      let x = Math.round(Math.random() * this.map.size.x);
      let y = this.map.heightAt(x);
      this.foods.push(new Food(this.map.grid.toWorldPos(new Vector(x, y - 2))));
    }
  }

  addTree (i, j) {
    if(!this.map.grid.hasTreeAt(new Vector(i - 1, this.map.heightAt(i - 1) - 1)) && 
      !this.map.grid.hasTreeAt(new Vector(i + 1, this.map.heightAt(i + 1) - 1)) &&
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

  selectGround (type) {
    switch (type) {
      case 1:
        this.selectedGroundClass = GrassGround;
        break;
      case 2:
        this.selectedGroundClass = DirtGround;
        break;
      case 3:
        if(this.isCreative){
          this.selectedGroundClass = StoneGround;
        }
        break;
      case 4:
        this.selectedGroundClass = SandGround;
        break;
      case 5:
        this.selectedGroundClass = WoodGround;
        break;
      case 6:
        if(this.isCreative){
          this.selectedGroundClass = GoldGround;
        }
        break;
      case 7:
        if(this.isCreative){
          this.selectedGroundClass = Trunk;
        }
        break;
      case 8:
        if(this.isCreative){
          this.selectedGroundClass = Leaves;
        }
        break;
      default:
        this.selectedGroundClass = GrassGround;
    }

    this.selectedGround = new this.selectedGroundClass(this.map.grid, this.mousePos);
    this.selectedGroundText.text = this.selectedGround.constructor.name.toUpperCase();

  }
}

const ZOMBIES_SPAWN_DELAY = 15;

class NormalGameScene extends GameScene{

  init () {
    super.init();
    this.isInitialized = false;

    this.className = NormalGameScene;

    this.player = new Steve(this.spawnPos, new Vector(GRID_SIZE * 0.9, GRID_SIZE * 0.9));
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));

    this.selectedGround = new GrassGround(this.map.grid, this.mousePos);
    this.selectedGroundClass = GrassGround;
    this.selectedGround.isCulled = false;

    this.goldUIImg = new Sprite(GetAssetsLoader().loadImage("./images/gold_block.png"), 0, 0);
    this.woodUIImg = new Sprite(GetAssetsLoader().loadImage("./images/birch_planks.png"), 0, 0);
    this.stoneUIImg = new Sprite(GetAssetsLoader().loadImage("./images/cobblestone.png"), 0, 0);
    this.foodUIImg = new Sprite(GetAssetsLoader().loadImage("./images/apple.png"), 0, 0);
    this.healthUIImg = new Sprite(GetAssetsLoader().loadImage("./images/health.png"), 0, 0);

    this.zombies = [];

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
    if(this.player.isBuilding && !this.uiClicked){
      if(!this.map.grid.isEmpty(this.mousePos)){
        this.setError("Remove the ground before you place.");
        return;
      }
      if(this.selectedGround instanceof WoodGround && this.player.getWoodRewards() < 10){
        this.setError("Insufficent Wood, 10 required.");
        return;
      }else if(this.selectedGround instanceof WoodGround){
        this.player.rewards.wood -= 10;
      }else if(this.selectedGround instanceof SandGround && this.player.getGoldRewards() < 10){
        this.setError("Insufficent Gold, 10 required.");
        return;
      }else if(this.selectedGround instanceof SandGround){
        this.player.rewards.gold -= 10;
      }else if(this.player.getStoneRewards() < 10){
        this.setError("Insufficent Stone, 10 required.");
        return;
      }else{
        this.player.rewards.stone -= 10;
      }

      this.map.grid.addObj(new this.selectedGroundClass(this.map.grid, this.mousePos));
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
    
    switch(e.keyCode){
      case KEY_1:
        this.selectGround(1);
        break;
      case KEY_2:
        this.selectGround(2);
        break;
      case KEY_3:
        this.selectGround(3);
        break;
      case KEY_4:
        this.selectGround(4);
        break;
      case KEY_5:
        this.selectGround(5);
        break;
      case KEY_6:
        this.selectGround(6);
        break;
      case KEY_7:
        this.selectGround(7);
        break;
      case KEY_8:
        this.selectGround(8);
        break;
    }
  }
  
  resize (width, height) {
    super.resize(width, height);
    this.currentCamera.follow(this.player, new Vector(this.sceneManager.game.options.width / 2, 300));
  }

  addZombie () {
    if(this.zombies.length == 1){
      return;
    }
    let x = Math.round(Math.random() * this.map.size.x);
    let y = this.map.heightAt(x);
    let zombiePos = this.map.grid.toWorldPos(new Vector(x, y - 3));
    this.zombies.push(new Zombie(zombiePos, new Vector(GRID_SIZE * 0.9, GRID_SIZE * 0.9)));
  }

  render (ctx) {
    super.render(ctx);
    
    this.currentCamera.begin(ctx);

    this.zombies.forEach(zombie => {
      zombie.draw(ctx);
    });

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
    
    this.goldUIImg.draw(ctx, new Vector(10, 10), new Vector(20, 20));
    this.woodUIImg.draw(ctx, new Vector(165, 10), new Vector(20, 20));
    this.stoneUIImg.draw(ctx, new Vector(320, 10), new Vector(20, 20));
    this.foodUIImg.draw(ctx, new Vector(475, 10), new Vector(20, 20));

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, this.sceneManager.game.options.height - 40, this.sceneManager.game.options.width, 40);
    ctx.closePath();

    ctx.beginPath();
    this.healthUIImg.draw(ctx, new Vector(20, 50), new Vector(20, 20));
    ctx.fillStyle = "#f00";
    ctx.fillRect(50, 50, Math.round(this.player.health), 20);
    ctx.strokeStyle = "#f00";
    ctx.strokeRect(50, 50, 100, 20);
    ctx.closePath();

    ctx.beginPath();
    this.foodUIImg.draw(ctx, new Vector(20, 80), new Vector(20, 20));
    ctx.fillStyle = "#00f";
    ctx.fillRect(50, 80, Math.round(this.player.hunger), 20);
    ctx.strokeStyle = "#00f";
    ctx.strokeRect(50, 80, 100, 20);
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);

    if(this.timer > ZOMBIES_SPAWN_DELAY){
      let x = Math.round(Math.random() * this.map.size.x);
      let tries = 0;
      while (tries < 10){
        if(this.addTree(x, Math.round(this.map.heightAt(x)))) {
          break;
        }
        x = Math.round(Math.random() * this.map.size.x);
        tries++;
      }
      this.addFood();
      this.addZombie();
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
    
    for (let i = 0; i < this.zombies.length; i++) {
      const zombie = this.zombies[i];
      zombie.update(deltaTime, this.player);
      if(zombie.health < 0){
        this.zombies.splice(i, 1);
        i--;
        continue;
      }
      zombie.collideWithWorldBounds(this.worldSize);
      zombie.collider.handleCollision(this.map.grid);
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

    this.currentCamera.pos = this.spawnPos.copy();
    this.currentCamera.collideWithWorldBounds();

    this.selectedGround = new GrassGround(this.map.grid, this.mousePos);
    this.selectedGroundClass = GrassGround;
    this.selectedGround.isCulled = false;

    this.isBuilding = false;
    this.isCreative = true;
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
    
    this.stoneGroundSelect = new UIButton("3", new Vector(this.sceneManager.game.options.width - 40, 180), new Vector(40, 40), "#fff", 10);
    this.stoneGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Stone.png");
    this.stoneGroundSelect.borderColor = "#000";
    this.stoneGroundSelect.setEventListener("mouseover", () => {
      this.stoneGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.stoneGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(3);
    });
    this.stoneGroundSelect.setEventListener("mouseout", () => {
      this.stoneGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.stoneGroundSelect);
    
    this.goldGroundSelect = new UIButton("6", new Vector(this.sceneManager.game.options.width - 40, 300), new Vector(40, 40), "#fff", 10);
    this.goldGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Gold.png");
    this.goldGroundSelect.borderColor = "rgba(0, 0, 255, 0.2)";
    this.goldGroundSelect.setEventListener("mouseover", () => {
      this.goldGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.goldGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(6);
    });
    this.goldGroundSelect.setEventListener("mouseout", () => {
      this.woodGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.goldGroundSelect);
    
    this.trunkGroundSelect = new UIButton("5", new Vector(this.sceneManager.game.options.width - 40, 340), new Vector(40, 40), "#fff", 10);
    this.trunkGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Wood_trunk.png");
    this.trunkGroundSelect.borderColor = "#000";
    this.trunkGroundSelect.setEventListener("mouseover", () => {
      this.trunkGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.trunkGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(7);
    });
    this.trunkGroundSelect.setEventListener("mouseout", () => {
      this.trunkGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.trunkGroundSelect);
    
    this.leaveGroundSelect = new UIButton("8", new Vector(this.sceneManager.game.options.width - 40, 380), new Vector(40, 40), "#fff", 10);
    this.leaveGroundSelect.background.image = GetAssetsLoader().loadImage("./images/Minecraft/Leaves.png");
    this.leaveGroundSelect.borderColor = "#000";
    this.leaveGroundSelect.setEventListener("mouseover", () => {
      this.woodGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.woodGroundSelect.setEventListener("click", () => {
      this.uiClicked = true;
      this.selectGround(8);
    });
    this.leaveGroundSelect.setEventListener("mouseout", () => {
      this.leaveGroundSelect.background.color = null;
    });

    this.uiHandler.register(this.leaveGroundSelect);
    
    this.uiHandler.register(this.saveBtn);
    this.uiHandler.register(this.modeText);
  }

  onClick (e) {
    super.onClick(e);
    if(this.isBuilding && !this.uiClicked){
      this.map.grid.addObj(new this.selectedGroundClass(this.map.grid, this.mousePos));
    }else{
      this.map.grid.removeAt(this.mousePos);
    }
  }

  onMouseMove (e) {
    super.onMouseMove(e);
    this.selectedGround.gridPos = this.mousePos.copy(); 
  }

  onKeyDown (e) {
    super.onKeyDown(e);
    switch(e.keyCode){
      case KEY_B:
        this.isBuilding = !this.isBuilding;
        if(this.isBuilding){
          this.modeText.text = "BUILD MODE";
        }else{
          this.modeText.text = "MINE MODE";
        }
        break;
      case KEY_1:
        this.selectGround(1);
        break;
      case KEY_2:
        this.selectGround(2);
        break;
      case KEY_3:
        this.selectGround(3);
        break;
      case KEY_4:
        this.selectGround(4);
        break;
      case KEY_5:
        this.selectGround(5);
        break;
      case KEY_6:
        this.selectGround(6);
        break;
      case KEY_7:
        this.selectGround(7);
        break;
      case KEY_8:
        this.selectGround(8);
        break;
    }
  }

  render (ctx) {
    super.render(ctx);
    
    this.currentCamera.begin(ctx);

    if(this.isBuilding){
      this.selectedGround.draw(ctx);
    }

    this.currentCamera.end(ctx);

    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(0, 0, this.sceneManager.game.options.width, 40);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0, this.sceneManager.game.options.height - 40, this.sceneManager.game.options.width, 40);
    ctx.closePath();
  }

  update (deltaTime) {
    super.update(deltaTime);
    
    if(KEYBOARD.isKeyPressed(KEY_A) || KEYBOARD.isKeyPressed(KEY_LEFT)){
      this.currentCamera.moveLeft();
    }else if(KEYBOARD.isKeyPressed(KEY_D) || KEYBOARD.isKeyPressed(KEY_RIGHT)){
      this.currentCamera.moveRight();
    }

    if(KEYBOARD.isKeyPressed(KEY_W) || KEYBOARD.isKeyPressed(KEY_UP)){
      this.currentCamera.moveUp();
    }else if(KEYBOARD.isKeyPressed(KEY_S) || KEYBOARD.isKeyPressed(KEY_DOWN)){
      this.currentCamera.moveDown();
    }

    if(this.isBuilding){
      this.selectedGround.update(deltaTime);
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
      alert("Saved!");
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
    
    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0);
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