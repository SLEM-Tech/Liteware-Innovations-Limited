"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import {
	CompanyName,
	CompanyShortName,
	filterCustomersByEmail,
} from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
	BiLogoFacebook,
	BiLogoLinkedin,
	BiLogoTiktok,
	BiLogoWhatsapp,
} from "react-icons/bi";

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
		function?: () => void;
	}[];
}

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const { data: customer } = useCustomer("");
	const wc_customer_info = filterCustomersByEmail(customer, email);
	const firstName = wc_customer_info?.first_name;

	const socialIcons = [
		{ id: 1, icon: <BiLogoTiktok />, link: "#" },
		{ id: 2, icon: <BiLogoWhatsapp />, link: "#" },
		{ id: 3, icon: <BiLogoFacebook />, link: "#" },
		{ id: 4, icon: <BiLogoLinkedin />, link: "#" },
	];

	const footerData: footerDataProps[] = [
		{
			title: "Account",
			links: [
				{
					label: firstName ? "My Dashboard" : "Create Account",
					href: firstName ? "/user/dashboard" : "/user/register",
				},
				{
					label: "Order Tracking",
					href: "/user/my-orders",
				},
				{
					label: firstName ? "Log Out" : "Login",
					href: firstName ? "" : "/user/login",
					function: firstName ? signOut : undefined,
				},
			],
		},
		{
			title: "Company",
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "Technical FAQ", href: "/faq" },
				{ label: "Partner Program", href: "/contact-us" },
			],
		},
		{
			title: "Support",
			links: [
				{ label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
				{ label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
				{ label: "Shipping Policy", href: "/terms-of-use?delivery-return" },
				{ label: "Returns & Refunds", href: "/terms-of-use?refund-policy" },
			],
		},
	];

	return (
		<footer className='w-full bg-[#FDFDFD] border-t border-gray-100 pt-20'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-16'>
				{/* 1. Brand Section */}
				<div className='lg:col-span-4 space-y-8'>
					<div className='flex flex-col gap-2'>
						{/* Removed brightness invert to show logo in original color on light background */}
						<LogoImage className='w-10 lg:w-14' />
						<h2 className='text-primary-400 text-2xl font-bold tracking-tight'>
							{CompanyShortName}
						</h2>
					</div>

					<p className='text-black text-sm leading-relaxed max-w-sm'>
						Delivering high-performance hardware and seamless digital
						experiences for modern workspaces. Upgrade your setup with
						precision.
					</p>

					{/* Clean Social Icons */}
					<div className='flex gap-4'>
						{socialIcons.map((soc) => (
							<motion.a
								key={soc.id}
								href={soc.link}
								whileHover={{ y: -3, scale: 1.1 }}
								className='size-10 flex items-center justify-center rounded-full bg-gray-50 text-black hover:text-white hover:bg-pritext-primary-400 transition-all duration-300 text-xl'
							>
								{soc.icon}
							</motion.a>
						))}
					</div>
				</div>

				{/* 2. Links Section */}
				<div className='lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10'>
					{footerData.map((section, idx) => (
						<div key={idx} className='space-y-6'>
							<h5 className='text-gray-800 text-base font-bold'>
								{section.title}
							</h5>
							<ul className='space-y-3'>
								{section.links.map((link, lIdx) => (
									<li key={lIdx}>
										<Link
											href={link.href}
											onClick={link.function}
											className={`text-sm transition-all duration-300 block ${
												pathname === link.href
													? "text-primary-400 font-bold"
													: "text-black hover:text-primary-400"
											}`}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/* 3. Bottom Bar */}
			<div className='w-full border-t border-gray-50 py-8 bg-white'>
				<div className='max-w-[1440px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4'>
					<div className='text-black text-xs tracking-wide'>
						&copy; {currentYear} {CompanyName} Hardware Hub. All rights
						reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
