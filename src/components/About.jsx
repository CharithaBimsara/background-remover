import React from 'react';
import { FiTool, FiSmile, FiHeart } from 'react-icons/fi';

function About() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          About BG Remover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: AI-Powered */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-500">
                <FiTool className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Tool</h3>
            <p className="text-gray-600">
              Our advanced AI technology ensures fast and accurate background removal.
            </p>
          </div>

          {/* Feature 2: User-Friendly */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <FiSmile className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              Designed for everyone, from beginners to professionals. No skills required!
            </p>
          </div>

          {/* Feature 3: Free to Use */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500">
                <FiHeart className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Free to Use</h3>
            <p className="text-gray-600">
              Enjoy our tool for free with no hidden costs or subscriptions.
            </p>
          </div>
        </div>

        {/* Additional About Text */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">
            BG Remover is a powerful yet simple tool designed to help you remove backgrounds from images effortlessly. Whether you're a designer, marketer, or just someone who loves creating content, our tool is here to make your life easier.
          </p>
          <p className="text-gray-600">
            We believe in making advanced technology accessible to everyone. That's why we've built a tool that's fast, accurate, and completely free to use. Try it today and see the difference!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;