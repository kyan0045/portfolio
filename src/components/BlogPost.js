import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/content/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === id);
        if (!selectedBlog) {
          throw new Error("Blog post not found");
        }
        setBlog(selectedBlog);
        return fetch(`/content/${id}.md`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog content");
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        const headings = text.match(/^#{1,6}.+$/gm) || [];
        const toc = headings.map((heading) => {
          const level = heading.match(/^#+/)[0].length;
          const text = heading.replace(/^#+\s*/, "");
          return { level, text };
        });
        setTableOfContents(toc);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (wordCount) => {
    const wordsPerMinute = 238;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleTagClick = (tag) => {
    navigate(`/blog/tags/${tag}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div
        className="container mx-auto py-8 px-30"
        style={{ maxWidth: "calc(900px - (30px * 2))" }}
      >
        <Link
          to="/blog"
          className="text-teal-400 hover:text-teal-300 mb-4 inline-block"
        >
          &larr; Back to Blog List
        </Link>
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-5xl font-bold mb-4 text-teal-200 text-center">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center mb-6 gap-2">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">
                  {formatDate(blog.date)}
                </span>
                <span className="text-sm text-gray-400 mx-2">•</span>
                <span className="text-sm text-gray-400">
                  {blog.wordCount} words
                </span>
              </div>
                <span className="text-sm text-gray-400">•</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-400">
                  {calculateReadTime(blog.wordCount)}
                </span>
                <span className="text-sm text-gray-400 mx-2">•</span>
                <span className="text-sm text-gray-400">By Kyan Bosman</span>
              </div>
            </div>
            {tableOfContents.length > 0 && (
              <div className="table-of-contents">
                <h2>Table of Contents</h2>
                <ul>
                  {tableOfContents.map((item, index) => (
                    <li
                      key={index}
                      style={{ marginLeft: `${(item.level - 1) * 20}px` }}
                    >
                      <a
                        href={`#${item.text
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="prose prose-lg prose-invert max-w-none markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={okaidia}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h1 id={id} {...props} />;
                  },
                  h2: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h2 id={id} {...props} />;
                  },
                  h3: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h3 id={id} {...props} />;
                  },
                  h4: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h4 id={id} {...props} />;
                  },
                  h5: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h5 id={id} {...props} />;
                  },
                  h6: ({ node, ...props }) => {
                    const id = props.children
                      .toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-");
                    return <h6 id={id} {...props} />;
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
            <div className="mt-6">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-teal-200 mr-2 mb-2 cursor-pointer hover:bg-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
