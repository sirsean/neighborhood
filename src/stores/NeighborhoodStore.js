var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");
var Dispatcher = require("../dispatcher/Dispatcher.js");

var loading = false;
var hasNeighborhood = false;
var neighborhood = null;

module.exports = new Store({
  state: {
    loading: function() {
      return loading;
    },
    hasNeighborhood: function() {
      return hasNeighborhood;
    },
    neighborhood: function() {
      return neighborhood;
    }
  },
  handlers: {
    "GOT_LOCATION": function(action) {
      loading = true;
      hasNeighborhood = false;
      $.ajax({
        type: "GET",
        url: "/api/where",
        data: {
          //latitude: 0,
          //longitude: 0
          latitude: action.latitude,
          longitude: action.longitude
        },
        success: function(data) {
          Actions.gotNeighborhood(data);
        },
        error: function() {
          Actions.gotNeighborhood(null);
        }
      });
    },
    "GOT_NEIGHBORHOOD": function(action) {
      neighborhood = action.neighborhood;
      loading = false;
      hasNeighborhood = true;
    }
  }
});
