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