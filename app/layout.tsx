import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theqliq — Your Brand Can Do Better.",
  description: "We fix chaos with clarity, creativity, and structure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: Open Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        {/* Point the existing CSS variable to Open Sans so your current styles keep working */}
        <style
          // This keeps your global --brand-sans pipeline intact without changing globals.css
          dangerouslySetInnerHTML={{
            __html: `
              :root { 
                --brand-sans: "Open Sans", Inter, system-ui, -apple-system, "Segoe UI",
                  Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
              }
            `,
          }}
        />
      </head>
      {/* One-screen app shell (no page scroll). Font class set in globals.css */}
      <body className="h-screen min-h-[100svh] overflow-hidden font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
