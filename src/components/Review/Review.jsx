import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Review() {
	const dispatch = useDispatch();
	const history = useHistory();

	const answers = useSelector((store) => store.answers);

	const [questionToEdit, setQuestionToEdit] = useState("");
	const [newAnswer, setNewAnswer] = useState("");

	const findInputType = (question) => {
		const q = question;
		if (q === "feeling" || q === "understanding" || q === "support") {
			return "number";
		} else if (q === "comments") {
			return "text";
		} else {
			console.log("Something wrong finding input type");
		}
	};

	const renderEditField = (question) => {
		return (
			<input
				type={findInputType(question)}
				value={newAnswer}
				onChange={(e) => setNewAnswer(e.target.value)}
			/>
		);
	};

	const handleFinishEdit = () => {
		dispatch({
			type: "UPDATE_ANSWER",
			payload: { question: questionToEdit, answer: newAnswer },
		});
		setQuestionToEdit("");
		setNewAnswer("");
	};

	const handleSubmitFeedback = () => {
		axios
			.post("/feedback", answers)
			.then(() => {
				dispatch({ type: "CLEAR_ANSWERS" });
				history.push("/feedback/success");
			})
			.catch((error) => {
				console.log("Error POST /feedback", error);
			});
	};

	return (
		<section>
			<table>
				<thead>
					<tr>
						<th>Question</th>
						<th>Answer</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(answers).map((question, i) => {
						const answer = answers[question];
						const isEdit = question === questionToEdit;

						return (
							<tr key={i}>
								<td>{question}</td>
								<td>
									{isEdit
										? renderEditField(question)
										: answer}
								</td>
								<td>
									{isEdit ? (
										<button onClick={handleFinishEdit}>
											Done
										</button>
									) : (
										<button
											onClick={() =>
												setQuestionToEdit(question)
											}
										>
											Edit
										</button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button onClick={handleSubmitFeedback}>Submit</button>
		</section>
	);
}

export default Review;
