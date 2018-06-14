import {store} from "../store/Store";

export function initialLoad() {
  store.dispatch({
    type: "INITIAL_LOAD",
  });
}

export function loadLocation() {
  store.dispatch({
    type: "LOAD_LOCATION",
  });
}

export function loadingLocation() {
  store.dispatch({
    type: "LOADING_LOCATION",
  });
}

export function gotLocation(latitude, longitude) {
  store.dispatch({
    type: "GOT_LOCATION",
    latitude,
    longitude,
  });
}

export function locationFailed(msg) {
  store.dispatch({
    type: "LOCATION_FAILED",
    msg,
  });
}

export function setLocationUnavailable(locationUnavailable) {
  store.dispatch({
    type: "LOCATION_UNAVAILABLE",
    locationUnavailable,
  });
}

export function gotNeighborhood(neighborhood) {
  store.dispatch({
    type: "GOT_NEIGHBORHOOD",
    neighborhood,
  });
}
