import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-700">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">DermAI Diagnosis</span>
            </div>
            <p className="text-gray-400 max-w-md mb-4">
              Advanced dermatological disease prediction using machine learning to help identify potential skin conditions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:walvekarprathamesh734@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/upload" className="text-gray-400 hover:text-white transition-colors">Check Your Skin</Link></li>
                <li><Link to="/history" className="text-gray-400 hover:text-white transition-colors">History</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://ieeexplore.ieee.org/document/10870861" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Email: dermaidevelopers@gmail.com</p>
              <p className="text-gray-400">Phone: +919922499538</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} DermAI Diagnosis. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 mx-1" />
            <span>for better skin health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;