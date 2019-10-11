"use strict";

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
