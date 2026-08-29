import './Footer.css';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from '../assets/logo/logo.png';
import { useLanguage } from '../contexts/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logo} alt="Wassel BR Store" className="footer-logo" />
        <div className="footer-social">
          <a 
            href="https://facebook.com/wasselbrstore" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
          >
            <FaFacebook className="footer-social-icon" />
            <span>Wassel BR Store</span>
          </a>
          <a 
            href="https://wa.me/213793706511" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
          >
            <FaWhatsapp className="footer-social-icon" />
            <span>213793706511</span>
          </a>
          <a 
            href="https://instagram.com/wassel_brrstore" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
          >
            <FaInstagram className="footer-social-icon" />
            <span>wassel_brrstore</span>
          </a>
          <a 
            href="https://www.tiktok.com/@brstore_07?_r=1&_t=ZS-980hRXTmHDd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
          >
            <FaTiktok className="footer-social-icon" />
            <span>TikTok</span>
          </a>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Wassel BR Store. {t('footer.copyright')}</p>
          <p className="footer-developer">
            {t('footer.developedBy')} <strong>dzcraft by mery</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;