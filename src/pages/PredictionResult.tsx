import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useModel } from '../context/ModelContext';
import { AlertTriangle, ArrowLeft, Camera } from 'lucide-react';

const PredictionResult: React.FC = () => {
  const navigate = useNavigate();
  const { predictions, uploadedImage } = useModel();

  if (!predictions || !uploadedImage) {
    navigate('/upload');
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/upload')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Upload Another Image
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Analysis Results
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Analyzed skin"
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Potential Conditions
                </h2>

                <div className="space-y-4">
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">
                          {prediction.class}
                        </h3>
                        <span className="text-sm font-medium text-blue-600">
                          {(prediction.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${prediction.probability * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                  <div className="flex">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-700">
                        <strong>Important Notice:</strong> This analysis is preliminary
                        and should not be considered a medical diagnosis. Please
                        consult a healthcare professional for proper evaluation and
                        treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;