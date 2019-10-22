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

class HelpScene extends Scene{

  constructor (sceneManager) {
    super(sceneManager);
  }

  init () {
    super.init();

    this.background = new Sprite(GetAssetsLoader().loadImage("./images/Minecraft/Stone.png"), 0, 0);
    this.background.createPattern("repeat");
  }

  initUI () {
    super.initUI();

    let title = new UIText("HELP", new Vector(this.sceneManager.game.options.width / 2, 100), "#fff", 100);
    title.fontWeight = "900";

    let controlsLines = [
      "Up Arrow | W => Jump",
      "Left Arrow | A => Move left",
      "Right Arrow | D => Move Right",
      "B => Toggle Build/Mine mode",
      "E => Eat food(apple)",
      "1-8 => Change ground to be built in building mode.",
      "Also can be changed by clicking on the icons on the left."
    ];

    let rulesLines = [
      "Can't eat food unless hunger (BLUE) bar is less than 50.",
      "Eating food restores health and hunger by 50 with maximum being 100 for both.",
      "When Build Mode is on clicking on empty space creates the selected ground.",
      "When Mine Mode is on clicking on ground/trees with in 1 block of player will be mined.",
      "Mining resources gives rewards.",
      "Zombies will follow when near",
      "If Zombies touch then health decrease.",
      "When hunger becomes zero health decreases.",
      "When health becomes zero player dies.",
      "Building ground requires resources.",
      "In creative mode, any ground can be removed and added without charge.",
    ]

    let controlsTitle = new UIText("Controls", new Vector(330, 200), "#fff", 40);
    let controlsContent = controlsLines.map((line, index) => (
      new UIText(line, new Vector(330, 240 + (index * 25)), "#fff", 20)
    ));

    let rulesTitle = new UIText("Rules", new Vector(330 + 600, 200), "#fff", 40);
    let rulesContent = rulesLines.map((line, index) => (
      new UIText(line, new Vector(330 + 600, 240 + (index * 25)), "#fff", 20)
    ));

    let backBtn = new UIButton("Back", new Vector(
      this.sceneManager.game.options.width / 2 - 80,
      this.sceneManager.game.options.height - 100), 
      new Vector(120, 50),
      "#fff",
      20
    );
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
    this.uiHandler.register(controlsTitle);
    controlsContent.forEach(l => this.uiHandler.register(l));
    this.uiHandler.register(rulesTitle);
    rulesContent.forEach(l => this.uiHandler.register(l));
    
    this.uiHandler.register(backBtn);
  }

  back () {
    this.sceneManager.switchToScene(new MainMenuScene(this.sceneManager));
  }

}
