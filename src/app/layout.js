import "./globals.css";
import Header from "../../components/layout/header";
import Footer from "../../components/layout/footer";

export const metadata = {
  title: "Home",
  description: "Welcome to the Online Store",
  name: "viewport",
  content: "initial-scale=1.0, width=device-width height=device-height",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <body>
        <div id="overlays"></div>
        <Header />
        <main className="flex h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
