import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Shield, Clock, Award } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-500 to-teal-400 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Dermatological Analysis
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Upload a photo of your skin concern and get an instant preliminary analysis based on advanced machine learning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/upload"
                className="inline-flex items-center justify-center bg-white text-blue-600 py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Analyze Your Skin
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white py-3 px-8 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides quick analysis of skin conditions using advanced image recognition technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload className="h-12 w-12 text-blue-500" />}
              title="Upload Your Image"
              description="Take a clear photo of your skin concern and upload it securely to our platform."
            />
            <FeatureCard
              icon={<Clock className="h-12 w-12 text-blue-500" />}
              title="Get Instant Analysis"
              description="Our AI model analyzes your image in seconds and provides preliminary results."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-blue-500" />}
              title="Private & Secure"
              description="Your images and data are processed securely and never shared with third parties."
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <img 
                src="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Doctor examining patient skin"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                AI-Assisted, Not AI-Replaced
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Our tool is designed to help identify potential skin conditions, but it's not a replacement for professional medical advice. Always consult with a dermatologist for proper diagnosis and treatment.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-700">
                  <strong>Important:</strong> This application provides preliminary analysis only. For accurate diagnosis, please consult a healthcare professional.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  to="/upload"
                  className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-8 rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Try It Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The preliminary analysis helped me identify my skin condition before seeing my dermatologist."
              author="Prathamesh W"
              role="User"
            />
            <TestimonialCard
              quote="As a dermatologist, I find this tool helpful for my patients to track changes in their skin over time."
              author="Dr. XYZ"
              role="Dermatologist"
            />
            <TestimonialCard
              quote="The interface is intuitive and the analysis is surprisingly accurate for most common conditions."
              author="Rushi W"
              role="User"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Check Your Skin?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Upload an image now to get a preliminary analysis of your skin condition.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center bg-white text-blue-600 py-3 px-8 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Award key={star} className="h-5 w-5 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
};

export default Home;
