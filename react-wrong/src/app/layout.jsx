import "./globals.css";

export const metadata = {
  title: "BiznagaFest 2024 - Componentización eficiente",
  description: "React Wrong Example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
