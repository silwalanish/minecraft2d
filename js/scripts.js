
window.onload = () => {

  loadScripts([
    "./js/core/controller.js",
    "./js/core/display.js",
    "./js/core/engine.js",
    "./js/core/game.js"
  ], function(){

    let display = new Display(document.documentElement.clientWidth, document.documentElement.clientHeight);
    let gameContainer = document.getElementById("game-container");
    
    gameContainer.appendChild(display.init());
    display.clearColor("#000");
  });

};