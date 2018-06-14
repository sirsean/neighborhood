import {reduceState as r, buildReducer} from "../util/Util";

function initialLoad(state={}, action) {
    return r(state, {
        loading: false,
        hasNeighborhood: false,
        neighborhood: null,
    });
}

function gotLocation(state={}, action) {
    return r(state, {
        loading: true,
        hasNeighborhood: false,
    });
}

function gotNeighborhood(state={}, action) {
    return r(state, {
        loading: false,
        hasNeighborhood: true,
        neighborhood: action.neighborhood,
    });
}

export const neighborhoodReducer = buildReducer({
    INITIAL_LOAD: initialLoad,
    GOT_LOCATION: gotLocation,
    GOT_NEIGHBORHOOD: gotNeighborhood,
})