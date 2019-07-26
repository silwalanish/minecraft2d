"use script";

class Food{

  constructor (pos) {
    this.pos = pos;
    this.oldPos = pos.copy();
    this.dims = new Vector(30, 30);
    this.vel = new Vector(0, 50);
    this.isCollected = false;
    this.collider = new Collider(this);
    this.sprite = new Sprite(GetAssetsLoader().assets["./images/apple.png"], 0, 0, 20, 20);
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