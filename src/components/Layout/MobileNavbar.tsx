// components/MobileNav.tsx
import Link from "next/link";

interface MobileNavProps {
  links: string[];
  isActive: (href: string) => boolean;
  favorites: any[];
  toggleNav: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  links,
  isActive,
  toggleNav,
}) => (
  <div className="pt-14 px-2 flex gap-3 flex-col">
    {links.map((href, index) => (
      <Link
        key={index}
        href={href}
        onClick={toggleNav}
        className={`block text-xl font-semibold p-2 rounded-md transition duration-300 ${
          isActive(href)
            ? "text-blue-700 bg-blue-100"
            : "hover:bg-blue-600 text-white"
        }`}
      >
        {href.replace("/", "").replace("-", " ").toUpperCase()}
      </Link>
    ))}
  </div>
);

export default MobileNav;
