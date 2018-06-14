var NeighborhoodApi = require("../api/NeighborhoodApi.js");

function loadNeighborhood(state, action) {
    NeighborhoodApi.where(action.latitude, action.longitude);
}

const funcs = {
    GOT_LOCATION: loadNeighborhood,
}

export default store => next => action => {
    let f = funcs[action.type];
    if (f) {
        let state = store.getState();
        f(state, action);
    }
}