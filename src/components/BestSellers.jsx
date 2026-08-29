import './BestSellers.css';
import ProductCard from './ProductCard';
import { useLanguage } from '../contexts/LanguageContext';

function BestSellers({ products = [] }) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="best-sellers-wrapper" id="best-sellers">
      <div className="best-sellers">
        <div className="best-sellers-header">
          <h2 className="best-sellers-title"><span className="best-sellers-title-gradient">{t('bestSellers.title')}</span></h2>
          <a href="#" className="best-sellers-see-all">{t('bestSellers.seeAll')}</a>
        </div>
        <div className="best-sellers-grid">
          {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellers;
