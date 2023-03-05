import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Review() {
	const dispatch = useDispatch();
	const history = useHistory();

	const answers = useSelector((store) => store.answers); // redux reducer

	const [questionToEdit, setQuestionToEdit] = useState(""); // keeps track of what question is being edited ("" if not editing)
	const [newAnswer, setNewAnswer] = useState(""); // local state to track edit input

	/**
	 * Helper function for renderEditField
	 * Returns input type the question that is passed in
	 * @param {string} question
	 * @returns string
	 */
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

	// Helper function for conditionally rendering an edit field
	const renderEditField = (question) => {
		return (
			<input
				type={findInputType(question)}
				value={newAnswer}
				onChange={(e) => setNewAnswer(e.target.value)}
			/>
		);
	};

	/**
	 * Dispatches updated value to redux reducer, clears inputs
	 */
	const handleFinishEdit = () => {
		// validating edited input
		switch (questionToEdit) {
			case "feeling":
			case "understanding":
			case "support":
				if (newAnswer < 1 || newAnswer > 6 || !newAnswer) {
					alert("Please provide an answer between 1 and 6");
					return; // break if not valid
				}
		}

		dispatch({
			type: "UPDATE_ANSWER",
			payload: { question: questionToEdit, answer: newAnswer },
		});

		// clear inputs
		setQuestionToEdit("");
		setNewAnswer("");
	};

	/**
	 * Posts user feedback to server side
	 * On success, resets answer reducer, goes to next page
	 */
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
