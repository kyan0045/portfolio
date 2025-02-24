import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import Tag from "./pages/Tag";
import TagPage from "./components/TagPage";
import NotFound from "./pages/NotFound";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
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