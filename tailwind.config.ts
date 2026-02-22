import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				// The headers in the screenshot have a clean, slightly rounded geometric feel.
				// Poppins matches this "Top Notch" look perfectly.
				poppins: ["var(--font-poppins)", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",

				/* ========== Mint Tech Brand Palette ========== */
				brand: {
					// The vibrant Mint Green seen in the "Buy Your..." heading and buttons
					mint: "#61D983",
					// A darker version for hover states
					"mint-dark": "#4dbb6d",
					// The charcoal color seen in the Hero product background and text
					charcoal: "#1A1A1A",
					// Soft mint for subtle backgrounds/badges
					"mint-light": "#E9F7EF",
				},

				background: "#FFFFFF", // Main content background
				surface: "#F9FAFB", // Ultra-light gray for section transitions
				panel: "#121212", // Dark backgrounds for cards/sections

				primary: {
					// Mapping Mint Green as the primary brand color
					100: "#61D983",
					200: "#A3E1BD",
					300: "#A3E1BD",
					400: "#61D983", // Main Action Green
					500: "#4DBB6D",
					DEFAULT: "#61D983",
					foreground: "#FFFFFF",
				},

				// Warm Technical Grays
				gray: {
					50: "#FAFAFA",
					100: "#F5F5F5",
					200: "#E5E5E5",
					300: "#D4D4D4",
					400: "#A3A3A3",
					500: "#737373", // Secondary text (descriptions)
					600: "#4B4B4B",
					700: "#2D2D2D",
					800: "#1A1A1A", // Primary headings
					900: "#0F0F0F",
				},

				success: {
					DEFAULT: "#61D983",
					foreground: "#FFFFFF",
				},

				accent: "#61D983",
				price: "#1A1A1A",
			},

			animation: {
				"spin-slow": "spin 8s linear infinite",
				"fade-in": "fadeIn 0.5s ease-in-out",
				"pulse-mint": "pulseMint 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				pulseMint: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: ".6" },
				},
			},
			backgroundImage: {
				// The middle banner uses a soft mint-to-green gradient
				"mint-gradient": "linear-gradient(135deg, #61D983 0%, #4DBB6D 100%)",
				"dark-overlay":
					"linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
			},
		},
		screens: {
			xs: "400px",
			xmd: "800px",
			slg: "999px",
			...require("tailwindcss/defaultTheme").screens,
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#61D983",
							foreground: "#FFFFFF",
						},
						focus: "#61D983",
					},
				},
			},
		}),
	],
};
export default config;
