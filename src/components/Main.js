var Actions = require("../actions/Actions.js");
var LocationStore = require("../stores/LocationStore.js");
var NeighborhoodStore = require("../stores/NeighborhoodStore.js");
var LoadingLocation = require("./LoadingLocation.js");
var LocationUnavailable = require("./LocationUnavailable.js");
var LocationFailed = require("./LocationFailed.js");
var LoadingNeighborhood = require("./LoadingNeighborhood.js");
var Neighborhood = require("./Neighborhood.js");

module.exports = React.createClass({
  getInitialState: function() {
    return {
      loadingLocation: LocationStore.state.loading(),
      hasLocation: LocationStore.state.hasLocation(),
      locationUnavailable: LocationStore.state.locationUnavailable(),
      locationFailed: LocationStore.state.locationFailed(),
      loadingNeighborhood: NeighborhoodStore.state.loading(),
      hasNeighborhood: NeighborhoodStore.state.hasNeighborhood(),
      neighborhood: NeighborhoodStore.state.neighborhood()
    };
  },
  componentDidMount: function() {
    LocationStore.addChangeListener(this.onChange);
    NeighborhoodStore.addChangeListener(this.onChange);
    Actions.loadLocation();
  },
  componentWillUnmount: function() {
    LocationStore.removeChangeListener(this.onChange);
    NeighborhoodStore.removeChangeListener(this.onChange);
  },
  onChange: function() {
    if (this.isMounted()) {
      this.setState(this.getInitialState());
    }
  },
  render: function() {
    var content = null;
    if (this.state.loadingLocation) {
      content = <LoadingLocation />;
    } else if (this.state.locationUnavailable) {
      content = <LocationUnavailable />;
    } else if (this.state.locationFailed) {
      content = <LocationFailed />;
    } else if (this.state.loadingNeighborhood) {
      content = <LoadingNeighborhood />;
    } else if (this.state.hasNeighborhood) {
      content = <Neighborhood neighborhood={this.state.neighborhood} />;
    }
    return content;
  }
});
