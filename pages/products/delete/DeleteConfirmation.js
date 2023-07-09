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
		color: "#ebefdc",
		background: "#62459F",
		confirmButtonColor: "#463172",
		cancelButtonColor: "#7778D1",
	}).then(async (result) => {
		if (result.isConfirmed) {
			// when action is confirmed
			const { _id } = data;

			await axios.delete(`/api/${page}?_id=` + _id);
			updateFunction();
		}
	});
}
