"use strict";

const MAX_VERTICES = 256;
const MAX_VERTICES_MASK = MAX_VERTICES - 1;

class HeightMapGenerator{

  constructor (amplitude, scale) {
    this.scale = scale;
    this.amplitude = amplitude;

    this.seed();
  }

  seed () {
    this.r = [];
    for(let i = 0; i < MAX_VERTICES; i++){
      this.r.push(Math.random());
    }
  }

  height (x) {
    let scaledX = x * this.scale;
    let xFloor = Math.floor(scaledX);
    let t = scaledX - xFloor;
    let smooth = this.fade(t);

    let xMin = xFloor & MAX_VERTICES_MASK;
    let xMax = (xMin + 1) & MAX_VERTICES_MASK;

    return this.lerp(this.r[xMin], this.r[xMax], smooth) * this.amplitude;
  }

  lerp (a, b, t) {
    return a + (b - a) * t;
  }

  fade (t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

}