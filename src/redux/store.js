import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from "redux-form";

import user from "./reducers/user";
import rooms from "./reducers/rooms";

// Использование reduxForm не желательно, так как стейт формы добавляется в основное хранилище,
// лучше использовать формик или подобные библиотеки
const rootReducer = combineReducers({
  form: formReducer,
  userData: user,
  roomsData: rooms,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
