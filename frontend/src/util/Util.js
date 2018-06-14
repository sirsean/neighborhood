export function reduceState(state, obj) {
    return Object.assign({}, state, obj);
}

export function buildReducer(funcs) {
    return function(state={}, action) {
        let f = funcs[action.type];
        if (f) {
            return f(state, action);
        } else {
            return state;
        }
    }
}