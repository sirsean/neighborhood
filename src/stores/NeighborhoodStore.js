var Store = require("./Store.js");
var Actions = require("../actions/Actions.js");
var Dispatcher = require("../dispatcher/Dispatcher.js");
import * as request from "superagent";

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
      request.get("/api/where")
          .query({
              latitude: action.latitude,
              longitude: action.longitude
          })
          .end((err, response) => {
              if (response.ok) {
                  Actions.gotNeighborhood(response.body);
              } else {
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
