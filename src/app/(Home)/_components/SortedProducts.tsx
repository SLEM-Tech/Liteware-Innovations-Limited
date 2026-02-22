"use client";
import { WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiPlus } from "react-icons/fi";

// Updated Loader to match the new card shape
export const Loader = () => (
	<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
		{[1, 2, 3].map((i) => (
			<div
				key={i}
				className='w-full aspect-square bg-gray-100 animate-pulse rounded-[2.5rem]'
			/>
		))}
	</div>
);

const HotDealsSection = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [products, setProducts] = useState<any[]>([]);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	useEffect(() => {
		const fetchHotDeals = async () => {
			try {
				setIsLoading(true);
				const response = await WooCommerce.get(
					"products?per_page=6&on_sale=true&orderby=date&order=desc",
				);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchHotDeals();
	}, []);

	return (
		<section className='w-full py-16 lg:py-24 bg-white'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-20'>
				{/* --- Section Heading (Matched to Screenshot) --- */}
				<h2 className='text-[#5CE191] text-4xl lg:text-5xl font-bold mb-12'>
					Products
				</h2>

				{/* --- Product Grid --- */}
				<div className='min-h-[400px]'>
					{isLoading ? (
						<Loader />
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10'>
							{products.map((product: any) => (
								<div
									key={product.id}
									className='relative group rounded-[2.5rem] overflow-hidden aspect-square shadow-sm cursor-pointer'
									onClick={() => router.push(`/product/${product.slug}`)}
								>
									{/* 1. Product Image */}
									<img
										src={product?.images[0]?.src}
										alt={product?.name}
										className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
									/>

									{/* 2. Glassmorphism Info Overlay */}
									<div className='absolute bottom-4 left-4 right-4 p-5 rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/10 flex justify-between items-center transition-all group-hover:bg-black/30'>
										<div className='space-y-1'>
											<div className='flex items-center gap-2'>
												<h3 className='text-white font-bold text-lg lg:text-xl truncate max-w-[140px]'>
													{product.name}
												</h3>
												{/* Price Badge */}
												<span className='bg-[#5CE191] text-white text-[10px] font-bold px-2 py-0.5 rounded-full'>
													N{product.price}
												</span>
											</div>
											<p className='text-gray-200 text-[11px] lg:text-xs leading-tight line-clamp-2 max-w-[200px]'>
												{product.short_description.replace(/<[^>]*>?/gm, "") ||
													"Premium quality accessory for your setup."}
											</p>
										</div>

										{/* Add to Cart Icon */}
										<button className='text-white hover:text-[#5CE191] transition-colors p-2'>
											<div className='relative'>
												<FiShoppingCart className='text-2xl' />
												<FiPlus className='absolute -top-1 -right-1 text-[10px]' />
											</div>
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* --- Refactored Green Shop All Button --- */}
				{!isLoading && (
					<div className='mt-16 flex justify-center'>
						<button
							onClick={() => router.push("/category")}
							className='bg-[#5CE191] hover:bg-[#4ad081] text-white px-12 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-md active:scale-95'
						>
							Shop All
						</button>
					</div>
				)}
			</div>
			<GlobalLoader isPending={isPending} />
		</section>
	);
};

export default HotDealsSection;
