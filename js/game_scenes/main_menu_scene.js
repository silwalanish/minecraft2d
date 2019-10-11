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

class MainMenuScene extends Scene{

  init () {
    super.init();
    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0); 
    this.background.createPattern("repeat");
  }

  initUI () {
    super.initUI();

    let title = new UIText("MINECRAFT", new Vector(this.sceneManager.game.options.width / 2, 100), "#fff", 100);
    title.fontWeight = "900";
    title.fillWithImage(GetAssetsLoader().loadImage("./images/Minecraft/Leaves.png"));
    
    let playBtn = new UIButton("Play", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height / 2), 
              new Vector(350, 50), "#fff", 30);

    playBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    playBtn.borderColor = "#000";
    playBtn.borderSize = 2;

    playBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    playBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    playBtn.setEventListener('click', () =>{
      this.play();
    });

    let playCreativeBtn = new UIButton("Play Creative", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height / 2 + 80), 
                      new Vector(350, 50), "#fff", 30);

    playCreativeBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    playCreativeBtn.borderColor = "#000";
    playCreativeBtn.borderSize = 2;

    playCreativeBtn.setEventListener('mouseover', function() {
      this.background.color = "rgba(0, 0, 255, 0.5)";
    });

    playCreativeBtn.setEventListener('mouseout', function() {
      this.background.color = null;
    });

    playCreativeBtn.setEventListener('click', () =>{
      this.playCreative();
    });

    this.uiHandler.register(title);
    this.uiHandler.register(playBtn);
    this.uiHandler.register(playCreativeBtn);
  }

  play () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, NormalGameScene));
  }

  playCreative () {
    this.sceneManager.switchToScene(new ChooseMapScene(this.sceneManager, CreativeGameScene));
  }

}
