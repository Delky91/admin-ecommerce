import multiparty from "multiparty"; //allow to use form-data in other words, allow me to use the photos that i upload
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";
const bucketName = "lomb-next-ecommerce";

export default async function handle(req, res) {
	await mongooseConnect();
	await isAdminRequest(req, res);
	// Parse and extract the fields and attached files from an incoming HTTP request, returning a promise that resolves with the extracted data.
	const form = new multiparty.Form();
	const { fields, files } = await new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) return reject(err);
			resolve({ fields, files });
		});
	});

	console.log("length:", files.file.length);

	//connect to aws
	const client = new S3Client({
		region: "us-east-2",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
	});

	//loop to give a random name to the upload archive so i can upload 1 o more archives with the same name and upload the file to the bucket
	const links = [];
	for (const file of files.file) {
		const ext = file.originalFilename.split(".").pop();
		const newFileName = Date.now() + "." + ext;

		await client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: newFileName,
				Body: fs.readFileSync(file.path),
				ACL: "public-read",
				ContentType: mime.lookup(file.path),
			})
		);

		const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
		links.push(link);
	}

	return res.json({ links });
}

// para evitar que se parsee el req a json
export const config = {
	api: { bodyParser: false },
};
