
import './CategoriesPage.css';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getProducts } from '../api/product';
import { getCategories } from '../api/categories';
import { FaTh } from 'react-icons/fa';

function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t, lang } = useLanguage();
  
  // Function to get translated category name
  const getTranslatedCategoryName = (cat) => {
    const categoryKeys = {
      'Watch': 'watch',
      'Work': 'work',
      'Joy': 'joy',
      'AI Subscriptions': 'aiSubscriptions'
    };
    return t(`categories.${categoryKeys[cat]}`) || cat;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const productsToDisplay = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : [];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <section className="categories-page">
      <div className="categories-container">
        <h1 className="categories-title">{t('categoriesPage.title')}</h1>
        
        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map(category => {
            const Icon = FaTh;
            const productCount = products.filter(p => p.category === category.name).length;
            return (
              <div
                key={category.id}
                className={`category-card-large ${selectedCategory === category.name ? 'category-card-large-active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="category-card-large-icon">
                  <Icon />
                </div>
                <h3 className="category-card-large-name">{getTranslatedCategoryName(category.name)}</h3>
              <p className="category-card-large-count">{productCount} {t('categoriesPage.productsCount')}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Category Products */}
        {selectedCategory && (
          <div className="selected-category-section">
            <div className="selected-category-header">
              <h2 className="selected-category-title">{getTranslatedCategoryName(selectedCategory)} {t('categoriesPage.selectedTitle')}</h2>
              <Link 
                to="/shop" 
                state={{ category: selectedCategory }}
                className="see-all-in-shop"
              >
                {t('categoriesPage.seeAllInShop')}
              </Link>
            </div>
            {productsToDisplay.length > 0 ? (
              <div className="selected-category-grid">
                {productsToDisplay.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>{t('categoriesPage.noProducts')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoriesPage;
