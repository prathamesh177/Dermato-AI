import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-800">DermAI Diagnosis</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Home" current={location.pathname} />
            <NavLink to="/upload" label="Check Your Skin" current={location.pathname} />
            <NavLink to="/nearby-hospitals" label="Find Hospitals" current={location.pathname} />
            <NavLink to="/history" label="History" current={location.pathname} />
            <NavLink to="/about" label="About" current={location.pathname} />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="flex flex-col px-4 py-2 space-y-3">
            <MobileNavLink to="/" label="Home" />
            <MobileNavLink to="/upload" label="Check Your Skin" />
            <MobileNavLink to="/nearby-hospitals" label="Find Hospitals" />
            <MobileNavLink to="/history" label="History" />
            <MobileNavLink to="/about" label="About" />
          </div>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  current: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, label, current }) => {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`py-2 relative ${
        isActive
          ? 'text-blue-600 font-medium'
          : 'text-gray-700 hover:text-blue-500 transition-colors'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-bottom scale-x-100 transition-transform" />
      )}
    </Link>
  );
};

type MobileNavLinkProps = {
  to: string;
  label: string;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="w-full py-2 px-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
    >
      {label}
    </Link>
  );
};

export default Header;