(function(namespace) {
  var id = 0;

  var self = namespace.Component = function(props){
    this.props = props;
    this.UID = id ++;
    this.state = this.getInitialState();
  };

  self.prototype = {
    render: function(){
     return null;
    },

    willRender: function(){
      return null;
    },

    didRender: function(){
      return null;
    },

    getUID: function(){
     return this.UID;
    },

    getInitialState: function(){
     return {};
    },

    setState: function(newState){
      for(state in newState){
        this.state[state] = newState[state];
      }

      namespace.DOM.update(this);
    }
  };

  namespace.createClass = function(properties){
    var component = Newton.Component;

    var constructor = function Constructor(params){
      component.call(this, params)
    };
 
     for(prop in component.prototype){
       constructor.prototype[prop] = component.prototype[prop];
     }    

    for(property in properties){
      constructor.prototype[property] = properties[property];
    }

    return constructor;

  }

})(Newton);