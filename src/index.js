import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

const answers = (
	state = {
		feeling: 4,
		understanding: 6,
		support: 3,
		comments: "This is a comment",
	},
	action
) => {
	switch (action.type) {
		case "ADD_ANSWER":
			return { ...state, ...action.payload };
		case "UPDATE_ANSWER":
			const newState = { ...state };
			newState[action.payload.question] = action.payload.answer;
			return newState;
		case "CLEAR_ANSWERS":
			return {};
		default:
			return state;
	}
};

const storeInstance = createStore(
	combineReducers({ answers }),
	applyMiddleware(logger)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={storeInstance}>
			<App />
		</Provider>
	</React.StrictMode>
);
