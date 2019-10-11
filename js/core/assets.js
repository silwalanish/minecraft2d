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