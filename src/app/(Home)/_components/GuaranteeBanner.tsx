"use client";
import { heroBg } from "@public/images";
import Picture from "@src/components/picture/Picture";
import { useRouter } from "next/navigation";
import React from "react";

const GuaranteeBanner = () => {
	const router = useRouter();
	return (
		<section className='grid grid-cols-1 lg:grid-cols-2 w-full min-h-[500px] lg:h-[600px] overflow-hidden'>
			{/* 1. LEFT CONTENT AREA (The Green Block) */}
			<div className='relative flex flex-col justify-center items-start bg-[#5CE191] px-8 py-20 lg:px-24'>
				{/* Subtle Noise Texture Overlay (Optional) */}

				<div className='relative z-10 max-w-xl space-y-10'>
					<h2 className='text-white text-4xl lg:text-[56px] font-bold leading-[1.1] tracking-tight'>
						Our products are 100% guarantee to last for at least 10 years.
					</h2>

					<button
						onClick={() => router.push("/category")}
						className='bg-white hover:bg-gray-100 text-gray-800 px-14 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg active:scale-95'
					>
						Shop All
					</button>
				</div>
			</div>

			{/* 2. RIGHT IMAGE AREA */}
			<div className='relative h-full w-full min-h-[400px]'>
				<Picture
					src={heroBg} // Replace with the image of the monitor setup
					alt='Modern Desk Setup'
					className='absolute inset-0 size-full object-cover'
				/>
			</div>
		</section>
	);
};

export default GuaranteeBanner;
