/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	images: existingImages,
	productCategory: assignedCategory,
	properties: assignedProperties,
}) {
	const [title, setTitle] = useState(existingTitle || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [productCategory, setProductCategory] = useState(assignedCategory || "");
	const [price, setPrice] = useState(existingPrice || "");
	const [images, setImages] = useState(existingImages || []);
	const [categories, setCategories] = useState([]);
	const [productProperties, setProductProperties] = useState(
		assignedProperties || {}
	);
	const [goToProduct, setGoToProduct] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		axios.get("/api/categories").then((result) => {
			setCategories(result.data);
		});
	}, []);

	//send the info via axios to the backend
	async function saveProduct(e) {
		const data = {
			title,
			description,
			price,
			images,
			productCategory,
			properties: productProperties,
		};
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

	//push
	if (goToProduct) {
		router.push("/products");
	}

	async function uploadImage(e) {
		const files = e.target?.files;
		if (files?.length > 0) {
			const data = new FormData();
			setIsUploading(true);
			for (const file of files) {
				data.append("file", file);
			}

			const res = await axios.post("/api/upload", data);
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links];
			});
			setIsUploading(false);
		}
	}
	//funtion to make work of the sortable table
	function updateImagesOrder(images) {
		setImages(images);
	}

	function setProductProp(propName, value) {
		setProductProperties((prev) => {
			const newProductProps = { ...prev };
			newProductProps[propName] = value;
			return newProductProps;
		});
	}

	//show and display the categories from the catery and his parents
	const propertiesToFill = [];
	if (categories.length > 0 && productCategory) {
		let categoryInfo = categories.find(({ _id }) => _id === productCategory);
		propertiesToFill.push(...categoryInfo.properties);
		//this while check for any parent of a category until they dont have one
		while (categoryInfo?.parent?._id) {
			let parentCategory = categories.find(
				({ _id }) => _id === categoryInfo?.parent?._id
			);
			propertiesToFill.push(...parentCategory.properties);
			categoryInfo = parentCategory;
		}
	}

	return (
		<form
			id='productForm'
			onSubmit={saveProduct}>
			<label
				htmlFor='productName'
				className=''>
				Product Name
			</label>
			<input
				type='text'
				id='productName'
				placeholder='product name'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor='productCategory'>Category</label>
			<select
				name='productCategory'
				id='productCategory'
				value={productCategory}
				onChange={(ev) => setProductCategory(ev.target.value)}>
				<option value=''>Uncategorized</option>
				{categories.length > 0 &&
					categories.map((category) => (
						<option
							key={category._id}
							value={category._id}>
							{category.name}
						</option>
					))}
			</select>
			{propertiesToFill.length > 0 &&
				propertiesToFill.map((p) => (
					<div
						key={p._id}
						className=''>
						<label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
						<div>
							<select
								value={productProperties[p.name]}
								onChange={(ev) => setProductProp(p.name, ev.target.value)}>
								{p.value.map((value) => (
									<option
										value={value}
										key={value + 1}>
										{value}
									</option>
								))}
							</select>
						</div>
					</div>
				))}

			<label htmlFor='productImage'>Photos</label>

			<div className='mb-2 flex flex-wrap gap-1'>
				{/* sort images with the mouse need a list and a funtion to work */}
				<ReactSortable
					className='flex flex-wrap gap-1'
					list={images}
					setList={updateImagesOrder}>
					{
						/* check for images and map the array*/
						!!images?.length &&
							images.map((link) => (
								<div
									key={link}
									className='h-24 bg-white shadow border border-gray-200 rounded-lg'>
									<img
										src={link}
										alt='producto'
										className='rounded-lg'
									/>
								</div>
							))
					}
				</ReactSortable>
				{
					/* loading animation when uploading photos */
					isUploading && (
						<div className='h-24 flex items-center'>
							<Spinner />
						</div>
					)
				}
				<label
					htmlFor='productImage'
					className='w-24 h-24 flex flex-col items-center justify-center text-sm gap-1 text-gray-700 rounded-lg bg-white shadow border border-gray-200 hover:bg-gray-300 hover:text-primary cursor-pointer'>
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
					<div>Add Imagen</div>
					<input
						type='file'
						id='productImage'
						className='hidden'
						onChange={uploadImage}
					/>
				</label>
			</div>
			<label htmlFor='productDescription'>Product Description</label>
			<textarea
				id='productDescription'
				placeholder='description'
				autoComplete='off'
				rows={10}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<label htmlFor='productPrice'>Product Price</label>
			<input
				id='productPrice'
				placeholder='price'
				type='number'
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>
			<button
				className='border px-3 py-1 bg-atention rounded-md'
				type='submit'>
				Save
			</button>
		</form>
	);
}
