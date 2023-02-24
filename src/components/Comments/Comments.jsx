import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function Comments() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [commentsInput, setCommentsInput] = useState("");

	const handleNextPage = () => {
		dispatch({
			type: "ADD_ANSWER",
			payload: {
				comments: commentsInput,
			},
		});
		history.push("/feedback/review");
	};

	return (
		<section className="question__section">
			<h1 className="question-header">Any comments you want to leave?</h1>
			<label className="question-label">Comments?</label>
			<input
				className="question-input"
				value={commentsInput}
				onChange={(e) => setCommentsInput(e.target.value)}
				type="text"
			/>
			<button className="next-button" onClick={handleNextPage}>
				NEXT
			</button>
		</section>
	);
}

export default Comments;
