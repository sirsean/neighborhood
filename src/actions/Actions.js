var Dispatcher = require("../dispatcher/Dispatcher.js");

module.exports = {
  loadLocation: function() {
    Dispatcher.dispatch({
      type: "LOAD_LOCATION"
    });
  },
  loadingLocation: function() {
    Dispatcher.dispatch({
      type: "LOADING_LOCATION"
    });
  },
  gotLocation: function(latitude, longitude) {
    Dispatcher.dispatch({
      type: "GOT_LOCATION",
      latitude: latitude,
      longitude: longitude
    });
  },
  locationFailed: function(msg) {
    Dispatcher.dispatch({
      type: "LOCATION_FAILED",
      msg: msg
    });
  },
  gotNeighborhood: function(neighborhood) {
    Dispatcher.dispatch({
      type: "GOT_NEIGHBORHOOD",
      neighborhood: neighborhood
    });
  }
};
