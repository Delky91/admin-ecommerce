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

	const formReducerRefactor = (state, action) => {
		const { type, payload } = action;
		const fn = {
			CHANGE_INPUT: () => ({ ...state, [payload.name]: payload.value }),
			CHANGE_IMAGES: () => ({ ...state, images: payload }),
			LOAD_CATEGORIES: () => ({ ...state, categories: payload }),
			SET_PRODUCT_PROPERTIES: () => ({
				...state,
				productProperties: {
					...state.productProperties,
					[payload.propName]: payload.value,
				},
			}),
			DELETE_IMAGE: () => ({
				...state,
				images: state.images.filter((image) => image !== payload),
			}),
			["default"]: () => ({ ...state }),
		};

		const Funct = fn[type] || fn["default"];

		return Funct();
	};

	//USEREDUCER
	const [state, dispatch] = useReducer(formReducerRefactor, INITIAL_STATE);
	const {
		title,
		description,
		productCategory,
		price,
		images,
		categories,
		productProperties,
	} = state;
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
		const productCat = productCategory === "" ? null : productCategory;

		const data = {
			title: title,
			description: description,
			price: price,
			images: images,
			productCategory: productCat,
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
			const newImages = [...images, ...res.data.links];
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

	const handleDeleteImage = (link) => {
		const updatedImages = images.filter((image) => image !== link);
		dispatch({ type: "CHANGE_IMAGES", payload: updatedImages });
	};

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
				value={title}
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
				value={productCategory}
				onChange={(ev) => {
					dispatch({
						type: "CHANGE_INPUT",
						payload: { name: "productCategory", value: ev.target.value },
					});
				}}>
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
					<div key={p._id}>
						<label htmlFor={productProperties[p.name]}>
							{p.name[0].toUpperCase() + p.name.substring(1)}
						</label>
						<div>
							<select
								id={productProperties[p.name]}
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

			<label
				htmlFor='productImage'
				className='mb-1'>
				Photos
			</label>
			<div className='flex flex-wrap gap-1 mb-3'>
				{/* sort images with the mouse need a list and a funtion to work */}
				<ReactSortable
					className='flex flex-wrap gap-1'
					list={images}
					setList={(newImages) => {
						dispatch({ type: "CHANGE_IMAGES", payload: newImages });
					}}>
					{
						/* check for images and map the array*/
						!!images?.length &&
							images.map((link) => (
								<div
									key={link}
									className='relative inline-block'>
									<div className='h-24 bg-white border border-gray-200 rounded-lg shadow'>
										<img
											src={link}
											alt='producto'
											className='rounded-lg'
										/>
										<button
											onClick={() => handleDeleteImage(link)}
											className='absolute bg-gray-800 border rounded-full top-1 right-1 hover:bg-mid text-bgFrom border-txColor/50 hover:border-txColor'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='none'
												strokeWidth='1.5'
												stroke='currentColor'
												className='sm-icon'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M6 18L18 6M6 6l12 12'></path>
											</svg>
										</button>
									</div>
								</div>
							))
					}
				</ReactSortable>
				{
					/* loading animation when uploading photos */
					isUploading && (
						<div className='flex items-center h-24'>
							<Spinner />
						</div>
					)
				}
				<label
					htmlFor='productImage'
					className='dark:bg-white/10 bg-black/10 p-2 rounded-md hover:bg-black/20 dark:hover:bg-white/20'>
					<div className='mt-3 pb-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='icon mx-auto'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
							/>
						</svg>
						<p>Add Imagen</p>
						<input
							type='file'
							id='productImage'
							className='hidden'
							onChange={uploadImage}
						/>
					</div>
				</label>
			</div>
			<label htmlFor='description'>Product Description</label>
			<textarea
				name='description'
				id='description'
				placeholder='Product description'
				autoComplete='off'
				rows={10}
				value={description}
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
				value={price}
				onChange={handleTextChange}
			/>
			<div>
				<button
					className='justify-center mt-3 mb-2 btn-edit rounded-md py-1 px-1'
					type='submit'>
					Save
				</button>
			</div>
		</form>
	);
}
