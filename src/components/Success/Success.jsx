import { useHistory } from "react-router-dom";

function Success() {
	const history = useHistory();

	const handleResetFeedbackForm = () => {
		history.push("/");
	};

	return (
		<>
			<h1>You have successfully submitted the feedback! Thank you!</h1>
			<button onClick={handleResetFeedbackForm}>
				Leave New Feedback
			</button>
		</>
	);
}

export default Success;
