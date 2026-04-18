import "../styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Amazon Clone",
  description: "Built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}