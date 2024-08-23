import React from 'react';

const Footer = () => {
    return (
      <footer className="pb-10 text-center text-gray-300">
        <p>
          &copy; {new Date().getFullYear()} Kyan Bosman. All rights
          reserved.
        </p>
      </footer>
    );  
  } 

export default Footer;