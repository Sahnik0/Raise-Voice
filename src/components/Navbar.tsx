
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-lg md:text-xl font-semibold text-primary">GrievancePortal</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/") ? "text-primary" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/submit-grievance"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/submit-grievance") ? "text-primary" : "text-gray-600"
            }`}
          >
            Submit Grievance
          </Link>
          <Link
            to="/track-grievance"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/track-grievance") ? "text-primary" : "text-gray-600"
            }`}
          >
            Track Grievance
          </Link>
          <Link
            to="/testimonials"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/testimonials") ? "text-primary" : "text-gray-600"
            }`}
          >
            Testimonials
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/contact") ? "text-primary" : "text-gray-600"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              isActive("/about") ? "text-primary" : "text-gray-600"
            }`}
          >
            About
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="outline" size="sm" className="font-medium text-sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="font-medium text-sm">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in shadow-lg">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/submit-grievance"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/submit-grievance") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                Submit Grievance
              </Link>
              <Link
                to="/track-grievance"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/track-grievance") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                Track Grievance
              </Link>
              <Link
                to="/testimonials"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/testimonials") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                Testimonials
              </Link>
              <Link
                to="/contact"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/contact") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium py-2 hover:text-primary transition-colors ${
                  isActive("/about") ? "text-primary" : "text-gray-600"
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                <Link to="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-center font-medium text-sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button className="w-full justify-center font-medium text-sm">
                    Register
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
