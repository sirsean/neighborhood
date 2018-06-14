import * as request from "superagent";
var Actions = require("../actions/Actions.js");
import {baseUrl} from "./Api";

export function where(latitude, longitude) {
    request.get(baseUrl + "/where")
        .query({
            latitude,
            longitude,
        })
        .end((err, response) => {
            if (response.ok) {
                Actions.gotNeighborhood(response.body);
            } else {
                Actions.gotNeighborhood(null);
            }
        });
}