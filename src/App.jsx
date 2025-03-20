import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import ImageProcessor from './components/ImageProcessor';
import ImageDownloader from './components/ImageDownloader';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import './App.css';
import './index.css';

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleImageUpload = (imageFile) => {
    setError(null);
    setProcessedImage(null);
    
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setOriginalImage({
        url: imageUrl,
        file: imageFile
      });
    }
  };

  const handleProcessingComplete = (result) => {
    setIsProcessing(false);
    setProcessingProgress(0);
    if (result.error) {
      setError(result.error);
    } else {
      setProcessedImage(result.imageUrl);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50">
        <Header />
        
        <main className="container flex-grow py-8">
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
                      Remove Image Background Instantly
                    </h1>
                    <p className="text-xl text-gray-600 animate-fade-in delay-100">
                      Upload your image, and we'll automatically remove the background using AI.
                    </p>
                  </div>
                  
                  {!originalImage ? (
                    <div className="animate-fade-in">
                      <ImageUploader onImageUpload={handleImageUpload} />
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                        {/* Original Image Section */}
                        <div className="w-full md:w-1/2 animate-slide-in-left">
                          <div className="bg-white rounded-lg shadow-2xl p-6 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
                            <p className="text-center font-medium mb-4 text-purple-600">Original Image</p>
                            <div className="bg-gray-100 rounded-lg overflow-hidden">
                              <img 
                                src={originalImage.url} 
                                alt="Original" 
                                className="w-full object-contain max-h-80 transform hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Processed Image Section */}
                        <div className="w-full md:w-1/2 animate-slide-in-right">
                          <div className="bg-white rounded-lg shadow-2xl p-6 border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
                            <p className="text-center font-medium mb-4 text-purple-600">Processed Image</p>
                            <div className="bg-gray-100 rounded-lg overflow-hidden min-h-64 flex items-center justify-center">
                              {isProcessing ? (
                                <div className="text-center py-12">
                                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                                  <p className="mt-4 text-gray-600">Processing your image...</p>
                                  <div className="w-3/4 mx-auto bg-gray-200 rounded-full h-2.5 mt-4">
                                    <div 
                                      className="bg-purple-500 h-2.5 rounded-full transition-all duration-300" 
                                      style={{ width: `${processingProgress}%` }}
                                    ></div>
                                  </div>
                                  <p className="mt-2 text-sm text-gray-500">
                                    This may take a few moments
                                  </p>
                                </div>
                              ) : processedImage ? (
                                <img 
                                  src={processedImage} 
                                  alt="Processed" 
                                  className="w-full object-contain max-h-80 transform hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="text-center py-12 text-gray-500">
                                  {error ? (
                                    <div>
                                      <div className="text-red-500 mb-2">{error}</div>
                                      <p className="text-sm text-gray-400">Try with a different image or adjust lighting</p>
                                    </div>
                                  ) : (
                                    <div>
                                      <p>Click "Remove Background" to process</p>
                                      <p className="text-sm text-gray-400 mt-2">Best results with clear subjects and contrasting backgrounds</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Buttons Section */}
                      <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-200">
                        <button
                          className="btn btn-outline flex items-center gap-2 bg-white text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-300 transform hover:scale-105"
                          onClick={() => {
                            setOriginalImage(null);
                            setProcessedImage(null);
                            setError(null);
                          }}
                        >
                          Upload New Image
                        </button>
                        
                        {!isProcessing && !processedImage && (
                          <ImageProcessor 
                            originalImage={originalImage}
                            onProcessingStart={() => {
                              setIsProcessing(true);
                              setProcessingProgress(5); // Initial progress
                              
                              // Simulate progress updates
                              const progressInterval = setInterval(() => {
                                setProcessingProgress(prev => {
                                  if (prev >= 95) {
                                    clearInterval(progressInterval);
                                    return 95;
                                  }
                                  return prev + Math.random() * 10;
                                });
                              }, 500);
                              
                              // Store interval in window to clear it when done
                              window.processingInterval = progressInterval;
                            }}
                            onProcessingComplete={(result) => {
                              // Clear progress interval if it exists
                              if (window.processingInterval) {
                                clearInterval(window.processingInterval);
                              }
                              setProcessingProgress(100);
                              // Small delay to show 100%
                              setTimeout(() => handleProcessingComplete(result), 300);
                            }}
                          />
                        )}
                        
                        {processedImage && (
                          <ImageDownloader 
                            imageUrl={processedImage} 
                            fileName={originalImage.file.name.replace(/\.[^/.]+$/, "") + "_nobg.png"}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              }
            />

            {/* How It Works Route */}
            <Route path="/how-it-works" element={<HowItWorks />} />

            {/* About Route */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;