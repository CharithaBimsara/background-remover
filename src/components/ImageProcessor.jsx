import React, { useState } from 'react';
import { removeBackground } from '../utils/backgroundRemoval';
import { FiZap, FiCheck } from 'react-icons/fi';

function ImageProcessor({ originalImage, onProcessingStart, onProcessingComplete }) {
  const [processingStage, setProcessingStage] = useState('idle'); // 'idle', 'processing', 'complete'
  const [processingProgress, setProcessingProgress] = useState(0);
  const [stageMessage, setStageMessage] = useState('');
  
  const handleRemoveBackground = async () => {
    if (!originalImage) return;
    
    onProcessingStart();
    setProcessingStage('processing');
    setProcessingProgress(0);
    
    try {
      // Progress callback function
      const updateProgress = (progress, message) => {
        setProcessingProgress(Math.round(progress * 100));
        setStageMessage(message);
      };
      
      // Process image with progress updates
      const result = await removeBackground(originalImage.url, updateProgress);
      
      // Show completion state briefly
      setProcessingStage('complete');
      setProcessingProgress(100);
      
      // Return to idle state after showing completion
      setTimeout(() => {
        onProcessingComplete({ imageUrl: result });
        setProcessingStage('idle');
        setProcessingProgress(0);
      }, 1500);
      
    } catch (error) {
      console.error("Background removal failed:", error);
      setProcessingStage('idle');
      setProcessingProgress(0);
      onProcessingComplete({ 
        error: "Failed to process image. Please try a different image or try again later." 
      });
    }
  };

  const getButtonContent = () => {
    switch (processingStage) {
      case 'idle':
        return (
          <>
            <FiZap className="w-5 h-5" />
            <span>Remove Background</span>
          </>
        );
      case 'processing':
        return (
          <>
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
            <div className="flex flex-col items-start">
              <span>{stageMessage}</span>
              <div className="w-full bg-white/30 h-1 rounded-full mt-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
            </div>
          </>
        );
      case 'complete':
        return (
          <>
            <FiCheck className="w-5 h-5 text-green-400" />
            <span>Complete!</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        className={`flex items-center gap-2 min-w-48 min-h-12 justify-center px-6 py-3 rounded-lg shadow-md transition-all duration-300
                    ${
                      processingStage === 'complete'
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    } text-white font-medium`}
        onClick={handleRemoveBackground}
        disabled={processingStage !== 'idle'}
      >
        {getButtonContent()}
      </button>
      
      {processingStage === 'processing' && (
        <div className="text-xs text-center text-gray-500">
          This process may take 5-15 seconds depending on image size
        </div>
      )}
    </div>
  );
}

export default ImageProcessor;