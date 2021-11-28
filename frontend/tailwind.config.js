module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	mode: "jit",
	darkMode: false, // or 'media' or 'class'

	plugins: [require("daisyui")],

	daisyui: {
		styled: true,
	},
}
