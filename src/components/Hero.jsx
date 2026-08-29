import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const scrollToBestSellers = () => {
    const bestSellersSection = document.getElementById('best-sellers');
    if (bestSellersSection) {
      bestSellersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            {t('hero.badge')}
          </div>

          <h1 className="hero-title">
            {t('hero.title')}
            <span className="hero-gradient">{t('hero.titleGradient')}</span>
          </h1>

          <p className="hero-text">
            {t('hero.text')}
          </p>

          <div className="hero-actions">
            <button
              className="hero-btn hero-btn-primary"
              type="button"
              onClick={() => navigate('/shop')}
            >
              {t('hero.exploreBtn')}
            </button>
            <button
              className="hero-btn hero-btn-outline"
              type="button"
              onClick={scrollToBestSellers}
            >
              {t('hero.bestSellersBtn')}
            </button>
          </div>

          <div className="hero-features">
            <div className="hero-feature">
              <div className="hero-feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="hero-feature-text">{t('hero.trust')}</span>
            </div>
            <div className="hero-feature">
              <div className="hero-feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <span className="hero-feature-text">{t('hero.fastService')}</span>
            </div>
          </div>
        </div>

    
      </div>
    </section>
  );
}

export default Hero;
