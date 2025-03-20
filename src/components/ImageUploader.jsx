import React, { useRef, useState } from 'react';
import { FiUpload, FiCheck, FiAlertCircle } from 'react-icons/fi';

function ImageUploader({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', or null
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidImage(file)) {
      simulateUpload(file);
    } else if (file) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      alert("Please upload a valid image file (JPG, PNG, or WEBP)");
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && isValidImage(file)) {
      simulateUpload(file);
    } else if (file) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      alert("Please upload a valid image file (JPG, PNG, or WEBP)");
    }
  };
  
  const isValidImage = (file) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    return acceptedTypes.includes(file.type);
  };
  
  // Simulates an upload process with progress
  const simulateUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate a small delay at 100% to make transition feel natural
          setTimeout(() => {
            setIsUploading(false);
            setUploadStatus('success');
            onImageUpload(file);
            
            // Clear success status after a delay
            setTimeout(() => setUploadStatus(null), 2000);
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
        isDragging ? 'border-purple-500 bg-purple-50' : 
        isUploading ? 'border-purple-500 bg-purple-50' : 
        uploadStatus === 'success' ? 'border-green-500 bg-green-50' :
        uploadStatus === 'error' ? 'border-red-500 bg-red-50' :
        'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
      }`}
      onClick={() => !isUploading && fileInputRef.current.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? (
        // Upload in progress
        <div className="py-4">
          <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-purple-100">
            <div className="w-8 h-8 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg font-medium mb-2">Uploading image...</h3>
          <div className="w-3/4 mx-auto bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-gray-500">
            {Math.round(uploadProgress)}% complete
          </p>
        </div>
      ) : uploadStatus === 'success' ? (
        // Upload success
        <div className="py-4">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500">
            <FiCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-green-600">Upload successful!</h3>
          <p className="text-gray-600">Your image has been uploaded successfully.</p>
        </div>
      ) : uploadStatus === 'error' ? (
        // Upload error
        <div className="py-4">
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-500">
            <FiAlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-red-600">Upload failed</h3>
          <p className="text-gray-600">Please try again with a supported file format.</p>
          <p className="text-sm text-gray-400 mt-2">
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>
      ) : (
        // Default upload state
        <>
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-500">
            <FiUpload className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium mb-2">Upload an image</h3>
          <p className="text-gray-500 mb-4">
            Drag and drop your image here, or click to browse
          </p>
          <p className="text-sm text-gray-400">
            Supported formats: JPG, PNG, WEBP
          </p>
        </>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
      />
    </div>
  );
}

export default ImageUploader;