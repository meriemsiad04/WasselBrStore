import './CategorySection.css';
import ProductCard from './ProductCard';

function CategorySection({ title, products }) {
  return (
    <section className="category-section-wrapper">
      <div className="category-section">
        <div className="category-header">
          <h2 className="category-title">
            <span className="category-title-gradient">{title}</span>
          </h2>
          <a href="#" className="category-see-all">See all</a>
        </div>
        <div className="category-grid">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;