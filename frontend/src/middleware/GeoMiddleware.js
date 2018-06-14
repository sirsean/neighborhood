var Actions = require("../actions/Actions.js");

const DEV = false;

function loadLocation(state, action) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            console.log("got location", pos.coords);
            Actions.gotLocation(pos.coords.latitude, pos.coords.longitude);
        }, function(msg) {
            if (DEV) {
                Actions.gotLocation(41.866, -87.66);
            } else {
                Actions.locationFailed(msg);
            }
        });
      } else {
        if (DEV) {
            Actions.gotLocation(41.866, -87.66);
        } else {
            Actions.setLocationUnavailable(true);
        }
      }
}

const funcs = {
    INITIAL_LOAD: loadLocation,
    LOAD_LOCATION: loadLocation,
}

export default store => next => action => {
    let f = funcs[action.type];
    if (f) {
        let state = store.getState();
        f(state, action);
    }
}