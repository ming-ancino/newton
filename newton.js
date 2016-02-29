var Newton = Newton || {};

(function(namespace) {

  var self = namespace.Element = function(type, attributes, children){
    this.element = document.createElement(type);
    this._attachAttributes(attributes);
    this.children = children || [];
  };

  self.prototype = {
    render: function(){
      this._attachChildren();

      return this.element;
    },

    setChildren: function(children){
      for(var i=0; i<children.length; i++) this.children.push(children[i]);
    },

    _attachAttributes: function(attributes){
      for (var prop in attributes){
        if (attributes.hasOwnProperty(prop)) {;
          this.element[prop] = attributes[prop];
        }
      }
    },

    _attachChildren: function(){
      for(var i = 0; i < this.children.length; i++){

        if(typeof this.children[i] === 'string'){
          this.element.innerHTML += this.children[i];
        }
        else{
          childNode = this.children[i].render();
          this.element.appendChild(childNode.cloneNode(true));
      }

      }
    }
  };

})(Newton);



$ = function(elementType, attributes, ...children){
 return new Newton.Element(elementType, attributes, children);
};


var foo = $('div', {className: 'foo'});
var baz = $('span', {className: 'baz'});
var bar = $('div', {className: 'bar'}, foo, $('p', null, 'Hello'));
foo.setChildren([baz]);

console.log(bar.render());



