import { Feather } from "lucide-react";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-8 border-t-1 shadow-sm border-gray-400">
        <div className="flex items-center gap-2">
          <Feather className="h-5 w-5" />
          <p className="leading-loose font-semibold">
            © {new Date().getFullYear()} Eazy Blog. All rights reserved.
          </p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-sm sm:text-base hover:underline underline-offset-4">
            Terms
          </Link>
          <Link to="#" className="text-sm sm:text-base hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link to="#" className="text-sm sm:text-base hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
};
