import Layout from "@/pages/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/pages/components/ProductForm";

export default function EditProductPage() {
	const [productInfo, setProductInfo] = useState(null);
	const [name, setName] = useState("");
	const router = useRouter();
	const id = router.query.id;

	useEffect(() => {
		if (!id) return;
		axios.get("/api/products?id=" + id).then((response) => {
			setProductInfo(response.data);
			setName(response.data.title);
		});
	}, [id]);

	return (
		<Layout>
			<h1>
				<strong>Edit {name}</strong>
			</h1>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	);
}
