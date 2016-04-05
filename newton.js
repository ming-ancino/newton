var Newton = Newton || {};

$ = function(elementType, attributesOrProps, ...children){
  if (typeof elementType === 'function'){

    var instance = new elementType(attributesOrProps);
    var node = instance.render();

    node.setMainComponent(instance);

    return node;
  }
  else{
    var element = new Newton.Element(elementType, attributesOrProps, children);
    return element;
  }
  
};




