import './ProductCard.css';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../data/translations';

function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const badgeType = product.badge?.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('product-card-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      className="product-card" 
      ref={cardRef}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {product.badge && (
        <div className={`product-badge product-badge-${badgeType}`}>{product.badge}</div>
      )}
      <div className="product-image">
        <img src={product.image} alt={product.title} className="product-image-img" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-row">
          <div className="product-price">{formatPrice(product.price, lang)} {t('productCard.price')}</div>
          {product.oldPrice && (
            <div className="product-old-price">{formatPrice(product.oldPrice, lang)} {t('productCard.price')}</div>
          )}
        </div>
        <button
          className="product-button"
          type="button"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {t('productCard.buyNow')}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
