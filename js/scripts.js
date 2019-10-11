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
    document.getElementById("game-loading").style.display = "none";
    let game = new Game(document.getElementById("game-container"), {
      fullScreen: true,
      startScene: MainMenuScene,
      worldSteps: 100
    });
    game.run();
  });

};