/**
 *
 * Copyright 2019 Anish Silwal Khatri
 *
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

"use script";

class Food{

  constructor (pos) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = new Vector(30, 30);
    this.vel = new Vector(0, 50);
    this.isCollected = false;
    this.collider = new Collider(this);
    this.sprite = new Sprite(GetAssetsLoader().loadImage("./images/apple.png"), 0, 0, 20, 20);
  }

  update (deltaTime, grid, player) {
    this.pos.y += this.pos.y * deltaTime;
    this.vel.y += player.gravity * deltaTime;

    if(player.collider.collidesWith(this.collider) || this.collider.collidesWith(player.collider)){
      player.addReward({
        rewardType: "Food",
        reward: 1
      });
      this.isCollected = true;
    }
    this.collider.handleCollision(grid);
  }

  draw (ctx) {
    ctx.beginPath();
    this.sprite.draw(ctx, this.pos, this.dims);
    ctx.closePath();
  }

}