import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Feeling() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [feelingInput, setFeelingInput] = useState(0);

	const handleNextPage = () => {
		if (feelingInput < 1 || feelingInput > 6 || !feelingInput) {
			alert("Please provide an answer between 1 and 6");
			return;
		}
		dispatch({
			type: "ADD_ANSWER",
			payload: {
				feeling: feelingInput,
			},
		});
		history.push("/feedback/question2");
	};

	return (
		<section className="question__section">
			<h1 className="question-header">How are you feeling today?</h1>
			<label className="question-label">Feeling?</label>
			<input
				className="question-input"
				value={feelingInput}
				onChange={(e) => setFeelingInput(Number(e.target.value))}
				type="number"
			/>
			<button className="next-button" onClick={handleNextPage}>
				NEXT
			</button>
		</section>
	);
}

export default Feeling;
