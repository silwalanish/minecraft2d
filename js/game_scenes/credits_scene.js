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

class CreditsScene extends Scene{

  constructor (sceneManager) {
    super(sceneManager);
  }

  init () {
    super.init();

    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0);
    this.background.createPattern("repeat");
    this.mapType = null;
    this.customMapData = null;
  }

  initUI () {
    super.initUI();

    this.errorText = new UIText("", new Vector(this.sceneManager.game.options.width / 2, this.sceneManager.game.options.height - 150), "#f00", 30);
    this.uiHandler.register(this.errorText);

    let title = new UIText("CREDITS", new Vector(this.sceneManager.game.options.width / 2, 100), "#fff", 100);
    title.fontWeight = "900";

    let groundTexturesText = new UIText("Ground Textures: ", new Vector(350, 220), "#fff", 40);
    let groundTexturesLink = new UIText("https://opengameart.org/content/2d-minecraft-sprite-pack", new Vector(350 + 550, 225), "#1D8EFE", 20);
    let steveTexturesText = new UIText("Steve Textures: ", new Vector(330, 320), "#fff", 40);
    let steveTexturesLink = new UIText("https://opengameart.org/content/2d-minecraft-steve", new Vector(330 + 500, 325), "#1D8EFE", 20);
    let zombieSpriteText = new UIText("Zombie Sprite: ", new Vector(310, 420), "#fff", 40);
    let zombieSpriteLink = new UIText("https://opengameart.org/content/zombie-character-sprite", new Vector(310 + 500, 425), "#1D8EFE", 20);


    groundTexturesLink.setEventListener("mouseover", () => {
        groundTexturesLink.color = "#69A0FE";
    });
    groundTexturesLink.setEventListener("click", () => {
        window.open(groundTexturesLink.text);
    });
    groundTexturesLink.setEventListener("mouseout", () => {
        groundTexturesLink.color = "#1D8EFE";
    });

    steveTexturesLink.setEventListener("mouseover", () => {
        steveTexturesLink.color = "#69A0FE";
    });
    steveTexturesLink.setEventListener("click", () => {
        window.open(steveTexturesLink.text);
    });
    steveTexturesLink.setEventListener("mouseout", () => {
        steveTexturesLink.color = "#1D8EFE";
    });

    zombieSpriteLink.setEventListener("mouseover", () => {
        zombieSpriteLink.color = "#69A0FE";
    });
    zombieSpriteLink.setEventListener("click", () => {
        window.open(zombieSpriteLink.text);
    });
    zombieSpriteLink.setEventListener("mouseout", () => {
        zombieSpriteLink.color = "#1D8EFE";
    });

    let backBtn = new UIButton("Back", new Vector(this.sceneManager.game.options.width / 2 - 80, this.sceneManager.game.options.height - 100), 
              new Vector(120, 50), "#fff", 20);
    backBtn.background.image = GetAssetsLoader().loadImage("./images/clay.png");
    backBtn.borderColor = "#000";
    backBtn.borderSize = 2;

    backBtn.setEventListener('mouseover', function() {
        this.background.color = "rgba(255, 0, 0, 0.5)";
    });
  
    backBtn.setEventListener('mouseout', function() {
    this.background.color = null;
    });

    backBtn.setEventListener('click', () =>{
    this.back();
    });

    this.uiHandler.register(title);
    this.uiHandler.register(groundTexturesText);
    this.uiHandler.register(groundTexturesLink);
    this.uiHandler.register(steveTexturesText);
    this.uiHandler.register(steveTexturesLink);
    this.uiHandler.register(zombieSpriteText);
    this.uiHandler.register(zombieSpriteLink);
    this.uiHandler.register(backBtn);
  }

  back () {
    this.sceneManager.switchToScene(new MainMenuScene(this.sceneManager));
  }

}
