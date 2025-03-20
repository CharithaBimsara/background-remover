import React from 'react';
import { FiUploadCloud, FiZap, FiDownload } from 'react-icons/fi';

function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Upload */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-500">
                <FiUploadCloud className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Your Image</h3>
            <p className="text-gray-600">
              Drag and drop your image or click to upload. Supported formats: JPG, PNG, WEBP.
            </p>
          </div>

          {/* Step 2: Process */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <FiZap className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Remove Background</h3>
            <p className="text-gray-600">
              Our AI-powered tool will automatically remove the background in seconds.
            </p>
          </div>

          {/* Step 3: Download */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500">
                <FiDownload className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download Your Image</h3>
            <p className="text-gray-600">
              Download your image with a transparent background in high quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;