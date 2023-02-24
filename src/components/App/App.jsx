import React from "react";
import axios from "axios";
import "./App.css";

import { HashRouter as Router, Route, Link } from "react-router-dom";

import Welcome from "../Welcome/Welcome";
import Feeling from "../Feeling/Feeling";
import Understanding from "../Understanding/Understanding";
import Support from "../Support/Support";
import Comments from "../Comments/Comments";
import Review from "../Review/Review";
import Success from "../Success/Success";
import Admin from "../Admin/Admin";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Feedback!</h1>
				<h4>Don't forget it!</h4>
			</header>
			<Router>
				<Route exact path="/">
					<Welcome />
				</Route>
				<Route exact path="/feedback/question1">
					<Feeling />
				</Route>
				<Route exact path="/feedback/question2">
					<Understanding />
				</Route>
				<Route exact path="/feedback/question3">
					<Support />
				</Route>
				<Route exact path="/feedback/question4">
					<Comments />
				</Route>
				<Route exact path="/feedback/review">
					<Review />
				</Route>
				<Route exact path="/feedback/success">
					<Success />
				</Route>
				<Route exact path="/admin">
					<Admin />
				</Route>
			</Router>
		</div>
	);
}

export default App;
