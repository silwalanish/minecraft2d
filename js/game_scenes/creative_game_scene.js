"use strict";

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
    
    this.trunkGroundSelect = new UIButton("7", new Vector(this.sceneManager.game.options.width - 40, 340), new Vector(40, 40), "#fff", 10);
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
      this.leaveGroundSelect.background.color = "rgba(0, 0, 255, 0.2)";
    });
    this.leaveGroundSelect.setEventListener("click", () => {
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
