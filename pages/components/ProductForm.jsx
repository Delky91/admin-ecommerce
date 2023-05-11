import axios from "axios";
import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm({ _id, title: exTitle, description: exDescription, price: exPrice }) {
	const [title, setTitle] = useState(exTitle || "");
	const [description, setDescription] = useState(exDescription || "");
	const [price, setPrice] = useState(exPrice || "");
	const [goToProduct, setGoToProduct] = useState(false);
	const router = useRouter();

	async function saveProduct(e) {
		const data = { title, description, price };
		e.preventDefault();
		if (_id) {
			//update
			await axios.put("/api/products", { ...data, _id });
		} else {
			//create
			await axios.post("/api/products", data);
		}
		setGoToProduct(true);
	}

	if (goToProduct) {
		router.push("/products");
	}

	return (
		<form onSubmit={saveProduct}>
			<label>Product Name</label>
			<input
				type='text'
				placeholder='product name'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label>Product Description</label>
			<textarea
				placeholder='description'
				autoComplete='off'
				rows={10}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label>Product Price</label>
			<input
				placeholder='price'
				type='number'
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>
			<button
				className='btn-primary'
				type='submit'>
				Save
			</button>
		</form>
	);
}
