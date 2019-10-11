"use strict";

const SMALL_MAP = 0;
const MEDIUM_MAP = 1;
const LARGE_MAP = 2;

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
          case SMALL_MAP:
            size = new Vector(50, 50);
            break;
          case MEDIUM_MAP:
            size = new Vector(250, 50);
            break;
          case LARGE_MAP:
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
