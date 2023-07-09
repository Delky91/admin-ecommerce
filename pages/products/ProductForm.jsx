/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";
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
	const INITIAL_STATE = {
		title: existingTitle || "",
		description: existingDescription || "",
		productCategory: assignedCategory || "",
		price: existingPrice || "",
		images: existingImages || [],
		categories: [],
		productProperties: assignedProperties || {},
	};

	const formReducer = (state, action) => {
		switch (action.type) {
			case "CHANGE_INPUT": //title, desc, price, category, props
				return {
					...state,
					[action.payload.name]: action.payload.value,
				};
			case "CHANGE_IMAGES": //images
				return {
					...state,
					images: action.payload,
				};
			case "LOAD_CATEGORIES":
				return {
					...state,
					categories: action.payload,
				};
			case "SET_PRODUCT_PROPERTIES":
				return {
					...state,
					productProperties: {
						...state.productProperties,
						[action.payload.propName]: action.payload.value,
					},
				};
			default:
				return state;
		}
	};

	//USEREDUCER
	const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
	const [goToProduct, setGoToProduct] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const router = useRouter();

	const handleTextChange = (e) => {
		dispatch({
			type: "CHANGE_INPUT",
			payload: { name: e.target.name, value: e.target.value },
		});
	};

	useEffect(() => {
		const fetchCategories = async () => {
			const result = await axios.get("/api/categories");
			dispatch({ type: "LOAD_CATEGORIES", payload: result.data });
		};

		fetchCategories();
	}, []);

	async function saveProduct(e) {
		//check if category is value "" so we can changed to null  or the value that have
		const productCat =
			state.productCategory === "" ? null : state.productCategory;

		const data = {
			title: state.title,
			description: state.description,
			price: state.price,
			images: state.images,
			productCategory: productCat,
			properties: state.productProperties,
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
			const newImages = [...state.images, ...res.data.links];
			dispatch({ type: "CHANGE_IMAGES", payload: newImages });
			setIsUploading(false);
		}
	}

	function setProductProp(propName, value) {
		dispatch({
			type: "SET_PRODUCT_PROPERTIES",
			payload: { propName, value },
		});
	}

	//show and display the categories from the catery and his parents
	const propertiesToFill = [];
	if (state.categories.length > 0 && state.productCategory) {
		let categoryInfo = state.categories.find(
			({ _id }) => _id === state.productCategory
		);
		propertiesToFill.push(...categoryInfo.properties);
		//this while check for any parent of a category until they dont have one
		while (categoryInfo?.parent?._id) {
			let parentCategory = state.categories.find(
				({ _id }) => _id === categoryInfo?.parent?._id
			);
			propertiesToFill.push(...parentCategory.properties);
			categoryInfo = parentCategory;
		}
	}

	return (
		<form
			id='productForm'
			onSubmit={saveProduct}
			className='flex flex-col'>
			<label
				htmlFor='productTitle'
				className='mb-1'>
				Product Name
			</label>
			<input
				type='text'
				id='productTitle'
				name='title'
				placeholder='product name'
				className='mb-3'
				value={state.title}
				onChange={handleTextChange}
			/>
			<label
				htmlFor='productCategory'
				className='mb-1'>
				Category
			</label>
			<select
				id='productCategory'
				className='mb-3'
				value={state.productCategory}
				onChange={(ev) => {
					dispatch({
						type: "CHANGE_INPUT",
						payload: { name: "productCategory", value: ev.target.value },
					});
				}}>
				<option value=''>Uncategorized</option>
				{state.categories.length > 0 &&
					state.categories.map((category) => (
						<option
							key={category._id}
							value={category._id}>
							{category.name}
						</option>
					))}
			</select>
			{propertiesToFill.length > 0 &&
				propertiesToFill.map((p) => (
					<div key={p._id}>
						<label htmlFor={state.productProperties[p.name]}>
							{p.name[0].toUpperCase() + p.name.substring(1)}
						</label>
						<div>
							<select
								id={state.productProperties[p.name]}
								value={state.productProperties[p.name]}
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

			<label
				htmlFor='productImage'
				className='mb-1'>
				Photos
			</label>
			<div className='mb-3 flex flex-wrap gap-1'>
				{/* sort images with the mouse need a list and a funtion to work */}
				<ReactSortable
					className='flex flex-wrap gap-1'
					list={state.images}
					setList={(newImages) => {
						dispatch({ type: "CHANGE_IMAGES", payload: newImages });
					}}>
					{
						/* check for images and map the array*/
						!!state.images?.length &&
							state.images.map((link) => (
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
					className='btn-upload'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='icon'>
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
			<label htmlFor='description'>Product Description</label>
			<textarea
				name='description'
				id='description'
				placeholder='Product description'
				autoComplete='off'
				rows={10}
				value={state.description}
				onChange={handleTextChange}
			/>
			<label
				htmlFor='price'
				className='mb-1'>
				Product Price
			</label>
			<input
				name='price'
				id='price'
				placeholder='price'
				type='number'
				value={state.price}
				onChange={handleTextChange}
			/>
			<button
				className='btn btn-login mx-auto w-60 mt-3 mb-2 justify-center'
				type='submit'>
				Save
			</button>
		</form>
	);
}
