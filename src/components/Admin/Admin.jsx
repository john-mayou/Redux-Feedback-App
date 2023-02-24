import "./Admin.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
	const [feedbackList, setFeedbackList] = useState([]);

	useEffect(() => {
		fetchFeedback();
	}, []);

	const fetchFeedback = () => {
		axios
			.get("/feedback")
			.then((response) => {
				setFeedbackList(response.data);
			})
			.catch((error) => {
				console.log("Error GET /feedback", error);
			});
	};

	const handleFlagFeedback = (id) => {
		const currentFlagState = feedbackList.find(
			(feedback) => feedback.id === id
		).flagged;
		console.log(id, currentFlagState);

		axios
			.put(`/feedback/${id}`, { newState: !currentFlagState })
			.then(() => {
				fetchFeedback();
			})
			.catch((error) => {
				console.log("Error PUT /feedback", error);
			});
	};

	const handleDeleteFeedback = (id) => {
		axios
			.delete(`/feedback/${id}`)
			.then(() => {
				fetchFeedback();
			})
			.catch((error) => {
				console.log("Error DELETE /feedback", error);
			});
	};

	return (
		<table>
			<thead>
				<tr>
					<th>Feeling</th>
					<th>Understanding</th>
					<th>Support</th>
					<th>Comments</th>
					<th>Flag</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{feedbackList.map((feedback) => {
					const {
						id,
						feeling,
						understanding,
						support,
						comments,
						flagged,
					} = feedback;
					return (
						<tr
							key={id}
							className={flagged ? "flagged" : "not-flagged"}
						>
							<td>{feeling}</td>
							<td>{understanding}</td>
							<td>{support}</td>
							<td>{comments}</td>
							<td>
								<button onClick={() => handleFlagFeedback(id)}>
									Flag
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDeleteFeedback(id)}
								>
									Delete
								</button>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default Admin;
