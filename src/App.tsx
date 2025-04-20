import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import UploadImage from './pages/UploadImage';
import PredictionResult from './pages/PredictionResult';
import About from './pages/About';
import History from './pages/History';
import NearbyHospitals from './pages/NearbyHospitals';
import ModelProvider from './context/ModelContext';

function App() {
  return (
    <Router>
      <ModelProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<UploadImage />} />
              <Route path="/results" element={<PredictionResult />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<History />} />
              <Route path="/nearby-hospitals" element={<NearbyHospitals />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ModelProvider>
    </Router>
  );
}

export default App;