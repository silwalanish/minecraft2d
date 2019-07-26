"use strict";

window.onload = () => {
  GetAssetsLoader().loadImagesAndWait([
    "./images/Minecraft/Stone.png",
    "./images/Minecraft/Leaves.png",
    "./images/Minecraft/Dirt.png",
    "./images/Minecraft/Gold.PNG",
    "./images/Minecraft/Sand.PNG",
    "./images/Minecraft/Grass.png",
    "./images/Minecraft/Wood_trunk.png",
    "./images/Minecraft/Wood_ground.png",
    "./images/clay.png",
    "./images/Skies/day.png",
    "./images/gold_block.png",
    "./images/birch_planks.png",
    "./images/cobblestone.png",
    "./images/apple.png",
    "./images/health.png",
    "./images/anim-sheet.png",
    "./images/zombie_typeA_walk_spritesheet.png"
  ], () => {
    let game = new Game(document.getElementById("game-container"), {
      fullScreen: true,
      startScene: MainMenuScene,
      worldSteps: 100
    });
    game.run();
  });

};