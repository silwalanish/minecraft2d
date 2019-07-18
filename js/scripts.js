
window.onload = () => {

  function runGame () {
    let display = new Display(document.clientWidth, document.clientHeight);
    let gameContainer = document.getElementById("game-container");
    
    gameContainer.appendChild(display.init());
  }

  let scriptFiles = [
    "./js/core/controller.js",
    "./js/core/display.js",
    "./js/core/engine.js",
    "./js/core/game.js"
  ];

  loadScripts(scriptFiles, runGame);

};