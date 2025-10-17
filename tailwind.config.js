/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: "#2E6CE6", ink: "#0A0A0A", accent: "#F5B72E" },
      borderRadius: { card: "1.25rem" },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,.12)", elevated: "0 18px 50px rgba(0,0,0,.28)" }
    }
  },
  plugins: []
}