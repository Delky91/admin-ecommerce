import Layout from "@/pages/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/pages/products/ProductForm";

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
			<div className='px-5 py-3 tableContainer md:mt-10'>
				<h2 className='mb-4 text-center'>Edit {name}</h2>
				{productInfo && <ProductForm {...productInfo} />}
			</div>
		</Layout>
	);
}
