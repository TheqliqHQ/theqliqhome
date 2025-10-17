import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Theqliq — Your Brand Can Do Better.",
  description: "We fix chaos with clarity, creativity, and structure.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* One-screen app shell (no page scroll). Font class set in globals.css */}
      <body className="h-screen min-h-[100svh] overflow-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
