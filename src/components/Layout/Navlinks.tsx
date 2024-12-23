// components/NavLinks.tsx
import Link from "next/link";

interface NavLinksProps {
  links: string[];
  isActive: (href: string) => boolean;
  favorites: any[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links, isActive, favorites }) => (
  <>
    {links.map((href, index) => (
      <div key={index} className="relative">
        <Link
          href={href}
          className={`px-4 py-2 rounded-md font-semibold text-gray-700 transition duration-300 ${
            isActive(href)
              ? "text-blue-700 bg-blue-100"
              : "hover:bg-blue-100 hover:text-blue-600"
          }`}
        >
          {href.replace("/", "").replace("-", " ").toUpperCase()}
        </Link>
        {href === "/favorite-job" && favorites.length > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
            {favorites.length}
          </div>
        )}
      </div>
    ))}
  </>
);

export default NavLinks;
