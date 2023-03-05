import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Support() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [supportInput, setSupportInput] = useState(0); // keep track of input

	/**
	 * Dispatches input value to redux reducer, goes to next page
	 */
	const handleNextPage = () => {
		// input validation
		if (supportInput < 1 || supportInput > 6 || !supportInput) {
			alert("Please provide an answer between 1 and 6");
			return; // break
		}
		dispatch({
			type: "ADD_ANSWER",
			payload: {
				support: supportInput,
			},
		});
		history.push("/feedback/question4");
	};

	return (
		<section className="question__section">
			<h1 className="question-header">
				How well are you being supported?
			</h1>
			<label className="question-label">Support?</label>
			<input
				className="question-input"
				value={supportInput}
				onChange={(e) => setSupportInput(Number(e.target.value))}
				type="number"
			/>
			<button className="next-button" onClick={handleNextPage}>
				NEXT
			</button>
		</section>
	);
}

export default Support;
