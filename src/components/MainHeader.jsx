
import './MainHeader.css';
import logo from '../assets/logo/logo.png';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

function MainHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainHeaderRef = useRef(null);
  const navigate = useNavigate();
  const { t, lang, cycleLang } = useLanguage();
  const { cartCount } = useCart();

  // Handle dark/light mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // Calculate top header height
  useEffect(() => {
    const topHeader = document.querySelector('.header');
    if (topHeader) {
      const updateHeight = () => {
        setTopHeaderHeight(topHeader.offsetHeight);
      };
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className="main-header" 
      ref={mainHeaderRef}
      style={{ top: `${topHeaderHeight}px` }}
    >
      <img 
        src={logo} 
        alt="Wassel BR Store 07" 
        className="main-header-logo" 
      />
      
      <nav className={`main-header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink 
          to="/" 
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) => 
            `main-header-link ${isActive ? 'main-header-link-active' : ''}`
          }
        >
          {t('mainHeader.home')}
        </NavLink>
        <NavLink 
          to="/shop" 
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) => 
            `main-header-link ${isActive ? 'main-header-link-active' : ''}`
          }
        >
          {t('mainHeader.shop')}
        </NavLink>
        <NavLink 
          to="/categories" 
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) => 
            `main-header-link ${isActive ? 'main-header-link-active' : ''}`
          }
        >
          {t('mainHeader.categories')}
        </NavLink>
        <NavLink 
          to="/reviews" 
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) => 
            `main-header-link ${isActive ? 'main-header-link-active' : ''}`
          }
        >
          {t('mainHeader.reviews')}
        </NavLink>
      </nav>

      {/* Mobile hamburger button */}
      <button
        type="button"
        className="main-header-hamburger"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
      </button>
      
      <div className="main-header-icons">
        <div className="main-header-search-container">
          <form onSubmit={handleSearch} className={`main-header-search-form ${searchOpen ? 'open' : ''}`}>
            <input
              type="text"
              placeholder={t('mainHeader.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="main-header-search-input"
              autoFocus={searchOpen}
            />
            <button type="submit" className="main-header-search-submit">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </button>
          </form>
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="main-header-icon main-header-search-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </button>
        </div>
        
        <button
          type="button"
          onClick={cycleLang}
          className="main-header-icon main-header-lang"
        >
          {lang.toUpperCase()}
        </button>
        
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="main-header-icon main-header-theme"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        
        <button
          type="button"
          className="main-header-icon main-header-cart"
          onClick={() => navigate('/cart')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          {cartCount > 0 && (
            <span className="main-header-cart-count">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default MainHeader;
