import { Inter } from "next/font/google";
import RestaurentHeader from "../components/RestaurentHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurent",
  description: "Fresh Food Delivery at Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-[91.8vh]">
          <RestaurentHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
