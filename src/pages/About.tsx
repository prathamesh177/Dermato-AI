import React from 'react';
import { Brain, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-16 h-16 text-blue-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">About Our AI Image Classifier</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            Welcome to our state-of-the-art AI Image Classification platform. We combine cutting-edge machine learning technology 
            with an intuitive user interface to help you analyze and understand images with unprecedented accuracy.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h2>
          <p className="text-gray-700 mb-6">
            Our system uses advanced neural networks trained on millions of images to recognize and classify various objects, 
            scenes, and patterns in your uploaded images. Simply upload your image, and our AI will analyze it in real-time, 
            providing you with detailed predictions and confidence scores.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Real-time image classification</li>
            <li>High accuracy predictions</li>
            <li>Support for multiple image formats</li>
            <li>Detailed analysis results</li>
            <li>User-friendly interface</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Technology</h2>
          <p className="text-gray-700 mb-6">
            We leverage state-of-the-art machine learning models and frameworks to ensure the highest possible accuracy 
            in our predictions. Our system is constantly learning and improving, adapting to new challenges and expanding 
            its capabilities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Development Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                <img 
                  src="/src/teams/prathamesh.jpg" 
                  alt="Prathamesh Walvekar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Prathamesh Walvekar</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                <img 
                  src="/src/teams/sonali.jpg" 
                  alt="Sonali Kadam"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Sonali Kadam</h3>
              <p className="text-gray-600">Machine Learning Engineer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                <img 
                  src="/src/teams/vaishnavi.jpg" 
                  alt="Vaishnavi Kesarkar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Vaishnavi Kesarkar</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                <img 
                  src="/src/teams/avinash.jpg" 
                  alt="Avinash Powar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Avinash Powar</h3>
              <p className="text-gray-600">Backend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;