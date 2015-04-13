(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../dispatcher/Dispatcher.js":11}],2:[function(require,module,exports){
var Main = require("./components/Main.js");

React.render(
  React.createElement(Main, null),
  document.body
);

},{"./components/Main.js":8}],3:[function(require,module,exports){
/*
 * This renders an SVG icon from the open-iconic iconset.
 *
 * Specify which icon with the "icon" parameter.
 *
 * You can set an outer class on the <svg> element with "outerClassName", and
 * an inner class on the <use> element with "innerClassName".
 *
 * You'll set the size with the outer class, and the color with the inner class (using the
 * "fill" CSS style).
 *
 *  <Icon icon="map-marker" />
 *  <Icon icon="map-marker" outerClassName="big" />
 *  <Icon icon="map-marker" outerClassName="big" innerClassName="selected" />
 *
 * Note that this has to use "dangerouslySetInnerHTML" because the <use> element isn't
 * on React's whitelist of HTML elements.
 */
var Icon = React.createClass({displayName: 'Icon',
  /*
   * This is necessary because we're using dangerouslySetInnerHTML, which won't see className
   * changes. So we need to manually update the class, when it changes.
   */
  componentDidUpdate: function(oldProps) {
    var oldInner = inner(oldProps.innerClassName);
    var newInner = inner(this.props.innerClassName);
    if (oldInner != newInner) {
      var svg = this.getDOMNode();
      var use = svg.firstChild;
      use.setAttribute("class", newInner);
    }
  },
  render: function() {
    var icon = this.props.icon;
    var outerClassName = "icon " + (this.props.outerClassName || "");
    var innerClassName = inner(this.props.innerClassName);
    return (
      React.createElement("svg", {viewBox: "0 0 8 8", className: outerClassName, dangerouslySetInnerHTML: {__html: '<use xlink:href="/open-iconic.svg#' + icon + '" class="' + innerClassName + '"></use>'}})
    );
  }
});

function inner(prop) {
  return "inner " + (prop || "");
}

module.exports = Icon;

},{}],4:[function(require,module,exports){
module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "full-height flex column nowrap justify-center align-center"}, "Loading Location")
    );
  }
});

},{}],5:[function(require,module,exports){
module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "full-height flex column nowrap justify-center align-center"}, 
        "Loading Neighborhood"
      )
    );
  }
});

},{}],6:[function(require,module,exports){
module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "full-height flex column nowrap justify-center align-center"}, "Location Failed")
    );
  }
});

},{}],7:[function(require,module,exports){
module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "full-height flex column nowrap justify-center align-center"}, "Location is Unavailable")
    );
  }
});

},{}],8:[function(require,module,exports){
var Actions = require("../actions/Actions.js");
var LocationStore = require("../stores/LocationStore.js");
var NeighborhoodStore = require("../stores/NeighborhoodStore.js");
var LoadingLocation = require("./LoadingLocation.js");
var LocationUnavailable = require("./LocationUnavailable.js");
var LocationFailed = require("./LocationFailed.js");
var LoadingNeighborhood = require("./LoadingNeighborhood.js");
var Neighborhood = require("./Neighborhood.js");

module.exports = React.createClass({displayName: 'exports',
  getInitialState: function() {
    return {
      loadingLocation: LocationStore.state.loading(),
      hasLocation: LocationStore.state.hasLocation(),
      locationUnavailable: LocationStore.state.locationUnavailable(),
      locationFailed: LocationStore.state.locationFailed(),
      latitude: LocationStore.state.latitude(),
      longitude: LocationStore.state.longitude(),
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
      content = React.createElement(LoadingLocation, null);
    } else if (this.state.locationUnavailable) {
      content = React.createElement(LocationUnavailable, null);
    } else if (this.state.locationFailed) {
      content = React.createElement(LocationFailed, null);
    } else if (this.state.loadingNeighborhood) {
      content = React.createElement(LoadingNeighborhood, null);
    } else if (this.state.hasNeighborhood) {
      content = (
        React.createElement(Neighborhood, {
          neighborhood: this.state.neighborhood, 
          latitude: this.state.latitude, 
          longitude: this.state.longitude}
          )
      );
    }
    return content;
  }
});

},{"../actions/Actions.js":1,"../stores/LocationStore.js":12,"../stores/NeighborhoodStore.js":13,"./LoadingLocation.js":4,"./LoadingNeighborhood.js":5,"./LocationFailed.js":6,"./LocationUnavailable.js":7,"./Neighborhood.js":9}],9:[function(require,module,exports){
var Actions = require("../actions/Actions.js");
var NoNeighborhoodFound = require("./NoNeighborhoodFound.js");
var Icon = require("./Icon.js");

module.exports = React.createClass({displayName: 'exports',
  refresh: function() {
    Actions.loadLocation();
  },
  componentDidMount: function() {
    this.makeMap();
  },
  componentDidUpdate: function(oldProps) {
    if ((oldProps.latitude != this.props.latitude) || (oldProps.longitude != this.props.longitude)) {
      this.makeMap();
    }
  },
  makeMap: function() {
    var MAP_TYPE_ID = "custom_style";
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.props.latitude, lng: this.props.longitude },
      zoom: 14,
      disableDefaultUI: true,
      mapTypeId: MAP_TYPE_ID
    });
    var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          { saturation: -100 },
          { visibility: "simplified" },
          { gamma: 0.9 }
        ]
      },
      {
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ], {});
    map.mapTypes.set(MAP_TYPE_ID, customMapType);
  },
  render: function() {
    var neighborhood = this.props.neighborhood;

    var content = null;
    if (!neighborhood) {
      content = React.createElement(NoNeighborhoodFound, null);
    } else {
      content = (
        React.createElement("div", null, 
          React.createElement("div", {id: "map", className: "neighborhood-map"}), 
          React.createElement("div", {className: "map-blocker"}), 
          React.createElement("div", {className: "full-height flex column nowrap justify-center align-center margin-medium text-center"}, 
            React.createElement("div", {className: "flex grow align-end front"}, "you are in"), 
            React.createElement("div", {className: "neighborhood-name front"}, neighborhood.Name), 
            React.createElement("div", {className: "flex grow3 align-center front"}, 
              React.createElement("button", {onClick: this.refresh}, React.createElement(Icon, {icon: "reload"}))
            )
          )
        )
      );
    }
    return content;
  }
});

},{"../actions/Actions.js":1,"./Icon.js":3,"./NoNeighborhoodFound.js":10}],10:[function(require,module,exports){
module.exports = React.createClass({displayName: 'exports',
  render: function() {
    return (
      React.createElement("div", {className: "full-height flex column nowrap justify-center align-center margin-medium text-center"}, 
        "I didn't find any neighborhoods. Are you sure you're in Chicago?"
      )
    );
  }
});

},{}],11:[function(require,module,exports){
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */

"use strict";

var _lastID = 1;
var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */
function Dispatcher() {
  this._callbacks = {};
  this._isPending = {};
  this._isHandled = {};
  this._isDispatching = false;
  this._pendingPayload = null;
}

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   *
   * @param {function} callback
   * @return {string}
   */
Dispatcher.prototype.register = function(callback) {
  var id = _prefix + _lastID++;
  this._callbacks[id] = callback;
  return id;
}

  /**
   * Removes a callback based on its token.
   *
   * @param {string} id
   */
Dispatcher.prototype.unregister = function(id) {
  delete this._callbacks[id];
}

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   *
   * @param {array<string>} ids
   */
Dispatcher.prototype.waitFor = function(ids) {
  for (var ii = 0; ii < ids.length; ii++) {
    var id = ids[ii];
    if (this._isPending[id]) {
      continue;
    }
    this._invokeCallback(id);
  }
}

  /**
   * Dispatches a payload to all registered callbacks.
   *
   * @param {object} payload
   */
Dispatcher.prototype.dispatch = function(payload) {
  console.log(payload);
  this._startDispatching(payload);
  try {
    for (var id in this._callbacks) {
      if (this._isPending[id]) {
        continue;
      }
      this._invokeCallback(id);
    }
  } finally {
    this._stopDispatching();
  }
}

  /**
   * Is this Dispatcher currently dispatching.
   *
   * @return {boolean}
   */
Dispatcher.prototype.isDispatching = function() {
  return this._isDispatching;
}

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @param {string} id
   * @internal
   */
Dispatcher.prototype._invokeCallback = function(id) {
  this._isPending[id] = true;
  this._callbacks[id](this._pendingPayload);
  this._isHandled[id] = true;
}

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @param {object} payload
   * @internal
   */
Dispatcher.prototype._startDispatching = function(payload) {
  for (var id in this._callbacks) {
    this._isPending[id] = false;
    this._isHandled[id] = false;
  }
  this._pendingPayload = payload;
  this._isDispatching = true;
}

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
Dispatcher.prototype._stopDispatching = function() {
  this._pendingPayload = null;
  this._isDispatching = false;
}

var singleDispatcher = new Dispatcher();

module.exports = singleDispatcher;

},{}],12:[function(require,module,exports){
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

},{"../actions/Actions.js":1,"../dispatcher/Dispatcher.js":11,"./Store.js":14}],13:[function(require,module,exports){
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

},{"../actions/Actions.js":1,"../dispatcher/Dispatcher.js":11,"./Store.js":14}],14:[function(require,module,exports){
var Dispatcher = require("../dispatcher/Dispatcher.js");

/*
 * Use like this:
 *
 *   var value = 1;
 *   var SomeStore = new Store({
 *     state: {
 *       stuff: function() {
 *         return value;
 *       }
 *     },
 *     handlers: {
 *       DO_STUFF: function(action) {
 *         value += action.amount;
 *       }
 *     }
 *   });
 */
function Store(options) {
  this._adding = false;
  this._removing = false;
  this._emitting = false;
  this._listeners = [];
  this._names = [];

  if (options.handlers) {
    for (var key in options.handlers) {
      (function(type, handler) {
        var id = Dispatcher.register(function(action) {
          if (action.type == type) {
            handler.call(null, action);
            this.emitChange();
          }
        }.bind(this));
      }.bind(this))(key, options.handlers[key]);
    }
  }

  this.state = options.state;
}

Store.prototype.isBusy = function() {
  return this._emitting || this._adding || this._removing;
}

Store.prototype.emitChange = function() {
  if (this.isBusy()) {
    setTimeout(function() {
      this.emitChange();
    }.bind(this), 50);
    return;
  }
  this._emitting = true;
  this._listeners.forEach(function(listener, index) {
    listener.call(null);
  }.bind(this));
  this._emitting = false;
}

Store.prototype.addChangeListener = function(listener, name) {
  if (this.isBusy()) {
    setTimeout(function() {
      this.addChangeListener(listener, name);
    }.bind(this), 50);
    return;
  }
  this._adding = true;
  this._listeners.push(listener);
  this._names.push(name);
  this._adding = false;
}

Store.prototype.removeChangeListener = function(listener) {
  if (this.isBusy()) {
    setTimeout(function() {
      this.removeChangeListener(listener);
    }.bind(this), 50);
    return;
  }
  this._removing = true;
  var index = this._listeners.indexOf(listener);
  if (index != -1) {
    this._listeners.splice(index, 1);
    this._names.splice(index, 1);
  }
  this._removing = false;
}

module.exports = Store;

},{"../dispatcher/Dispatcher.js":11}]},{},[2]);
