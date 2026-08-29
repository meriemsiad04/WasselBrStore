
import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import CategorySelector from '../components/CategorySelector';
import HomeReviews from '../components/HomeReviews';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { t } = useLanguage();
  
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const loading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  const productsToDisplay = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Oops! Something went wrong</h2>
        <p style={{ color: '#666' }}>Failed to load products. Please check your WordPress API settings and try again.</p>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <BestSellers products={products.filter(p => p.isBestSeller)} />
      <HomeReviews />
      <CategorySelector 
        categoryObjects={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      
      <div className="home-products-container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 3rem', position: 'relative', zIndex: 1 }}>
        {productsToDisplay.length > 0 ? (
          <div 
            className="product-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', padding: '2rem 0' }}
          >
            {productsToDisplay.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-products" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            <p>{t('homePage.noProducts')}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
