"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import {
	heroBg,
	heroBg2,
	heroImage,
	heroImage2,
	heroImage3,
} from "@public/images";
import { Rubik } from "next/font/google";
import HeroCarousel from "../Cards/HeroCarousel";
import AboutUs from "./AboutUs";
import WhyChooseUs from "./WhyChooseUs";
import { FiCheckCircle } from "@node_modules/react-icons/fi";

const rubik = Rubik({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap", // Professional standard for performance
});

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage, // Store the first product's image
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	return (
		<>
			{/* Hero Concept inspired by the image */}
			<section className='grid grid-cols-1 lg:grid-cols-2 w-full min-h-[70vh] lg:h-screen overflow-hidden'>
				{/* 1. LEFT CONTENT AREA (Light Background) */}
				<div className='flex items-center justify-center bg-[#F8F8F8] px-8 py-16 lg:px-24'>
					<div className='max-w-xl space-y-6'>
						{/* Main Heading */}
						<h1 className='text-2xl sm:text-[54px] lg:text-[86px] font-bold leading-[1.05] text-primary-400 tracking-tight'>
							Buy Your <br />
							Top Notch <br />
							Accessories
						</h1>

						{/* Subtext / Placeholder Text */}
						<p className='text-gray-400 text-sm lg:text-base leading-relaxed max-w-sm'>
							They say that home is where the heart is. Perhaps that's why a
							feeling of loss is so apparent when you are far from the ones you
							love.
						</p>

						{/* Optional: Add the "Shop Now" button back if you want it functional */}
						{/* 
          <button className='mt-4 bg-pritext-primary-400 text-white px-8 py-3 font-bold rounded-lg hover:brightness-110 transition-all'>
            Shop Now
          </button> 
          */}
					</div>
				</div>

				{/* 2. RIGHT IMAGE AREA */}
				<div className='relative h-full w-full min-h-[400px]'>
					<Picture
						src={heroBg2} // Replace with your image source
						alt='Desk Setup Accessories'
						className='absolute inset-0 size-full object-cover'
					/>
				</div>
			</section>
			<AboutUs />
			{/* Category Section Styling Idea */}
			<section className='w-full bg-white py-12'>
				<div className='max-w-[1440px] mx-auto px-4 lg:px-10'>
					{/* Optional Section Heading to match Bestsellers */}
					<h2 className='text-primary-400 text-3xl lg:text-4xl font-bold mb-8'>
						Browse Categories
					</h2>

					<div className='grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6'>
						{Categories?.slice(0, 5).map((cat) => {
							const displayImage =
								cat.image?.src ?? categoryProductsMap[cat?.id];

							return (
								<Link
									key={cat.id}
									href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
									className='group relative h-64 lg:h-80 bg-gray-100 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl'
								>
									{/* 1. Clean Image Layer */}
									<div className='absolute inset-0 w-full h-full overflow-hidden'>
										<img
											src={displayImage}
											alt={cat.name}
											className='w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110'
										/>
									</div>

									{/* 2. Glassmorphism Bottom Overlay */}
									<div className='absolute bottom-3 left-3 right-3 p-2 lg:p-5 rounded-lg lg:rounded-[2rem] bg-white/20 backdrop-blur-md border border-white/30 z-20 transition-all duration-300 group-hover:bg-white/40'>
										<div className='flex flex-col'>
											<span className='text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-1'>
												Collection
											</span>
											<h3 className='text-sm lg:text-xl font-bold text-white leading-tight drop-shadow-sm'>
												{cat.name}
											</h3>
										</div>
									</div>

									{/* Subtle dark tint at the bottom to ensure text legibility on light images */}
									<div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60' />
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			{/* </Carousel> */}
		</>
	);
};

export default AllCategorySection;
