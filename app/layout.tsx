import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata = {
  title: "GRUPO ANDULKA",
  description: "Arquitectura corporativa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={openSans.className}>
        {children}
      </body>
    </html>
  );
}