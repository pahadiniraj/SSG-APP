// components/Navbar.tsx
import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../../../redux/hooks/hooks";
import { RootState } from "../../../redux/store";
import Logo from "./logo";
import NavLinks from "./Navlinks";
import MobileNav from "./MobileNavbar";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isActive = (href: string) => pathname === href;

  const toggleNav = () => setShowNav(!showNav);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-2 py-3 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLinks
            links={["/create-job", "/favorite-job", "/applications"]}
            isActive={isActive}
            favorites={favorites}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleNav}
          className="md:hidden text-gray-700 hover:text-blue-600"
        >
          <TiThMenu className="text-3xl" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="bg-blue-700/95 h-screen relative">
              <MobileNav
                links={["/create-job", "/favorite-job", "/applications"]}
                isActive={isActive}
                favorites={favorites}
                toggleNav={toggleNav}
              />
              <div className="flex absolute right-2 top-3 justify-end">
                <button onClick={toggleNav} className="text-3xl text-white">
                  <MdClose />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-10 text-center text-gray-700">
              <p className="text-lg font-bold">Contact Us</p>
              <p className="text-sm">01-000000</p>
              <p className="text-sm">example@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
