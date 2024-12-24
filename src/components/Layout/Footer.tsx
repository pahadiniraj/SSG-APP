import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <div className="bg-blue-700 text-white py-12 px-4">
      <div className="container mx-auto space-y-10 md:space-y-0 md:flex md:justify-between gap-20">
        <div className="text-center md:text-left md:w-1/3 p-2">
          <h2 className="text-3xl font-semibold mb-2">Job Finder</h2>
          <p className="text-sm ">
            We help job seekers find their dream job and employers connect with
            the best talent. Our mission is to simplify job search in Nepal and
            make it easier for everyone.
          </p>
        </div>

        <div className="text-center md:text-left md:w-1/3 p-2">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-300 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300 transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="text-center md:text-left md:w-1/3 p-2">
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex justify-center md:justify-start space-x-6 mb-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-white hover:text-blue-300 transition-colors"
            >
              <MdEmail size={24} />
            </a>
          </div>
          <p className="text-sm mb-4">
            Or reach us at{" "}
            <span className="font-semibold">info@jobfinder.com</span>
          </p>

          {/* Subscription Form */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Subscribe for Updates"
              className="p-2 rounded-md text-black w-full md:w-64"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10">
        <p className="text-sm">© 2024 Job Finder. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
