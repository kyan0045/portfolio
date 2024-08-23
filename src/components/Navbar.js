import React from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";

const Navbar = () => {
    return (
      <nav className="sticky top-0 flex items-center justify-between p-6 bg-gray-900">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <a
            href="../"
            className="font-semibold text-2xl tracking-widest no-underline hover:text-teal-400 transition duration-300 ease-in-out">
            &lt;/&gt;
          </a>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm xl:flex-grow"></div>
          <div className="flex space-x-4">
            <a
              href="../#about"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              About
            </a>
            <a
              href="../#projects"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Projects
            </a>
            <a
              href="/blog"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Blog
            </a>
            <a
              href="../#contact"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Contact
            </a>
            <a
              href="https://github.com/kyan0045"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center space-x-1">
              <span>GitHub</span>
              <FaExternalLinkAlt className="pl-1 mb-1 inline-block" />
            </a>
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar;