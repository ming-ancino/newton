(function(namespace) {

  var self = namespace.DOM = {

    render: function(element, htmlElement){
      element.willRender();

      htmlElement.appendChild(element.render());

      element.didRender();
    },

    update: function(component){
      var newtonId = component.getUID();

      var elements = document.getElementsByTagName('*');

      for (var i = 0; i < elements.length; i++){
        var node = elements[i];

        if (node.getAttribute('data-newtonid') == newtonId) {
          var parent = node.parentNode;

          if (parent) {

            parent.removeChild(node);

            var newNode = component.render();
            newNode.setMainComponent(component);
            
            this.render(newNode, parent);

            break;
          }
        }
      }

    }
  };

})(Newton);