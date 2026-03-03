import { FiHeadphones, FiShield, FiZap } from "react-icons/fi";

// Branding Constants (Usually imported, but shown here for clarity)
const CompanyName = "Liteware Innovations Limited";
const CompanyShortName = "Liteware";

export const MainTermsOfUse = () => {
	return (
		<div id='termsOfUse' className='text-gray-600 space-y-8'>
			<div>
				<h4 className='text-xl lg:text-2xl font-bold text-gray-900 tracking-tight'>
					Terms of Service & Hardware Fulfillment
				</h4>
				<p className='mt-3 leading-relaxed text-sm lg:text-base'>
					By accessing the {CompanyName} digital platform and finalizing a
					procurement, you agree to the following operational standards
					regarding high-performance hardware fulfillment and asset management:
				</p>
			</div>

			<ul className='list-none space-y-6 text-sm lg:text-base'>
				{[
					{
						id: "01",
						title: "Inventory & Allocation",
						desc: `${CompanyShortName} specializes in high-fidelity hardware. While we maintain real-time inventory, final order confirmation is subject to technical availability. Clients will be notified of any backorders within 24 hours.`,
					},
					{
						id: "02",
						title: "Secure Verification",
						desc: `To maintain financial integrity, all manual bank transfers require a digital reference upload. Logistics are initiated only after the ${CompanyShortName} finance department reconciles the transaction.`,
					},
					{
						id: "03",
						title: "Fragile Asset Handling",
						desc: `Computing hardware is classified as a sensitive asset. Our logistics partners are vetted for "Fragile Tech Management." ${CompanyShortName} is not liable for third-party carrier delays.`,
					},
				].map((item) => (
					<li key={item.id} className='border-l-2 border-[#5CE191] pl-6'>
						<span className='font-bold text-[#5CE191] block uppercase text-[11px] tracking-wider mb-1'>
							{item.id}. {item.title}
						</span>
						{item.desc}
					</li>
				))}
			</ul>

			<div className='bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-6'>
				<p className='leading-relaxed text-xs lg:text-sm italic text-gray-500'>
					<span className='font-bold text-[#5CE191] not-italic uppercase text-[10px] block mb-1'>
						Technical Liability Disclaimer:
					</span>
					{CompanyName} is an authorized retailer and technical integrator. All
					long-term warranty claims are governed by the manufacturer’s terms,
					though we provide full technical assistance during the process.
				</p>
			</div>
		</div>
	);
};

export const PrivacyPolicy = () => {
	return (
		<div id='privacyPolicy' className='text-gray-600 space-y-10'>
			<div>
				<h4 className='text-xl lg:text-2xl font-bold text-gray-900 tracking-tight'>
					Data Intelligence & Security
				</h4>
				<p className='mt-3 leading-relaxed text-sm lg:text-base'>
					{CompanyName} utilizes advanced data protocols to provide a secure
					environment for high-value transactions, in strict compliance with the
					Nigeria Data Protection Regulation (NDPR).
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
					<div className='p-6 bg-white rounded-3xl border border-gray-100 shadow-sm'>
						<span className='font-bold text-gray-900 text-xs uppercase block mb-3 tracking-widest'>
							Deployment Data
						</span>
						<p className='text-xs leading-relaxed text-gray-400'>
							Coordinates and contact metrics are used strictly to facilitate
							the secure transit and delivery of your technical assets.
						</p>
					</div>
					<div className='p-6 bg-white rounded-3xl border border-gray-100 shadow-sm'>
						<span className='font-bold text-gray-900 text-xs uppercase block mb-3 tracking-widest'>
							Financial Logs
						</span>
						<p className='text-xs leading-relaxed text-gray-400'>
							Payment tokens and verification logs are siloed and encrypted to
							prevent unauthorized access during the checkout sequence.
						</p>
					</div>
				</div>
			</div>

			{/* Refactored "Encrypted" Box to match Green Branding */}
			<div className='bg-[#5CE191] p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden'>
				<div className='absolute -top-4 -right-4 p-6 opacity-10 font-black text-6xl text-white italic select-none'>
					SECURE
				</div>
				<div className='relative z-10'>
					<h4 className='text-base lg:text-lg font-bold uppercase tracking-widest text-white'>
						Hardware-Level Protection
					</h4>
					<p className='mt-4 leading-relaxed text-sm lg:text-base text-white/90 max-w-2xl'>
						{CompanyShortName} employs bank-grade AES-256 encryption to protect
						your digital identity. We treat your personal data with the same
						precision we apply to high-performance computing.
					</p>
				</div>
			</div>
		</div>
	);
};

