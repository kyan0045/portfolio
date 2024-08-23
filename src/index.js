import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import Tag from "./pages/Tag";
import TagPage from "./components/TagPage";
import NotFound from "./NotFound";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/blog/tags" element={<Tag />} /> 
      <Route path="/blog/tags/:tag" element={<TagPage />} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();