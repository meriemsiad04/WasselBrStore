import './Header.css';
import { useLanguage } from '../contexts/LanguageContext';
import { FaFacebook, FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';

function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="header">
      <div className="header-left">
        <a href="https://wa.me/213793706511" target="_blank" rel="noopener noreferrer" className="header-contact">
          <FaWhatsapp />
          {t('header.contactUs')}
        </a>
      </div>
      <div className="header-right">
        <a href="https://www.instagram.com/wassel_brrstore?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="header-icon">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="header-icon">
          <FaFacebook />
        </a>
        <a href="https://www.tiktok.com/@brstore_07?_r=1&_t=ZS-980hRXTmHDd" target="_blank" rel="noopener noreferrer" className="header-icon">
          <FaTiktok />
        </a>
       
      </div>
    </header>
  );
}

export default Header;
