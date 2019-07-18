
window.onload = () => {

  loadScripts([
    "./js/core/display.js",
    "./js/core/scene.js",
    "./js/core/game.js",

    "./js/game_scenes.js"
  ], function(){

    let game = new Game(document.getElementById("game-container"), {
      fullScreen: true,
      startScene: NormalGameScene
    });
    game.run();
    
  });

};