import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
	const { method } = req;

	mongooseConnect();

	if (method === "GET") {
		if (req.query?.id) {
			res.json(await Product.findOne({ _id: req.query.id }));
		} else {
			res.json(await Product.find());
		}
	}

	if (method === "POST") {
		const { title, description, price, images, productCategory } = req.body;
		const productDoc = await Product.create({
			title,
			description,
			price,
			images,
			productCategory,
			properties,
		});
		res.json(productDoc);
	}

	if (method === "PUT") {
		const {
			title,
			description,
			price,
			images,
			_id,
			productCategory,
			properties,
		} = req.body;

		await Product.updateOne(
			{ _id },
			{
				title: title,
				description: description,
				price: price,
				images,
				productCategory,
				properties,
			}
		);
		res.json(true);
	}

	if (method === "DELETE") {
		const { _id } = req.query;
		await Product.deleteOne({ _id });
		res.json("Product Deleted from database");
	}
}
