import "./Admin.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
	const [feedbackList, setFeedbackList] = useState([]);

	// on load
	useEffect(() => {
		fetchFeedback();
	}, []);

	/**
	 * fetches feedback from server, sets local state with response
	 */
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

	/**
	 * Sends a update request to server that toggles "flagged" boolean
	 * @param {number} id
	 */
	const handleFlagFeedback = (id) => {
		// finds current state of click event
		const currentFlagState = feedbackList.find(
			(feedback) => feedback.id === id
		).flagged;

		axios
			.put(`/feedback/${id}`, { newState: !currentFlagState }) // inverse of current
			.then(() => {
				fetchFeedback();
			})
			.catch((error) => {
				console.log("Error PUT /feedback", error);
			});
	};

	/**
	 * Swal popup that happens in between delete click event and actual deletion
	 * On success, a delete function is called
	 * @param {number} id
	 */
	const popupDeleteConfirmation = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			cancelButtonColor: "#3085d6",
			confirmButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "Feedback has been removed.", "success");
				handleDeleteFeedback(id);
			}
		});
	};

	/**
	 * Sends delete request via query params with the id of the click event, re-fetches changes
	 * @param {number} id
	 */
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
									onClick={() => popupDeleteConfirmation(id)}
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
