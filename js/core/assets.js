"use strict";

function GetAssetsLoader () {

  if(GetAssetsLoader.instance){
    return GetAssetsLoader.instance;
  }

  class AssetsLoader {

    constructor () {
      this.assets = {};
      this.numStillLoading = 0;
    }

    loadImage (path, reload) {
      path = path.toLowerCase();
      if(this.assets.hasOwnProperty(path) && !reload){
        return this.assets[path];
      }
      this.numStillLoading++;
      this.assets[path] = new Image();
      this.assets[path].src = path;
      this.assets[path].onload = (img) => {
        this.numStillLoading--;
      };

      return this.assets[path];
    }

    loadImagesAndWait (pathArray, callback) {
      this.numStillLoading = 0;
      pathArray.forEach(path => {
        this.loadImage(path);
      });
      window.requestAnimationFrame(() => {
        this.loop(callback);
      });
    }

    loop (callback) {
      if(this.numStillLoading == 0){
        callback();
      }else{
        window.requestAnimationFrame(() => {
          this.loop(callback);
        });
      }
    }

  }

  GetAssetsLoader.instance =  new AssetsLoader();
  return GetAssetsLoader.instance;
}