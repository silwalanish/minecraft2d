"use strict";


window.onload = () => {

  let game = new Game(document.getElementById("game-container"), {
    fullScreen: true,
    startScene: MainMenuScene,
    worldSteps: 1
  });
  game.run();

};