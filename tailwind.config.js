/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include your content/ directory so classes used inside hero/content files are included
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: { brand: "#2E6CE6", ink: "#0A0A0A", accent: "#F5B72E" },
      borderRadius: { card: "1.25rem" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.12)", elevated: "0 18px 50px rgba(0,0,0,.28)" }
    }
  },
  plugins: []
}
