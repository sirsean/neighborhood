import {reduceState as r, buildReducer} from "../util/Util";

function initialLoad(state={}, action) {
    return r(state, {
        loading: false,
        hasLocation: false,
        locationUnavailable: false,
        locationFailed: false,
        latitude: null,
        longitude: null,
    });
}

function loadLocation(state={}, action) {
    return r(state, {
        locationUnavailable: false,
        locationFailed: false,
        hasLocation: false,
        loading: true,
    });
}

function locationFailed(state={}, action) {
    return r(state, {
        locationFailed: true,
        loading: false,
    });
}

function setLocationUnavailable(state={}, action) {
    return r(state, {
        locationUnavailable: true,
        loading: false,
    });
}

function gotLocation(state={}, action) {
    return r(state, {
        locationUnavailable: false,
        locationFailed: false,
        loading: false,
        hasLocation: true,
        latitude: action.latitude,
        longitude: action.longitude,
    });
}

export const locationReducer = buildReducer({
    INITIAL_LOAD: initialLoad,
    LOAD_LOCATION: loadLocation,
    LOCATION_FAILED: locationFailed,
    SET_LOCATION_UNAVAILABLE: setLocationUnavailable,
    GOT_LOCATION: gotLocation,
});