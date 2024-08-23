import React, { useState, useEffect } from "react";
import "../Blog.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Link, useNavigate } from "react-router-dom";

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

const BlogList = ({ blogs }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayedBlogs = expanded ? blogs : blogs.slice(0, 3);

  const tagCounts = blogs.reduce((acc, blog) => {
    blog.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const mostUsedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const handleTagClick = (tag) => {
    navigate(`/blog/tags/${tag}`);
  };

  return (
    <div className="pt-20 fade-in-1s">
      <h2 id="blogs" className="text-4xl font-bold mb-8 text-teal-200">
        Blog Posts
      </h2>
      {blogs.length === 0 ? (
        <p className="text-lg text-gray-300">There are no blogs yet. Check back later!</p>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-teal-200">
                  <Link to={`/blog/${blog.id}`} className="hover:text-teal-400">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-gray-300 mb-4">{blog.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{blog.date}</span>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {blogs.length > 3 && (
            <button
              onClick={toggleExpanded}
              className="mt-8 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              {expanded ? 'Show Less' : 'Show More'}
            </button>
          )}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-teal-200 flex items-center hover:text-teal-400">
              <Link to="/blog/tags" className="flex items-center">
                Most Used Tags
                <FaExternalLinkAlt className="ml-2" />
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {mostUsedTags.map(tag => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-teal-200 mr-2 cursor-pointer hover:bg-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ContactMe = () => {
  return (
    <div className="fade-in-1s pt-7">
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
    <footer className="pb-10 pt-5 text-center text-gray-300">
      <p>&copy; {new Date().getFullYear()} Kyan Bosman. All rights reserved.</p>
    </footer>
  );
};

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/content/blogs.json')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        <BlogList blogs={blogs} />
        <ContactMe />
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}