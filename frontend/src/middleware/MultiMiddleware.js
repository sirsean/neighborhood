import remoteMiddleware from "../middleware/RemoteMiddleware";
import geoMiddleware from "../middleware/GeoMiddleware";

let middlewares = [
    remoteMiddleware,
    geoMiddleware,
];

export default store => next => action => {
    console.log(action);
    let result = next(action);
    middlewares.forEach(function(middleware) {
        middleware(store)(next)(action);
    });
    return result;
}