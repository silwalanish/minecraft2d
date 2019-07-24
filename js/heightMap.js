class HeightMapGenerator{

  static MAX_VERTICES = 256;
  static MAX_VERTICES_MASK = HeightMapGenerator.MAX_VERTICES - 1;

  constructor (amplitude, scale) {
    this.scale = scale;
    this.amplitude = amplitude;

    this.seed();
  }

  seed () {
    this.r = [];
    for(let i = 0; i < HeightMapGenerator.MAX_VERTICES; i++){
      this.r.push(Math.random());
    }
  }

  height (x) {
    let scaledX = x * this.scale;
    let xFloor = Math.floor(scaledX);
    let t = scaledX - xFloor;
    let smooth = this.fade(t);

    let xMin = xFloor & HeightMapGenerator.MAX_VERTICES_MASK;
    let xMax = (xMin + 1) & HeightMapGenerator.MAX_VERTICES_MASK;

    return this.lerp(this.r[xMin], this.r[xMax], smooth) * this.amplitude;
  }

  lerp (a, b, t) {
    return a + (b - a) * t;
  }

  fade (t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

}