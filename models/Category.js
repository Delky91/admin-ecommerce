import mongoose, { model, models, Schema } from "mongoose";

// create a new schema for ours categories
const CategorySchema = new Schema({
	name: { type: String, required: true },
	parent: { type: mongoose.Types.ObjectId, ref: "Category" },
	properties: [{ type: Object }],
});

//check if the category exist or created  the new one and export it
export const Category = models?.Category || model("Category", CategorySchema);
