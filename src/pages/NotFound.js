import React from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import '../App.css'; 

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto py-8 px-30" style={{ maxWidth: 'calc(900px - (30px * 2))' }}>
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4 text-teal-200 text-center">404 - Page Not Found</h1>
            <p className="text-lg text-center">
              Sorry, the page you are looking for does not exist.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;