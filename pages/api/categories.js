import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

//endpoint in charge of the categories
export default async function handle(req, res) {
	const { method } = req;
	await mongooseConnect();
	await isAdminRequest(req, res);

	//get the categories data from the DB
	if (method === "GET") {
		//we want the res to give of a json with all the data inside categories
		res.json(await Category.find().populate("parent"));
	}

	//if we send a post request we want to create a new categorie
	if (method === "POST") {
		const { name, parentCategory, properties } = req.body;
		//create a const with the data and if the parent have no value put undefined
		const categoryDoc = await Category.create({
			name,
			parent: parentCategory || undefined,
			properties,
		});
		res.json(categoryDoc);
	}
	//update category
	if (method === "PUT") {
		const { name, parentCategory, _id, properties } = req.body;
		const categoryDoc = await Category.updateOne(
			{ _id },
			{
				name,
				parent: parentCategory || undefined,
				properties,
			}
		);
		res.json(categoryDoc);
	}

	//delete a category
	if (method === "DELETE") {
		const { _id } = req.query;
		await Category.deleteOne({ _id });
		res.json("Category deleted from the database");
	}
}
