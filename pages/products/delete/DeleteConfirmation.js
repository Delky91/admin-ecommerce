import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function deleteConfirmation(data, page, updateFunction) {
	const MySwal = withReactContent(Swal);
	const name = data.name || data.title;

	MySwal.fire({
		title: `Are you sure?`,
		text: `you want to delete the ${name.toUpperCase()}?`,
		icon: "warning",
		iconColor: "gold",
		showCancelButton: true,
		confirmButtonText: "yes, Delete!",
		cancelButtonText: "Cancel",
		focusCancel: true,
		color: "#292929",
		background: "#F2F4FF",
		confirmButtonColor: "#475BE8",
	}).then(async (result) => {
		if (result.isConfirmed) {
			// when action is confirmed
			const { _id } = data;

			await axios.delete(`/api/${page}?_id=` + _id);
			updateFunction();
		}
	});
}
