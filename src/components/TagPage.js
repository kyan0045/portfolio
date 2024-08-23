import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TagPage = () => {
  const { tag } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [popularTags, setPopularTags] = useState([]);

  useEffect(() => {
    fetch('/content/blogs.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredBlogs = data.filter(blog => blog.tags.includes(tag));
        setBlogs(filteredBlogs);

        const tags = data.flatMap(blog => blog.tags);
        const tagCounts = tags.reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});
        const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
        const filteredPopularTags = sortedTags.filter(popularTag => popularTag !== tag);
        setPopularTags(filteredPopularTags.slice(0, 5)); // Get top 5 popular tags excluding the current tag
      });
  }, [tag]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 id="blogs" className="text-4xl font-bold mb-8 text-teal-200 text-center">
            Blogs tagged with <span className="inline-block bg-gray-700 rounded-full px-4 py-2 text-lg font-semibold text-teal-200 ml-2 cursor-pointer hover:bg-gray-600">#{tag}</span>
          </h2>
          {blogs.length === 0 ? (
            <p className="text-lg text-gray-300 text-center">No blogs found for this tag.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
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
          )}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-teal-200 flex items-center  hover:text-teal-400">
              <Link to="/blog/tags" className="flex items-center">
                Other popular tags
                <FaExternalLinkAlt className="ml-2" />
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {popularTags.map((popularTag) => (
                <Link
                  key={popularTag}
                  to={`/blog/tags/${popularTag}`}
                  className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-teal-200 mr-2 mb-2 cursor-pointer hover:bg-gray-600"
                >
                  #{popularTag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TagPage;