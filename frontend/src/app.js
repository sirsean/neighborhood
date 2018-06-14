import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "./store/Store";

// polyfill for Safari
Number.parseInt = parseInt;

if(typeof(String.prototype.trim) === "undefined") {
	String.prototype.trim = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};
}

var Actions = require("./actions/Actions.js");

window.onpopstate = (e) => {
    Actions.urlChange(e.target.document.URL);
}

Actions.initialLoad();

import Main from "./components/Main";

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("app")
);