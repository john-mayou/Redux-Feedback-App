import { useHistory } from "react-router-dom";

function Welcome() {
	const history = useHistory();

	// go to first feedback page
	const handleStart = () => {
		history.push("/feedback/question1");
	};

	return (
		<>
			<button onClick={handleStart}>Start</button>
		</>
	);
}

export default Welcome;
