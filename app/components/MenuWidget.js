var React = require('react');
var handleEntityChange = require('./Widget');
var Events = require('../lib/Events.js');
var Clipboard = require('clipboard');
var Exporter = require('../exporter.js');


var CreateMenu = React.createClass({
  getInitialState: function() {
    return {primitivesDefinitions: {
      'Entity': {group: 'entities', element: 'a-entity', components: {}},

      'Box': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:box', material: 'color:#f00'}},
      'Sphere': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:sphere', material: 'color:#ff0'}},
      'Cylinder': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:cylinder', material: 'color:#00f'}},
      'Plane': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:plane', material: 'color:#fff'}},
      'Torus': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:torus', material: 'color:#0f0'}},
      'TorusKnot': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:torusKnot', material: 'color:#f0f'}},
      'Circle': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:circle', material: 'color:#f0f'}},
      'Ring': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:ring', material: 'color:#0ff'}},

      'Ambient': {group: 'lights', element: 'a-entity', components: {light: 'type:ambient'}},
      'Directional': {group: 'lights', element: 'a-entity', components: {light: 'type:directional'}},
      'Hemisphere': {group: 'lights', element: 'a-entity', components: {light: 'type:hemisphere'}},
      'Point': {group: 'lights', element: 'a-entity', components: {light: 'type:point'}},
      'Spot': {group: 'lights', element: 'a-entity', components: {light: 'type:spot'}},

      'Camera': {group: 'cameras', element: 'a-entity', components: {camera: ''}}
      }
    };
  },
  render: function() {
    var prevGroup = null;
    var definitions = this.state.primitivesDefinitions;

    return <div className="menu">
              <div className="title">Create</div>
              <div className="options">
              {
                Object.keys(definitions).map(function(definition) {
                  var output = [];
                  if (prevGroup === null) {
                    prevGroup = definitions[definition].group;
                  } else if (prevGroup !== definitions[definition].group) {
                    prevGroup = definitions[definition].group;
                    output.push(<hr/>);
                  }
                  output.push(<div className="option" key={definition} value={definition} onClick={this.createEntity}>{definition}</div>);
                  return output;
                }.bind(this))
              }
              </div>
            </div>;
  },
  createEntity: function(e) {
    Events.emit('createNewEntity', this.state.primitivesDefinitions[e.target.value]);
  },
});


var EditMenu = React.createClass({
  getInitialState: function() {
    return {primitivesDefinitions: {
      'Entity': {group: 'entities', element: 'a-entity', components: {}},

      'Box': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:box', material: 'color:#f00'}},
      'Sphere': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:sphere', material: 'color:#ff0'}},
      'Cylinder': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:cylinder', material: 'color:#00f'}},
      'Plane': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:plane', material: 'color:#fff'}},
      'Torus': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:torus', material: 'color:#0f0'}},
      'TorusKnot': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:torusKnot', material: 'color:#f0f'}},
      'Circle': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:circle', material: 'color:#f0f'}},
      'Ring': {group: 'primitives', element: 'a-entity', components: {geometry: 'primitive:ring', material: 'color:#0ff'}},

      'Ambient': {group: 'lights', element: 'a-entity', components: {light: 'type:ambient'}},
      'Directional': {group: 'lights', element: 'a-entity', components: {light: 'type:directional'}},
      'Hemisphere': {group: 'lights', element: 'a-entity', components: {light: 'type:hemisphere'}},
      'Point': {group: 'lights', element: 'a-entity', components: {light: 'type:point'}},
      'Spot': {group: 'lights', element: 'a-entity', components: {light: 'type:spot'}},

      'Camera': {group: 'cameras', element: 'a-entity', components: {camera: ''}}
      }
    };
  },
  render: function() {
    var prevGroup = null;
    var definitions = this.state.primitivesDefinitions;

    return <div className="menu">
              <div className="title">Create</div>
              <div className="options">
              {
                Object.keys(definitions).map(function(definition) {
                  var output = [];
                  if (prevGroup === null) {
                    prevGroup = definitions[definition].group;
                  } else if (prevGroup !== definitions[definition].group) {
                    prevGroup = definitions[definition].group;
                    output.push(<hr/>);
                  }
                  output.push(<div className="option" key={definition} value={definition}>{definition}</div>);
                  return output;
                }.bind(this))
              }
              </div>
            </div>;
  },
  createEntity: function(e) {
    Events.emit('createNewEntity', this.state.primitivesDefinitions[e.target.value]);
  },
});

var MenuWidget = React.createClass({
  update: function(e) {
    var value = e.target.value;
    this.setState({value: value});
    if (this.props.onChange)
      this.props.onChange(this.props.entity, this.props.componentname, this.props.name, value);
  },
  componentDidMount: function() {
    var clipboard = new Clipboard('[data-action="copy-to-clipboard"]', {
      text: function (trigger) {
        return Exporter.generateHtml();
      }
    });
    clipboard.on('error', function(e) {
        console.error('Error while copying to clipboard:', e.action, e.trigger);
    });
  },
  componentWillReceiveProps: function(newProps) {
    // This will be triggered typically when the element is changed directly with element.setAttribute
  /*  if (newProps.value != this.state.value) {
      this.setState({value: newProps.value});
    }
*/
  },
  copyToClipboard: function() {
    //console.log(Exporter.generateHtml());
  },
  render: function() {
    return <div className="Panel" id="menubar">
      {

      }
      <div className="menu aframe-logo">
        <div className="title">
          <span style={{color: '#ed3160'}}>A-</span>
          <span style={{color: '#fff'}}>Frame</span>
        </div>
      </div>
      <div className="menu">
        <div className="title">Scene</div>
        <div className="options">
          <div className="option">Save HTML</div>
          <div className="option" data-action="copy-to-clipboard">Copy to clipboard</div>
        </div>
      </div>
      <div className="menu">
        <div className="title">Edit</div>
      </div>
      <CreateMenu/>
    </div>;
  }
});

module.exports = MenuWidget;
