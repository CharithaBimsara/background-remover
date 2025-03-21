import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-800 to-pink-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">BG Remover</h3>
            <p className="text-gray-200">
              Remove image backgrounds with our AI-powered tool. Fast, easy, and free for basic use.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-200 hover:text-white hover:underline transition-all duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white hover:underline transition-all duration-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white hover:underline transition-all duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-white hover:underline transition-all duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <p className="text-gray-200">
              Have questions or feedback? Feel free to reach out.
            </p>
            <a
              href="mailto:contact@bgremover.com"
              className="inline-block mt-2 text-pink-300 hover:text-white hover:underline transition-all duration-300"
            >
              charithabimsara@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-purple-700 text-center text-gray-300">
          <p>© {new Date().getFullYear()} BG Remover. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;