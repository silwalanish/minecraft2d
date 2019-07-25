"use strict";


function imageToSprite (img) {
  return new Sprite(img, 0, 0, img.width, img.height);
}

window.onload = () => {
  GetAssetsLoader().loadImage("./images/Minecraft/Stone.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/gold_block.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/birch_planks.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/cobblestone.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/apple.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/health.png", imageToSprite);
  GetAssetsLoader().loadImage("./images/Minecraft/Dirt.png");
  let game = new Game(document.getElementById("game-container"), {
    fullScreen: true,
    startScene: MainMenuScene,
    worldSteps: 10
  });
  game.run();

};