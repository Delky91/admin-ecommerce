import axios from "axios";
import Layout from "./components/Layout";
import { useState, useEffect } from "react";
import deleteConfirmation from "./products/delete/DeleteConfirmation.js";

export default function Categories() {
	//category states
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [editedCategory, setEditedCategory] = useState(null);
	const [categories, setCategories] = useState([]);
	//properties states
	const [properties, setProperties] = useState([]);
	//other var
	const page = "categories";

	useEffect(() => {
		fetchCategories();
	}, []);

	//obtain all the category list
	function fetchCategories() {
		axios.get(`/api/${page}`).then((response) => {
			setCategories(response.data);
		});
	}

	//create a category and send the inf to the api
	async function saveCategory(ev) {
		ev.preventDefault();

		const data = {
			name,
			parentCategory,
			properties: properties.map((p) => ({
				name: p.name,
				value: p.value.split(","),
			})),
		};

		//know if we are in edit mode
		if (editedCategory) {
			//need something to know what category im editing
			data._id = editedCategory._id;
			await axios.put("/api/categories", data);
			setEditedCategory(null);
		} else {
			//if the category does't exist create one
			await axios.post("/api/categories", data);
		}
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	}

	//create a funnction that can handle the edit button
	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
		setProperties(
			category.properties.map(({ name, value }) => ({
				name,
				value: value.join(","),
			}))
		);
	}

	function addProperty() {
		setProperties((prev) => {
			return [...prev, { name: "", value: "" }];
		});
	}

	function handlePropertyNameChange(index, property, newName) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].name = newName;
			return properties;
		});
	}

	function handlePropertyValueChange(index, property, newValues) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].value = newValues;
			return properties;
		});
	}

	function removeProperty(indexToRemove) {
		setProperties((prev) => {
			return [...prev].filter((property, propertyindex) => {
				return propertyindex !== indexToRemove;
			});
		});
	}
	return (
		<Layout>
			<div className='flex flex-col gap-2'>
				<h2 className='text-center'>Categories</h2>
				<div className='tableContainer bg-primary/40'>
					<p className='text-txColor my-2 pl-3 text-lg'>
						{editedCategory
							? `Edit category ${editedCategory.name.toUpperCase()}`
							: "Create new category"}
					</p>
					<form
						id='categoryId'
						onSubmit={saveCategory}
						className=''>
						<div className='flex gap-2 px-2 mb-4'>
							<input
								type='text'
								placeholder={"Category name"}
								onChange={(ev) => setName(ev.target.value)}
								value={name}
								className=' placeholder-white/50 placeholder:italic'
							/>
							<select
								value={parentCategory}
								onChange={(ev) => setParentCategory(ev.target.value)}
								className='placeholder-white/50 placeholder:italic'>
								<option
									value=''
									className=''>
									No parent category
								</option>
								{
									//map to show the category in a option list
									categories.length > 0 &&
										categories.map((category) => (
											<option
												key={category._id}
												value={category._id}>
												{category.name}
											</option>
										))
								}
							</select>
						</div>
						<div className='mb-2 px-3'>
							<p className='block text-txColor mb-2'>Properties</p>
							<button
								className='btn btn-edit text-sm mb-4'
								type='button'
								onClick={addProperty}>
								Add new property
							</button>
							{properties.length > 0 &&
								properties.map((property, index) => (
									<div
										className='flex gap-1 mb-2'
										key={index}>
										<input
											type='text'
											value={property.name}
											className='mb-2'
											onChange={(ev) =>
												handlePropertyNameChange(index, property, ev.target.value)
											}
											placeholder='Property name (example: color)'
										/>
										<input
											type='text'
											value={property.value}
											className='mb-2'
											placeholder='values, comma separated'
											onChange={(ev) =>
												handlePropertyValueChange(index, property, ev.target.value)
											}
										/>
										<button
											className='btn-remove btn mb-2'
											type='button'
											onClick={() => removeProperty(index)}>
											Remove
										</button>
									</div>
								))}
						</div>
						<div className='inline-block mb-2 mt-4'>
							{editedCategory && (
								<button
									type='button'
									className='btn border ml-3 rounded-md border-white/20 hover:bg-bgTo
									hover:shadow hover:shadow-black/30'
									onClick={() => {
										//clear the form
										setEditedCategory(null);
										setName("");
										setParentCategory("");
										setProperties([]);
									}}>
									Cancel
								</button>
							)}
							<button
								className='btn border ml-4 bg-bgTo/40 border-white/20 rounded-md hover:shadow-md hover:shadow-black/30 hover:bg-bgTo/80'
								type='submit'>
								Save
							</button>
						</div>
					</form>
				</div>
				{!editedCategory && (
					<div className='tableContainer'>
						<table
							className='basic'
							id='categoryTable'>
							<thead>
								<tr>
									<td>Category name</td>
									<td>Parent category</td>
									<td>Options</td>
								</tr>
							</thead>
							<tbody>
								{categories.length > 0 &&
									categories.map((category, index) => (
										<tr
											key={category._id}
											className={
												/*apply border to all except the last one cause already have the table one */
												index !== categories.length - 1 ? "border-b border-white/10" : ""
											}>
											<td>{category.name}</td>
											<td className='border-x border-white/10'>
												{category?.parent?.name}
											</td>
											<td>
												<button
													className='btn btn-edit my-1 lg:my-0'
													onClick={() => editCategory(category)}>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth={1.5}
														stroke='currentColor'
														className='sm-icon'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
														/>
													</svg>
													Edit
												</button>
												<button
													className='px-4 btn btn-delete'
													onClick={() => {
														deleteConfirmation(category, page, fetchCategories);
													}}>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth={1.5}
														stroke='currentColor'
														className='sm-icon'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
														/>
													</svg>
													Delete
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</Layout>
	);
}
