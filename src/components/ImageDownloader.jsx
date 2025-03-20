import React from 'react';
import { FiDownload } from 'react-icons/fi';

function ImageDownloader({ imageUrl, fileName }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300"
      onClick={handleDownload}
    >
      <FiDownload className="text-xl" />
      <span className="font-medium">Download Image</span>
    </button>
  );
}

export default ImageDownloader;