export const DeliveryReturn = () => {
	return (
		<div className='text-gray-600 space-y-12 pb-10'>
			<div>
				<h3 className='font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight mb-4'>
					Logistics & Fulfillment
				</h3>
				<p className='text-sm lg:text-base leading-relaxed max-w-3xl'>
					At{" "}
					<span className='font-bold text-[#5CE191]'>{CompanyShortName}</span>,
					we utilize a strictly monitored logistics network. From anti-static
					packaging to specialized courier handling, we ensure your components
					reach your workstation in pristine condition.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100'>
					<h4 className='font-bold text-xs uppercase tracking-widest text-gray-400 mb-6'>
						Standard Technical Dispatch
					</h4>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between border-b border-gray-200 pb-3'>
							<span className='text-gray-500'>Standard Transit</span>
							<span className='font-bold text-gray-900'>₦7,000.00</span>
						</li>
						<li className='flex justify-between border-b border-gray-200 pb-3'>
							<span className='text-gray-500'>Express Secure Handling</span>
							<span className='font-bold text-gray-900'>₦12,000.00</span>
						</li>
					</ul>
				</div>

				<div className='bg-white p-8 rounded-[2.5rem] text-gray-900 border border-[#5CE191]/20 shadow-lg shadow-[#5CE191]/5'>
					<h4 className='font-bold text-xs uppercase tracking-widest text-[#5CE191] mb-6'>
						Premium Fulfillment
					</h4>
					<ul className='space-y-4 text-sm'>
						<li className='flex justify-between border-b border-gray-100 pb-3'>
							<span className='font-medium text-gray-500'>
								Priority Shipping
							</span>
							<span className='font-bold text-[#5CE191] uppercase'>
								Included
							</span>
						</li>
						<li className='flex justify-between border-b border-gray-100 pb-3'>
							<span className='font-medium text-gray-500'>
								Setup Consultation
							</span>
							<span className='font-bold text-[#5CE191] uppercase'>
								Complimentary
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className='bg-gray-900 rounded-[2rem] p-8 text-white'>
				<h4 className='font-bold text-sm uppercase tracking-widest text-[#5CE191] mb-4'>
					The "Dead on Arrival" (DOA) Protocol
				</h4>
				<p className='text-sm text-gray-400 leading-relaxed'>
					We provide a{" "}
					<span className='text-[#5CE191] font-bold'>Direct Replacement</span>{" "}
					for components found defective upon unboxing. An unboxing video is
					mandatory to verify factory defects versus installation damage.
				</p>
			</div>
		</div>
	);
};

export const RefundPolicy = () => {
	return (
		<div className='text-gray-600 space-y-8 text-sm'>
			<p className='text-base'>
				{CompanyName} ensures that every unit dispatched meets rigorous
				industrial benchmarks. Our refund architecture protects the technical
				integrity of your investment.
			</p>

			<section className='space-y-4'>
				<h3 className='font-bold text-gray-900 uppercase text-xs tracking-widest flex items-center gap-2'>
					<span className='size-2 bg-[#5CE191] rounded-full'></span>
					1. Eligibility for Returns
				</h3>
				<ul className='list-disc pl-5 space-y-3 text-gray-500'>
					<li>
						<strong>Technical Malfunction:</strong> Confirmed failure within 48
						hours.
					</li>
					<li>
						<strong>Manifest Mismatch:</strong> Receipt of incorrect technical
						specs.
					</li>
					<li>
						<strong>Seal Integrity:</strong> Manufacturer seals must remain
						unbroken for non-defective returns.
					</li>
				</ul>
			</section>

			<p className='p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-500'>
				<strong>Important Note:</strong> All returns undergo a{" "}
				<strong>Technical Diagnostic</strong> by
				{CompanyShortName} engineers before a credit or replacement is
				authorized.
			</p>
		</div>
	);
};

export const AboutUsContent = () => {
	return (
		<div className='space-y-6'>
			<p className='text-gray-400 text-sm lg:text-lg leading-relaxed'>
				{CompanyName} is the backbone of your digital workspace. We provide the
				high-performance internal components and precision peripherals that
				define modern enterprise and creative workflows.
			</p>

			<p className='text-gray-500 text-base font-medium'>
				Our mission is to supply the precision-engineered tools required for the
				professional technical age—ensuring your digital ecosystem never misses
				a beat.
			</p>
		</div>
	);
};

export const performanceFeatures = [
	{
		title: "Processing Speed",
		description:
			"Optimized data transfer rates and ultra-low latency components ensure your system handles demanding technical workflows.",
		icon: <FiZap className='text-[#5CE191] text-2xl' />,
	},
	{
		title: "System Security",
		description:
			"Hardware-level encryption and secure firmware protocols protect your technical assets from external breach attempts.",
		icon: <FiShield className='text-[#5CE191] text-2xl' />,
	},
	{
		title: "Technical Support",
		description:
			"Direct access to our hardware engineering team for troubleshooting and system optimization.",
		icon: <FiHeadphones className='text-[#5CE191] text-2xl' />,
	},
];
