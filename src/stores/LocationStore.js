var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");
var Dispatcher = require("../dispatcher/Dispatcher.js");

var loading = false;
var hasLocation = false;
var locationUnavailable = false;
var locationFailed = false;
var latitude = null;
var longitude = null;

module.exports = new Store({
  state: {
    loading: function() {
      return loading;
    },
    hasLocation: function() {
      return hasLocation;
    },
    locationUnavailable: function() {
      return locationUnavailable;
    },
    locationFailed: function() {
      return locationFailed;
    },
    latitude: function() {
      return latitude;
    },
    longitude: function() {
      return longitude;
    }
  },
  handlers: {
    "LOAD_LOCATION": function() {
      if (navigator.geolocation) {
        locationUnavailable = false;
        locationFailed = false;
        hasLocation = false;
        loading = true;
        navigator.geolocation.getCurrentPosition(function(pos) {
          console.log("got location", pos.coords);
          Actions.gotLocation(pos.coords.latitude, pos.coords.longitude);
        }, function(msg) {
          Actions.locationFailed(msg);
        });
      } else {
        locationUnavailable = true;
      }
    },
    "LOCATION_FAILED": function(action) {
      locationFailed = true;
      loading = false;
    },
    "GOT_LOCATION": function(action) {
      latitude = action.latitude;
      longitude = action.longitude;
      loading = false;
      hasLocation = true;
    }
  }
});
