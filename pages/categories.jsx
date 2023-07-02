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
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Edit category ${editedCategory.name.toUpperCase()}`
					: "Create new category"}
			</label>
			<form
				id='categoryId'
				onSubmit={saveCategory}>
				<div className='flex gap-1'>
					<input
						type='text'
						placeholder={"Category name"}
						onChange={(ev) => setName(ev.target.value)}
						value={name}
					/>
					<select
						value={parentCategory}
						onChange={(ev) => setParentCategory(ev.target.value)}>
						<option value=''>No parent category</option>
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
				<div className='mb-2'>
					<label className='block'>Properties</label>
					<button
						className='btn-default text-sm mb-2'
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
									className='mb-0'
									onChange={(ev) =>
										handlePropertyNameChange(index, property, ev.target.value)
									}
									placeholder='Property name (example: color)'
								/>
								<input
									type='text'
									value={property.value}
									className='mb-0'
									placeholder='values, comma separated'
									onChange={(ev) =>
										handlePropertyValueChange(index, property, ev.target.value)
									}
								/>
								<button
									className='btn-default'
									type='button'
									onClick={() => removeProperty(index)}>
									Remove
								</button>
							</div>
						))}
				</div>
				<div className='inline-block'>
					{editedCategory && (
						<button
							type='button'
							className='btn-default mr-1'
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
						className='btn-primary py-1'
						type='submit'>
						Save
					</button>
				</div>
			</form>
			{!editedCategory && (
				<table className='basic mt-4'>
					<thead>
						<tr>
							<td>Category name</td>
							<td>Parent category</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>{category?.parent?.name}</td>
									<td>
										<button
											className='btn-primary mr-1'
											onClick={() => editCategory(category)}>
											Edit
										</button>
										<button
											className='btn-primary'
											onClick={() => {
												deleteConfirmation(category, page, fetchCategories);
											}}>
											Delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	);
}
