import {reduceState as r, buildReducer} from "../util/Util";

function defaultRoute() {
    return {
        page: "neighborhood",
        info: {},
    }
}

const routes = [];

function parseRoute(path) {
    for (let i=0; i < routes.length; i++) {
        let [re, rf] = routes[i];
        let r = new RegExp(re);
        let m = r.exec(path);
        if (m) {
            return rf(m);
        }
    }
    return defaultRoute();
}

function parseUrl(url) {
    let a = document.createElement("a");
    a.href = url;
    
    return Object.assign({
        url: url,
        path: a.pathname,
    }, parseRoute(a.pathname));
}

function initialLoad(state={}, action) {
    return r(state, parseUrl(window.location.href));
}

function urlChange(state={}, action) {
    return r(state, parseUrl(action.url));
}

export const routeReducer = buildReducer({
    INITIAL_LOAD: initialLoad,
    URL_CHANGE: urlChange,
});