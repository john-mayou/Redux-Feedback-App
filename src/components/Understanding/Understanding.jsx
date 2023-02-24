import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Understanding() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [understandingInput, setUnderstandingInput] = useState(0);

	const handleNextPage = () => {
		if (
			understandingInput < 1 ||
			understandingInput > 6 ||
			!understandingInput
		) {
			alert("Please provide an answer between 1 and 6");
			return;
		}
		dispatch({
			type: "ADD_ANSWER",
			payload: {
				understanding: understandingInput,
			},
		});
		history.push("/feedback/question3");
	};

	return (
		<section className="question__section">
			<h1 className="question-header">
				How well are you understanding the content?
			</h1>
			<label className="question-label">Understanding?</label>
			<input
				className="question-input"
				value={understandingInput}
				onChange={(e) => setUnderstandingInput(Number(e.target.value))}
				type="number"
			/>
			<button className="next-button" onClick={handleNextPage}>
				NEXT
			</button>
		</section>
	);
}

export default Understanding;
