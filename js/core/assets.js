"use strict";

function GetAssetsLoader () {

  if(GetAssetsLoader.instance){
    return GetAssetsLoader.instance;
  }

  class AssetsLoader {

    constructor () {
      this.assets = {};
    }

    loadImage (path, callback, reload) {
      if(this.assets.hasOwnProperty(path) && !reload){
        if(callback){
          this.assets[path] = callback(this.assets[path]);
        }
        return this.assets[path];
      }

      this.assets[path] = new Image();
      this.assets[path].src = path;
      this.assets[path].onload = () => {
        if(callback){
          this.assets[path] = callback(this.assets[path]);
        }
      };

      return this.assets[path];
    }

  }

  GetAssetsLoader.instance =  new AssetsLoader();
  return GetAssetsLoader.instance;
}