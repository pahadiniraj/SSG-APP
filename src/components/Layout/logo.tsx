// components/Logo.tsx
import Image from "next/image";
import Link from "next/link";
import LOGO from "../../../public/Image/LOGO.png";

const Logo = () => (
  <Link href="/" className="flex items-center">
    <Image src={LOGO} alt="Job Finder" className="w-36 h-auto" priority />
  </Link>
);

export default Logo;
