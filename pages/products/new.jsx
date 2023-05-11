import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function NewProduct() {
	return (
		<Layout>
			<h1>
				<strong>New Product</strong>
			</h1>
			<ProductForm />
		</Layout>
	);
}
