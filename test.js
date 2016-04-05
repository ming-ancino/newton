var foo = $('div', {className: 'foo'});
var baz = $('span', {className: 'baz'});
var bar = $('div', {className: 'bar'}, foo, $('p', null, 'Hello'));
foo.setChildren([baz]);

console.log(bar.render());

var generic = new Newton.Component({x: 1, y: 2});
// console.log(generic.props.x);
// console.log(generic.props.y);


var x = new Newton.Component(),
    y = new Newton.Component(),
    z = new Newton.Component();

// console.log(x.getUID() + '-' + y.getUID() + '-' + z.getUID());

var c = new Newton.Component();
// c.setState({visible: true, clicked: false});
// c.setState({clicked: true});

// console.log(c.state);

var Box = Newton.createClass({

  getInitialState: function(){
    return {visible: true};
  },

  render: function(){
    return $('div', {className: 'box'});
  }

});

var box = new Box();

console.log(box instanceof Box); // true
console.log(box instanceof Newton.Component); // true
console.log(box.state); // {visible: true}


var TextComponent = Newton.createClass({
  render: function(){
    return $('p', {className: 'text-component'}, this.props.text);
  }
});

var element = $(TextComponent, {text: 'Hello'});

// Output:
// <p class='text-component' data-newtonid='0'>Hello</p>
console.log(element.render());


var InnerComponent = Newton.createClass({
    render: function(){
        return $('div', {className: 'inner'});
    }
});
var inner = $(InnerComponent);
var OuterComponent = Newton.createClass({
    render: function(){
        return $('div', {className: 'outer'}, inner);
    }
});

var outer = $(OuterComponent);

console.log(outer.render());
console.log(outer.components());

var TextComponent = Newton.createClass({
  render: function(){
    return $('p', {className: 'text-component'}, this.props.text);
  }
});

var textComponent = new TextComponent({text: 'hello'}),
        p = textComponent.render();

p.setMainComponent(textComponent);
console.log(p.components()); // [textComponent]


var Box = Newton.createClass({
  render: function(){
    return $('div', {className: 'box'});
  }
});

var boxElement = $(Box);
console.log(boxElement.components()); // [Box instance]

Newton.DOM.render(
  $('div', {className: 'test'}),
  document.getElementById('container')
);

var TextComponent = Newton.createClass({

  willRender: function(){
    console.log(this.props.text + ' will render');
  },

  didRender: function(){
    console.log(this.props.text + ' did render');
  },

  render: function(){
    return $('p', {className: 'text-component'}, this.props.text);
  }

});

Newton.DOM.render(
  $(TextComponent, {text: 'Hello World'}),
  document.getElementById('container')
);

var InnerComponent = Newton.createClass({
  willRender: function(){ console.log('inner will render'); },

  render: function(){
    return $('div', {className: 'inner'}, 'render inner');
  }
});

var inner = $(InnerComponent);

var OuterComponent = Newton.createClass({
  willRender: function(){ console.log('outer will render'); },

  render: function(){
    return $('div', {className: 'outer'}, $(InnerComponent), 'render outer');
  }
});

function clicked(){ alert("I am clicked!"); }

var div = $('div', {onclick: clicked});

Newton.DOM.render(
  $(OuterComponent),
  document.getElementById('container')
);

var Text = Newton.createClass({
  render: function(){
    return $('p', null, this.props.text);
  }
});

var text = $(Text, {text: 'Hello'});
Newton.DOM.render(text, document.getElementById('container'));

var textComponent = text.components()[0];
textComponent.props.text = "Hola";

Newton.DOM.update(textComponent); // should update the rendered text to 'Hola'

var Text = Newton.createClass({
  getInitialState: function(){
    return {clicked: false};
  },

  willRender: function(){ console.log( this.state.clicked + ' will render'); },
  didRender: function(){ console.log( this.state.clicked + ' did render'); },

  render: function(){
    var string = this.state.clicked ? 'thanks': 'click me';
    return $('p', {onclick: this.onclick.bind(this), onmouseover: this.onmouseover.bind(this)}, string);
  },

  onclick: function(e){
    e.preventDefault();

    // This should automaticall re-render the component to the DOM
    // using Newton.DOM.update method.
    this.setState({clicked: !this.state.clicked});
  },

  onmouseover: function(e){
    e.preventDefault();
    console.log('onmouseover');
  }
});

var clickme = $(Text);
Newton.DOM.render(clickme, document.getElementById('container'));



