import React from 'react';
import { Github } from 'react-bootstrap-icons';

export default function MyFooter() {
  return (
    <footer className="py-4 bg-black border-t border-gray-700 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <a href="/" className="text-white text-lg font-semibold">
            WeTube
          </a>
          <span>© 2024. 서현, 건욱, 지원, 성은. All rights reserved</span>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/Pro-Digital-Academy-Mini-Project"
            aria-label="Github"
            className="text-white hover:text-blue-500"
          >
            <Github size={24} />
          </a>
          {/* <a href="#" aria-label="Facebook" className="text-white hover:text-blue-500">
            <Facebook size={24} />
          </a> */}
        </div>
      </div>
    </footer>
  );
}
