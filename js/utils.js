Object.prototype.extends = function(baseClass) {
  let parentKeys = Object.keys(baseClass);
  parentKeys.forEach(key => {
    if(!this.hasOwnProperty(key)){
      this[key] = baseClass[key];
    }
  });
  return this;
};

function loadScripts (scriptFiles, callback) {
  let nScriptFileRem = scriptFiles.length;

  scriptFiles.forEach(scriptFilePath => {
    let script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptFilePath);

    script.onload = () => {
      nScriptFileRem--;
      console.log(nScriptFileRem, script.src);
      
      if(nScriptFileRem == 0){
        callback();
      }
    };

    document.head.appendChild(script);

  });

}