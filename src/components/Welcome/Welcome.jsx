import { useHistory } from "react-router-dom";

function Welcome() {
	const history = useHistory();

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
