"use client";

import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
	id: string | number;
	image: string;
	oldAmount?: string;
	newAmount: string;
	description: string;
	category?: string;
	boxShadow?: boolean;
}

const ProductCard2 = ({
	id,
	image,
	oldAmount,
	newAmount,
	description,
	category = "Hardware",
	boxShadow = true,
}: ProductCard2Props) => {
	const { addItem, removeItem, updateItem, getItem } = useCart();

	const ID = id.toString();
	const cartItem = getItem(ID);
	const quantity = cartItem?.quantity || 0;
	const price = parseInt(newAmount);
	const slugDesc = convertToSlug(description);

	const discount = oldAmount
		? Math.round(((parseInt(oldAmount) - price) / parseInt(oldAmount)) * 100)
		: 0;

	const addToCart = () => {
		addItem({ id: ID, name: description, price, quantity: 1, image });
	};

	const increase = () => updateItem(ID, { quantity: quantity + 1 });
	const decrease = () => {
		if (quantity <= 1) removeItem(ID);
		else updateItem(ID, { quantity: quantity - 1 });
	};

	return (
		<div
			className={`group relative flex flex-col w-full bg-white transition-all duration-300 ${
				boxShadow ? "hover:shadow-xl" : "border border-gray-100"
			}`}
		>
			{/* --- IMAGE CONTAINER --- */}
			<div className='relative aspect-square w-full bg-[#F7F7F7] flex items-center justify-center overflow-hidden p-4'>
				{/* Sale Badge (Intel Style) */}
				{discount > 0 && (
					<span className='absolute top-3 left-3 bg-[#FCEBEC] text-[#E83E44] text-[10px] font-bold px-2 py-1 rounded-sm z-10'>
						SALE
					</span>
				)}

				<Link
					href={`/home-item/product/${slugDesc}-${id}`}
					className='w-full h-full flex items-center justify-center'
				>
					<Picture
						src={image}
						alt={description}
						className='object-contain w-[80%] h-[80%] transition-transform duration-500 group-hover:scale-110'
					/>
				</Link>
			</div>

			{/* --- CONTENT AREA --- */}
			<div className='flex flex-col flex-grow p-4 space-y-3'>
				<div>
					<p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1'>
						{category}
					</p>
					<Link
						href={`/home-item/product/${slugDesc}-${id}`}
						className='text-sm font-bold text-[#121212] line-clamp-2 hover:text-[#E83E44] transition-colors leading-snug min-h-[40px]'
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				</div>

				{/* Price Section */}
				<div className='flex flex-col'>
					{oldAmount && (
						<span className='text-[11px] line-through text-gray-300 font-medium'>
							<FormatMoney2 value={parseInt(oldAmount)} />
						</span>
					)}
					<span className='text-[#121212] font-black text-xl tracking-tight'>
						{price ? <FormatMoney2 value={price} /> : "N/A"}
					</span>
				</div>

				{/* --- ACTION BUTTONS --- */}
				<div className='mt-auto pt-2'>
					{quantity === 0 ? (
						<button
							onClick={(e) => {
								e.preventDefault();
								addToCart();
							}}
							className='w-full bg-[#E83E44] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#d32f35] transition-all active:scale-95 flex items-center justify-center'
						>
							Add to cart
						</button>
					) : (
						<div className='flex items-center justify-between w-full bg-gray-100 p-1 rounded-sm'>
							<button
								onClick={decrease}
								className='size-10 flex items-center justify-center bg-white text-[#121212] hover:text-[#E83E44] transition-colors shadow-sm'
							>
								<AiOutlineMinus size={14} />
							</button>
							<span className='text-sm font-bold text-[#121212]'>
								{quantity}
							</span>
							<button
								onClick={increase}
								className='size-10 flex items-center justify-center bg-[#121212] text-white hover:bg-black transition-colors shadow-sm'
							>
								<AiOutlinePlus size={14} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard2;
