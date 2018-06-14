import {createStore,applyMiddleware} from "redux";
import {rootReducer} from "../reducer/Reducer";
import multiMiddleware from "../middleware/MultiMiddleware";

const createStoreWithMiddleware = applyMiddleware(multiMiddleware)(createStore);
export const store = createStoreWithMiddleware(rootReducer);