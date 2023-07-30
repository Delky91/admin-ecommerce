import Layout from "../../components/Layout";
import ProductForm from "../ProductForm";

export default function NewProduct() {
	return (
		<Layout>
			<div className='tableContainer'>
				<span className='flex justify-center'>
					<h1 className='mb-4 text-xl font-bold text-txColor dark:text-white'>
						New Product
					</h1>
				</span>
				<ProductForm />
			</div>
		</Layout>
	);
}
