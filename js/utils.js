Object.prototype.extends = function(baseClass) {
  let parentKeys = Object.keys(baseClass);
  parentKeys.forEach(key => {
    if(!this.hasOwnProperty(key)){
      this[key] = baseClass[key];
    }
  });
  return this;
};