import Layout from "@/pages/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
	const router = useRouter();
	const [productInfo, setProductInfo] = useState("");
	const { id } = router.query;

	useEffect(() => {
		if (!id) return;
		axios.get("/api/products?id=" + id).then((response) => {
			setProductInfo(response.data);
		});
	}, [id]);

	function goBack() {
		router.push("/products");
	}

	async function DeleteProduct() {
		await axios.delete("/api/products?id=" + id);
		goBack();
	}

	return (
		<Layout>
			<h1 className='text-center'>
				Do you really want to delete &nbsp;&quot;{productInfo?.title}&quot;?
			</h1>

			<div className='flex justify-center gap-2'>
				<button
					className=''
					onClick={DeleteProduct}>
					yes
				</button>
				<button
					className=''
					onClick={goBack}>
					no
				</button>
			</div>
		</Layout>
	);
}
