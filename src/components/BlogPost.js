import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogPost = () => {
  const { id } = useParams(); // Extract the id from the URL parameters
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/content/blogs.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const selectedBlog = data.find((b) => b.id === id);
        if (!selectedBlog) {
          throw new Error('Blog post not found');
        }
        setBlog(selectedBlog);
        return fetch(`/content/${id}.md`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch blog content');
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
      <div className="container mx-auto py-8 px-30" style={{ maxWidth: 'calc(900px - (30px * 2))' }}>  
              <Link to="/blog" className="text-teal-400 hover:text-teal-300 mb-4 inline-block">
          &larr; Back to Blog List
        </Link>
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-5xl font-bold mb-4 text-teal-200 text-center">{blog.title}</h1>
            <div className="flex items-center justify-center mb-6">
              <span className="text-sm text-gray-400">{formatDate(blog.date)}</span>
              <span className="text-sm text-gray-400 mx-2">•</span>
              <span className="text-sm text-gray-400">{blog.wordCount} words</span>
              <span className="text-sm text-gray-400 mx-2">•</span>
              <span className="text-sm text-gray-400">{calculateReadTime(blog.wordCount)}</span>
              <span className="text-sm text-gray-400 mx-2">•</span>
              <span className="text-sm text-gray-400 mx-2">By Kyan Bosman</span>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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