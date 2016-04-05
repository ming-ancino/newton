(function(namespace) {

  var self = namespace.Element = function(type, attributes, children){
    this.element = document.createElement(type);
    this.attributes = attributes || [];
    this.children = children || [];
    this.componentList = [];
  };

  self.prototype = {
    render: function(){
      this._attachAttributes();
      this._attachChildren();

      return this.element;
    },

    willRender: function(){
      if(this.componentList.length > 0) this.componentList[0].willRender();
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i] instanceof namespace.Element)
          this.children[i].willRender();
      }
    },

    didRender: function(){
      if(this.componentList.length > 0) this.componentList[0].didRender();

      for(var i = 0; i < this.children.length; i++){
        if(this.children[i] instanceof namespace.Element)
          this.children[i].didRender();
      }
    },

    setChildren: function(children){
      this.children = children;
    },

    setMainComponent: function(component){
      this.componentList.push(component);
    },

    components: function(){
      return this.componentList;
    },

    _attachAttributes: function(){
      for (var prop in this.attributes){
        if (this.attributes.hasOwnProperty(prop)) {;
          this.element[prop] = this.attributes[prop];
        }
      }
      if(typeof this.componentList[0] === 'object')
        this.element.setAttribute('data-newtonid', this.componentList[0].getUID());
    },

    _attachChildren: function(){
      for(var i = 0; i < this.children.length; i++){
        if(typeof this.children[i] === 'string'){
          this.element.innerHTML += this.children[i];
        }
        else{
          var child = this.children[i];

          for (var j = 0; j < child.components().length; j++ ){
            this.componentList.push(child.components()[j]);
          }

          var childNode = child.render();
          this.element.appendChild(childNode.cloneNode(true));
        }

      }
    },
  };

})(Newton);