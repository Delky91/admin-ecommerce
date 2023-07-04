import Layout from "../components/Layout";
import ProductForm from "../components/ProductForm";

export default function NewProduct() {
	return (
		<Layout>
			<div className='bg-primary/60 rounded-lg px-5 py-3 shadow-lg shadow-black/30 md:w-9/12 mx-auto md:mt-10 border border-white/20'>
				<span className='flex justify-center'>
					<h1 className='mb-4 text-xl text-txColor font-bold'>New Product</h1>
				</span>
				<ProductForm />
			</div>
		</Layout>
	);
}
