import type { Metadata } from "next";
import { Cormorant_Garamond, Lato, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-timeline",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boda de Axel & Nahomi — 04/08/2026",
  description:
    "Estás cordialmente invitado(a) a la boda de Axel Langle y Nahomi Diaz. 04/08/2026.",
  keywords: ["boda", "invitación", "Axel Langle", "Nahomi Diaz", "2026"],
  openGraph: {
    title: "Boda de Axel & Nahomi",
    description: "04/08/2026 — ¡Te esperamos!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${lato.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#2D2D2D]">
        {children}
      </body>
    </html>
  );
}
