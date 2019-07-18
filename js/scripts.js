"use strict";

window.onload = () => {

  loadScripts([
    "./js/core/display.js",
    "./js/core/scene.js",
    "./js/core/game.js",
    "./js/core/camera.js",
    "./js/core/sprites.js",

    "./js/grounds.js",
    "./js/grid.js",
    "./js/steve.js",
    "./js/game_scenes.js"
  ], function(){

    let game = new Game(document.getElementById("game-container"), {
      fullScreen: true,
      startScene: NormalGameScene
    });
    game.run();

  });

};