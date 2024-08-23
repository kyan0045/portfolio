import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Tag = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/content/blogs.json')
      .then((response) => response.json())
      .then((data) => {
        // Extract tags and their counts
        const tagCounts = data.flatMap(blog => blog.tags).reduce((acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort by count
        const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
        setTags(sortedTags);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-teal-200">All Tags</h2>
          {tags.length === 0 ? (
            <p className="text-lg text-gray-300 text-center">No tags found.</p>
          ) : (
            <div className="flex flex-wrap justify-center">
              {tags.map(([tag, count]) => (
                <Link
                  key={tag}
                  to={`/blog/tags/${tag}`}
                  className="inline-block bg-gray-700 rounded-full px-4 py-2 text-lg font-semibold text-teal-200 m-2 cursor-pointer hover:bg-gray-600"
                >
                  <span className="inline-block bg-gray-800 text-white rounded-full px-3 py-1 mr-2">
                    {count}
                  </span>
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tag;