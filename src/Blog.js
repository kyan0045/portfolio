import React, { useRef } from "react";
import "./Blog.css";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between p-6 bg-gray-900 fade-in-05s">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          href="./"
          className="font-semibold text-2xl tracking-widest no-underline hover:text-teal-400 transition duration-300 ease-in-out">
          &lt;/&gt;
        </a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm xl:flex-grow"></div>
        <div className="flex space-x-4">
          <a
            href="./"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Home
          </a>
          <a
            href="./#about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            About
          </a>
          <a
            href="./#projects"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 bg-gray-900 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
            Projects
          </a>
          <a
            href="./#contact"
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

const Blogs = () => {
  return (
    <div>
      <h1>Blog Page</h1>
      <p>Welcome to the blog page!</p>
    </div>
  );
};

export default function Blog() {
  const projectsRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <Blogs />
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
