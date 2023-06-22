import axios from "axios";
import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm({ _id, title: exTitle, description: exDescription, price: exPrice, images }) {
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

	async function uploadImage(e) {
		const files = e.target?.files;
		if (files?.length > 0) {
			const data = new FormData();

			for (const file of files) {
				data.append("file", file);
			}

			const res = fetch("/api/upload", {
				method: "Post",
				body: data,
			});
		}
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
			<label>photos</label>
			<div className='mb-2'>
				<label className='w-24 h-24 flex items-center justify-center text-sm gap-1 text-gray-700 rounded-lg bg-gray-300 hover:bg-blue-700 hover:text-white cursor-pointer'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
						/>
					</svg>
					<div>Upload</div>
					<input
						type='file'
						className='hidden'
						onChange={uploadImage}
					/>
				</label>
				{!images?.length && <div>No photos in this product</div>}
			</div>
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
