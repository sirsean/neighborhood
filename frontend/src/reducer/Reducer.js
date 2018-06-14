import {combineReducers} from "redux";
import {routeReducer} from "./RouteReducer";
import {neighborhoodReducer} from "./NeighborhoodReducer";
import {locationReducer} from "./LocationReducer";

export const rootReducer = combineReducers({
    route: routeReducer,
    neighborhood: neighborhoodReducer,
    location: locationReducer,
});