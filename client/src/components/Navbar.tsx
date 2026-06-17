import { useState } from 'react';

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-red-600 leading-none tracking-wide">NEXORA</div>
            <div className="text-[9px] text-gray-400 tracking-widest uppercase">College Committee Management System</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'About Us', 'How It Works', 'Testimonials', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-sm font-medium transition-colors ${
                i === 0
                  ? 'text-red-600 border-b-2 border-red-600 pb-1'
                  : 'text-gray-600 hover:text-red-600'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={onLoginClick} className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors px-4 py-2">
            Log In
          </button>
          <button onClick={onLoginClick} className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {['Home', 'Features', 'About Us', 'How It Works', 'Testimonials', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-sm text-gray-700 hover:text-red-600">
              {item}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={onLoginClick} className="text-sm font-medium border border-gray-200 px-4 py-2 rounded-lg">Log In</button>
            <button onClick={onLoginClick} className="bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-lg">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;