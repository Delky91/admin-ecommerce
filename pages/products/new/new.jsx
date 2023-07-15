import Layout from "../../components/Layout";
import ProductForm from "../ProductForm";

export default function NewProduct() {
	return (
		<Layout>
			<div className='px-5 py-3 mx-auto border rounded-lg shadow-lg bg-primary/60 shadow-black/30 md:w-9/12 md:mt-10 border-white/20'>
				<span className='flex justify-center'>
					<h1 className='mb-4 text-xl font-bold text-txColor'>New Product</h1>
				</span>
				<ProductForm />
			</div>
		</Layout>
	);
}
