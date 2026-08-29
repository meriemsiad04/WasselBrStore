
import './ShopPage.css';
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategorySelector from '../components/CategorySelector';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../data/translations';
import { getProducts } from '../api/product';
import { getCategories } from '../api/categories';
import { FaTh } from 'react-icons/fa';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockStatus, setStockStatus] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categoryObjects = categories.map(cat => ({
    name: cat.name,
    icon: FaTh
  }));
  const { t, lang } = useLanguage();

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

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setStockStatus('all');
    setSearchParams({});
  };

  // Filter and rank products by relevance
  const processedProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    const matchesMinPrice = product.price >= min;
    const matchesMaxPrice = product.price <= max;
    const matchesStock = stockStatus === 'all' || product.inStock === (stockStatus === 'in-stock');
    return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesStock;
  }).map(product => {
    // Calculate relevance score
    let score = 0;
    const query = searchQuery.toLowerCase();
    const title = product.title.toLowerCase();
    
    if (searchQuery) {
      // Exact match (highest priority)
      if (title === query) {
        score += 100;
      }
      // Starts with query
      else if (title.startsWith(query)) {
        score += 75;
      }
      // Includes query in title
      else if (title.includes(query)) {
        score += 50;
      }
      // Check if category matches (bonus)
      if (product.category.toLowerCase().includes(query)) {
        score += 25;
      }
    }
    
    return { ...product, score };
  }).sort((a, b) => {
    // Sort by score descending, then by price ascending
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.price - b.price;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <section className="shop-page">
      <div className="shop-container">
        <h1 className="shop-title">{t('shopPage.title')}</h1>
        
        <CategorySelector 
          categoryObjects={categoryObjects} 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        
        <div className="shop-filters">

          {/* Price Filter */}
          <div className="filter-group">
            <label className="filter-label">{t('shopPage.priceLabel')}</label>
            <div className="price-filter">
              <input 
                type="number" 
                className="filter-input" 
                placeholder={t('shopPage.minPlaceholder')} 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="price-separator">-</span>
              <input 
                type="number" 
                className="filter-input" 
                placeholder={t('shopPage.maxPlaceholder')} 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Stock Filter */}
          <div className="filter-group">
            <label className="filter-label">{t('shopPage.stockLabel')}</label>
            <select 
              className="filter-select"
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
            >
              <option value="all">{t('shopPage.all')}</option>
              <option value="in-stock">{t('shopPage.inStock')}</option>
              <option value="out-of-stock">{t('shopPage.outOfStock')}</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="filter-group filter-button-group">
            <label className="filter-label">&nbsp;</label>
            <button className="reset-button" onClick={resetFilters}>
              {t('shopPage.resetBtn')}
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {processedProducts.length > 0 ? (
          <div className="product-grid">
            {processedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>{t('shopPage.noProducts')}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopPage;
