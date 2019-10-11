"use strict";

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