"use client";
import React, {
	useMemo,
	useState,
	useTransition,
	Fragment,
	useRef,
	useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
	currencyOptions,
	filterCustomersByEmail,
	headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import { FiSearch, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import CategoryPageBottomHeader from "./CategoryPageBottomHeader";
import ProductPageBottomHeader from "./ProductPageBottomHeader";
import { FaShoppingBag } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { email } = useToken();
	const { totalItems } = useCart();

	const { baseCurrency } = useAppSelector((state) => state.currency);
	const [isPending, startTransition] = useTransition();

	const [isCartOpen, setIsCartOpen] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	const { data: customer } = useCustomer("");
	const wc_customer_info = useMemo(
		() => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
		[customer, email],
	);

	useEffect(() => {
		if (isSearchExpanded && searchRef.current) {
			searchRef.current.focus();
		}
	}, [isSearchExpanded]);

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleCurrencyChange = async (code: string) => {
		const selectedObj = currencyOptions.find((c) => c.code === code);
		if (!selectedObj) return;

		try {
			const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
			if (data) {
				dispatch(setExchangeRate(data));
				dispatch(setBaseCurrency(selectedObj));
				FormToast({ message: `Switched to ${code}`, success: true });
			}
		} catch (error) {
			FormToast({ message: "Currency switch failed", success: false });
		}
	};

	const handleSearch = () => {
		if (!searchValue) return;
		startTransition(() => {
			router.push(`/search?q=${searchValue}`);
			setIsSearchExpanded(false);
		});
	};

	const userDropDownLinks = [
		{ id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
		{ id: 2, href: "/user/my-orders", icon: <FiSearch />, label: "Orders" },
		{ id: 3, onClick: onOpenCart, icon: <FaShoppingBag />, label: "Cart" },
	];

	return (
		<>
			<header className='flex flex-col w-full bg-white/95 backdrop-blur-md z-[100] fixed top-0 border-b border-gray-100 transition-all duration-300'>
				{/* Main Desktop Header */}
				<div className='hidden slg:grid grid-cols-12 items-center w-full py-5 max-w-[1540px] px-10 mx-auto gap-4'>
					{/* 1. Logo Section */}
					<div className='col-span-3 flex items-center'>
						<LogoImage className='!w-[42px] cursor-pointer hover:scale-105 transition-transform' />
					</div>

					{/* 2. Navigation Links */}
					<div className='col-span-5 flex justify-center items-center'>
						<div className='flex w-fit gap-8 overflow-hidden'>
							{headerNavLinks.map((link) => (
								<Link
									key={link.id}
									href={link.href}
									className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 relative group ${
										pathname === link.href
											? "text-primary-100"
											: "text-black hover:text-primary-100"
									}`}
								>
									{link.text}
									<span
										className={`h-[2px] inline-block bg-primary-100 absolute left-0 -bottom-1 transition-all ease duration-300 ${
											pathname === link.href
												? "w-full"
												: "w-0 group-hover:w-full"
										}`}
									/>
								</Link>
							))}
						</div>
					</div>

					{/* 3. Controls */}
					<div className='col-span-4 flex items-center justify-end gap-5'>
						{/* Expandable Search */}
						<div
							className={`relative flex items-center transition-all duration-500 ease-in-out ${isSearchExpanded ? "w-full max-w-[300px]" : "w-11"}`}
						>
							<div
								className={`flex items-center w-full rounded-xl transition-all duration-500 ${isSearchExpanded ? "bg-gray-50 px-4 h-11 border border-gray-200 opacity-100" : "w-0 h-0 opacity-0 overflow-hidden"}`}
							>
								<FiSearch className='text-gray-400 mr-2 shrink-0' />
								<input
									ref={searchRef}
									type='text'
									placeholder='Search parts...'
									className='w-full bg-transparent text-xs font-bold text-black outline-none placeholder:text-gray-400'
									value={searchValue}
									onChange={(e) => setSearchValue(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && handleSearch()}
									onBlur={() => {
										if (!searchValue) setIsSearchExpanded(false);
									}}
								/>
								{isPending ? (
									<ImSpinner2 className='text-primary-100 animate-spin shrink-0' />
								) : (
									<button onClick={() => setIsSearchExpanded(false)}>
										<FiX className='text-gray-400 hover:text-black shrink-0' />
									</button>
								)}
							</div>

							{!isSearchExpanded && (
								<button
									onClick={() => setIsSearchExpanded(true)}
									className={`flex items-center justify-center size-11 rounded-xl ${isSearchExpanded ? "bg-gray-100 hover:bg-primary hover:text-white" : ""}  text-black transition-all duration-300`}
								>
									<FiSearch size={18} />
								</button>
							)}
						</div>

						{/* Currency Toggle */}
						<Menu as='div' className='relative'>
							<Menu.Button className='flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl hover:bg-gray-100 transition group outline-none border border-transparent hover:border-gray-200'>
								{/* @ts-ignore */}
								<Flag
									code={baseCurrency?.countryCode || "NG"}
									className='w-4 rounded-xs object-cover'
								/>
								<span className='text-[10px] font-black tracking-widest text-black uppercase'>
									{baseCurrency.code}
								</span>
								<SlArrowDown className='text-[8px] text-gray-400 group-hover:text-black transition-transform duration-300' />
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition duration-200 ease-out'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
							>
								<Menu.Items className='absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded-2xl shadow-2xl p-1.5 z-[110] outline-none'>
									{currencyOptions.map((c) => (
										<Menu.Item key={c.code}>
											{({ active }) => (
												<button
													onClick={() => handleCurrencyChange(c.code)}
													className={`${active ? "bg-primary-100 text-white" : "text-gray-700"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-bold uppercase tracking-wider transition-all`}
												>
													{/* @ts-ignore */}
													<Flag
														code={c.countryCode}
														className='w-4 rounded-xs'
													/>
													{c.code}{" "}
													<span
														className={
															active ? "text-white/70" : "text-gray-400"
														}
													>
														({c.symbol})
													</span>
												</button>
											)}
										</Menu.Item>
									))}
								</Menu.Items>
							</Transition>
						</Menu>

						{/* Cart Button */}
						<div
							className='relative p-3 cursor-pointer group'
							onClick={onOpenCart}
						>
							<FaShoppingBag className='text-xl text-black group-hover:text-primary-100 transition-colors' />
							{totalItems > 0 && (
								<span className='absolute top-1 right-1 size-5 bg-primary-100 text-white text-[9px] font-black flex items-center justify-center rounded-lg shadow-[0_0_10px_rgba(39,208,126,0.4)]'>
									{totalItems}
								</span>
							)}
						</div>

						{/* User Profile */}
						<Menu as='div' className='relative'>
							<Menu.Button className='flex items-center outline-none group'>
								<div className='p-0.5 rounded-xl border-2 border-transparent group-hover:border-primary-100/30 transition-all'>
									{wc_customer_info?.shipping?.address_2 ? (
										<Picture
											src={wc_customer_info.shipping.address_2}
											alt='user'
											className='size-10 rounded-xl object-cover border border-gray-100'
										/>
									) : (
										<div className='size-10 rounded-xl bg-primary-100 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary-100/20'>
											{getFirstCharacter(wc_customer_info?.first_name || "U")}
										</div>
									)}
								</div>
							</Menu.Button>
							<Transition
								as={Fragment}
								enter='transition duration-200 ease-out'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
							>
								<Menu.Items className='absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 z-[110] outline-none'>
									<div className='px-4 py-3 mb-2 bg-gray-50 rounded-xl'>
										<p className='text-[9px] uppercase tracking-widest text-gray-400 font-black'>
											System User
										</p>
										<p className='text-xs font-black text-black truncate uppercase tracking-tighter'>
											{wc_customer_info?.first_name || "Guest Access"}
										</p>
									</div>
									<div className='space-y-1'>
										{userDropDownLinks.map((item) => (
											<Menu.Item key={item.id}>
												{({ active }) => (
													<button
														onClick={(e) => {
															if (item.onClick) {
																e.preventDefault();
																item.onClick();
															} else if (item.href) {
																router.push(item.href);
															}
														}}
														className={`${active ? "bg-primary-100/10 text-primary-100" : "text-gray-700"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-bold uppercase tracking-widest transition-all`}
													>
														<span className='text-sm'>{item.icon}</span>
														{item.label}
													</button>
												)}
											</Menu.Item>
										))}
									</div>
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() => signOut()}
												className={`${active ? "bg-red-500 text-white" : "text-red-500"} flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[10px] font-black uppercase tracking-widest transition-all mt-2 border border-red-100`}
											>
												<FiLogOut /> Terminate Session
											</button>
										)}
									</Menu.Item>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</div>

				{/* Mobile Header */}
				<div className='slg:hidden flex flex-col w-full p-5 gap-4 bg-white border-b border-gray-100'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<button
								onClick={() => setDrawerVisible(true)}
								className='p-2 rounded-xl bg-gray-50'
							>
								<FiMenu className='text-xl text-black' />
							</button>
							<LogoImage className='!w-[35px]' />
						</div>
						<div
							onClick={onOpenCart}
							className='relative p-3 rounded-xl bg-primary-100 shadow-lg shadow-primary-100/20'
						>
							<FaShoppingBag className='text-lg text-white' />
							{totalItems > 0 && (
								<span className='absolute -top-1 -right-1 size-5 bg-black border-2 border-white rounded-full text-[9px] flex items-center justify-center text-white font-bold'>
									{totalItems}
								</span>
							)}
						</div>
					</div>
					<div className='relative'>
						<input
							type='text'
							placeholder='SEARCH HARDWARE...'
							className='w-full h-12 text-[10px] font-black tracking-widest bg-gray-100 text-black rounded-xl px-5 border border-transparent outline-none focus:border-primary-100/50 transition-all'
							value={searchValue}
							onChange={(e) => setSearchValue(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						/>
						{isPending ? (
							<ImSpinner2 className='absolute right-4 top-1/2 -translate-y-1/2 text-primary-100 animate-spin' />
						) : (
							<FiSearch className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400' />
						)}
					</div>
				</div>

				{/* Conditional Bottom Headers */}
				<div className='bg-gray-50/50'>
					{pathname.includes("/category") ? (
						<CategoryPageBottomHeader />
					) : pathname.includes("/home-item") ? (
						<ProductPageBottomHeader />
					) : null}
				</div>
			</header>

			{/* Cart Drawer */}
			<Drawer
				open={isCartOpen}
				onClose={onCloseCart}
				placement='right'
				width={
					typeof window !== "undefined" && window.innerWidth > 768
						? 500
						: "100%"
				}
				className='bg-white shadow-2xl'
			>
				<ProductTable onClose={onCloseCart} />
			</Drawer>

			<GlobalLoader isPending={isPending} />
			<MobileNav
				closeDrawer={() => setDrawerVisible(false)}
				drawerVisible={drawerVisible}
			/>
		</>
	);
};

export default Header;
