import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600 mt-12">
      © {new Date().getFullYear()} ParkEasy. All rights reserved.
    </footer>
  );
};

export default Footer;
