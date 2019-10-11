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

"use strict";

const DEFAULT_ZOMBIE_OPTIONS = {
  gravity: 200,
  vel: new Vector(50, 0),
  walkSprite: GetAssetsLoader().loadImage("./images/zombie_typeA_walk_spritesheet.png"),
  attackingDelay: 1,
};

class Zombie{

  constructor (pos, dims, options) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = dims;

    this.options = options || {};
    this.options = this.options.extends(DEFAULT_ZOMBIE_OPTIONS);

    this.vel = this.options.vel.copy();
    this.gravity = this.options.gravity;

    this.walkingSpriteSheet = new Sprite(this.options.walkSprite, 0, 0, 71, 138);
    this.animation = new SpriteAnimation(this.walkingSpriteSheet, 0, 3, 5);
    
    this.isMoving = true;

    this.canAttack = true;
    this.isOnGround = false;
    this.attackingDelay = 5;
    this.timer = 0;
    this.direction = 1;
    this.health = 100;

    this.isOnGround = false;

    this.collider = new Collider(this);
    
  }

  attacked () {
    this.health -= 10;
  }

  attack (player) {
    if(this.canAttack){
      this.isAttacking = true;
      this.isMoving = false;
      this.canAttack = false;
      player.health -= 1;
    }
  }

  stopAttacking () {
    this.isAttacking = false;
    this.isMoving = true;
  }

  draw (ctx) {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.pos.x + this.dims.x / 2, this.pos.y + this.dims.y / 2);
    ctx.scale(this.direction * -1, 1);
    if(this.isMoving && this.isOnGround){
      this.animation.render(ctx, new Vector(-this.dims.x / 2, -this.dims.y / 2), this.dims);
    }else{
      this.walkingSpriteSheet.draw(ctx, new Vector(-this.dims.x / 2, -this.dims.y / 2), this.dims);
    }
    ctx.restore();
    ctx.closePath();
  }

  update (deltaTime, player) {
    this.timer += deltaTime;
    this.attackingDelay -= deltaTime;
    this.vel.x = 50;
    if(Vector.distance(this.pos, player.pos) < 5){
      if(this.canAttack){
        this.attack(player);
      }
      if(player.isMining){
        this.attacked();
      }
    }else{
      this.isAttacking = false;
      this.isMoving = true;
    }

    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;

    if(this.isMoving){
      this.pos.x += this.direction * this.vel.x * deltaTime;
      this.animation.update(deltaTime);
    }

    this.pos.y += this.vel.y * deltaTime;
    this.vel.y += this.gravity * deltaTime;
    if(Math.abs(player.pos.x - this.pos.x) <= 100){
      this.direction = player.pos.x < this.pos.x ? -1: 1;
    }

    if(this.attackingDelay < 0){
      this.attackingDelay = this.options.attackingDelay;
      this.canAttack = true;
    }else if(this.timer >= 5){
      this.isMoving = true;
      
      if(Math.abs(player.pos.x - this.pos.x) <= 100){
        this.direction = player.pos.x < this.pos.x ? -1: 1;
      }else{
        this.direction *= -1;
      }
      this.timer = 0;
    }
  }

  collideWithWorldBounds (worldSize) {
    if(this.pos.x < 0){
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    }else if(this.pos.x > (worldSize.x - this.dims.x)){
      this.pos.x = worldSize.x - this.dims.x;
      this.vel.x = -this.vel.x;
    }
    
    if(this.pos.y < 0){
      this.pos.y = 0;
      this.vel.y = 0;
    }else if(this.pos.y > (worldSize.y - this.dims.y)){
      this.pos.y = worldSize.y - this.dims.y;
      this.vel.y = 0;
    }
  }

  getCenterPos () {
    return Vector.add(this.pos, Vector.mul(this.dims, 0.5));
  }

}