/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use, 
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, subject 
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

"use strict";

const GRID_SIZE = 40;

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

    this.helpText = new UIText("USE W/A/S/D or Arrow Keys to move. Press B to toggle Build/Mine mode. LEFT CLICK ON OBJECT TO MINE/PLACE OBJECT/KILL ZOMBIES. Press E to eat food.", 
      new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 20), "#00f", 12);

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
