import "./globals.css";

export const metadata = {
  title: "BiznagaFest 2024 - Componentización eficiente",
  description: "React Regular Example",
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
