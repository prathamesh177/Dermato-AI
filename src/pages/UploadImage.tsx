import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useModel } from '../context/ModelContext';
import classNames from 'classnames';

const UploadImage: React.FC = () => {
  const navigate = useNavigate();
  const { setUploadedImage, setPredictions, predict, isModelLoading, modelError, loadModelFromJson } = useModel();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string>('/models/model.json');

  useEffect(() => {
    handleModelUrlChange(modelUrl);
  }, []);

  const handleModelUrlChange = async (url: string) => {
    setModelUrl(url);
    try {
      await loadModelFromJson(url);
    } catch (err) {
      setError('Failed to load model from the provided URL. Please check the URL and try again.');
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      setError(null);
      setIsProcessing(true);

      // Create preview
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setUploadedImage(preview);

      // Create ImageData from the file
      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Get predictions
      const predictions = await predict(imageData);
      setPredictions(predictions);

      // Navigate to results
      navigate('/results');
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  }, [navigate, setUploadedImage, setPredictions, predict]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    multiple: false
  });

  const clearImage = () => {
    setPreviewUrl(null);
    setUploadedImage(null);
    setPredictions(null);
    setError(null);
  };

  if (isModelLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading model...</p>
      </div>
    );
  }

  if (modelError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{modelError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Upload Your Skin Image
        </h1>

        <div className="mb-8">
          <label htmlFor="modelUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Model Configuration URL
          </label>
          <input
            type="text"
            id="modelUrl"
            value={modelUrl}
            onChange={(e) => handleModelUrlChange(e.target.value)}
            placeholder="Enter the path to your model configuration JSON file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          {...getRootProps()}
          className={classNames(
            "border-2 border-dashed rounded-lg p-8 transition-colors",
            {
              "border-blue-400 bg-blue-50": isDragActive,
              "border-gray-300 hover:border-blue-400": !isDragActive,
            }
          )}
        >
          <input {...getInputProps()} />
          
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto rounded-lg mx-auto"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your image here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: JPEG, PNG
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin mr-2" />
            <span className="text-gray-600">Processing image...</span>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-700">
            <strong>Important:</strong> This tool provides preliminary analysis only.
            Always consult a healthcare professional for proper diagnosis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;