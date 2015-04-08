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
