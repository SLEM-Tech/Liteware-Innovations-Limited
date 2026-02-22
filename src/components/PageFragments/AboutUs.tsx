import { aboutImage } from "@public/images";
import React from "react";
import Picture from "../picture/Picture";

const AboutUs = () => {
	return (
		<section className='w-full bg-white py-16 lg:py-24'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-20'>
				{/* TOP SECTION: Heading and First Paragraph */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12'>
					<div className='space-y-6'>
						<h2 className='text-[50px] lg:text-[70px] font-bold leading-none text-primary-bg-primary-400'>
							About <br /> us
						</h2>
						<p className='text-gray-400 text-sm lg:text-base max-w-md leading-relaxed'>
							Diffusing can be exactly what you need to add purpose and focus to
							your daily tasks. We've got tons of fun diffuser blends, with
							scents to suit every mood, day and situation.
						</p>
					</div>
					{/* Right side stays empty for this row to maintain the layout */}
					<div className='hidden lg:block'></div>
				</div>

				{/* BOTTOM SECTION: Image and Secondary Content */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center'>
					{/* Main Image - Takes up about 7 columns */}
					<div className='lg:col-span-7'>
						<div className='rounded-sm overflow-hidden shadow-sm'>
							<Picture
								src={aboutImage} // Replace with your image source
								alt='Workspace Setup'
								className='w-full h-auto object-cover'
							/>
						</div>
					</div>

					{/* Secondary Text and Button - Takes up about 5 columns */}
					<div className='lg:col-span-5 lg:pl-12 space-y-8'>
						<p className='text-gray-400 text-sm lg:text-base leading-relaxed'>
							We are passionate about delivering high-quality computer
							accessories that combine innovation, durability, and style,
							helping you create a smarter, more efficient, and seamless digital
							workspace experience.
						</p>

						<button className='bg-primary-400 hover:bg-primary-100 text-white px-8 py-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all shadow-md'>
							Explore the Collection
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
