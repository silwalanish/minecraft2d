"use strict";


window.onload = () => {

  let game = new Game(document.getElementById("game-container"), {
    fullScreen: true,
    startScene: NormalGameScene
  });
  game.run();

};