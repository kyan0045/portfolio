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
    <div className="py-20 fade-in-1s">
      <h2 id="about" className="text-4xl font-bold mb-8 text-teal-200">
        There are no blogs yet. Check back later!
      </h2>
      </div>
  );
};

const ContactMe = () => {
  return (
    <div className="py-20 fade-in-1s">
      <h2 id="contact" className="text-4xl font-bold mb-8 text-teal-200">
        Contact
      </h2>
      <p className="text-lg mb-12 text-gray-300">
        Interested in hiring me as a freelancer, working together or just want
        to say hi? Feel free to reach out to me!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Email</h3>
          <p className="text-gray-300">
            <a
              href="mailto:contact@kyan.space"
              className="text-teal-200 hover:text-teal-400">
              contact@kyan.space
            </a>
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Socials</h3>
          <p className="text-gray-300">
            <a
              href="https://github.com/kyan0045"
              className="text-teal-200 hover:text-teal-400">
              GitHub
            </a>
          </p>
          <p className="text-gray-300">
            <a
              href="https://discord.com/users/1101294362505269379"
              className="text-teal-200 hover:text-teal-400">
              Discord
            </a>
          </p>
          <p className="text-gray-300">
            <a
              href="https://www.linkedin.com/in/kyan-bosman-162507281/"
              className="text-teal-200 hover:text-teal-400">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="pb-10 text-center text-gray-300">
      <p>&copy; {new Date().getFullYear()} Kyan Bosman. All rights reserved.</p>
    </footer>
  );
}; 

export default function Blog() {
  const projectsRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <Blogs />
        <ContactMe />
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
