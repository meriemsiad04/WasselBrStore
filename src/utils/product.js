
import { FaClock, FaBriefcase, FaSmile, FaRobot, FaTh } from 'react-icons/fa';

// Map WooCommerce category names to icons
const categoryIconMap = {
  'Watch': FaClock,
  'Work': FaBriefcase,
  'Joy': FaSmile,
  'AI Subscriptions': FaRobot,
  // Add more categories here as you need
};

// Transform WooCommerce category to match our expected shape
export function transformWooCategory(wooCategory) {
  return {
    id: wooCategory.id,
    name: wooCategory.name,
    slug: wooCategory.slug,
    icon: categoryIconMap[wooCategory.name] || FaTh, // Default to FaTh if no icon found
  };
}

export function transformWooCategories(wooCategories) {
  return wooCategories.map(transformWooCategory);
}

// Transform WooCommerce product to match our product shape
export function transformWooProduct(wooProduct) {
  // Check for best_seller field in multiple places:
  // 1. acf.best_seller (if ACF exposes it directly)
  // 2. meta_data with key 'best_seller'
  // 3. meta_data with key 'is_best_seller' (for backwards compatibility)
  let isBestSeller = false;
  if (wooProduct.acf && wooProduct.acf.best_seller) {
    isBestSeller = wooProduct.acf.best_seller;
  } else {
    const bestSellerMeta = wooProduct.meta_data?.find(m => m.key === 'best_seller' || m.key === 'is_best_seller');
    if (bestSellerMeta) {
      // Handle different possible values (true, 'true', 1, '1')
      const val = bestSellerMeta.value;
      isBestSeller = val === true || val === 'true' || val === 1 || val === '1';
    }
  }

  return {
    id: wooProduct.id,
    title: wooProduct.name,
    description: wooProduct.description,
    price: Number(wooProduct.price),
    oldPrice: wooProduct.on_sale ? Number(wooProduct.regular_price) : null,
    image: wooProduct.images?.[0]?.src || "",
    inStock: wooProduct.stock_status === 'instock',
    featured: wooProduct.featured,
    category: wooProduct.categories?.[0]?.name || "",
    // We'll use custom fields for badge and isBestSeller if available
    badge: wooProduct.meta_data?.find(m => m.key === 'badge')?.value || null,
    isBestSeller: isBestSeller
  };
}

export function transformWooProducts(wooProducts) {
  return wooProducts.map(transformWooProduct);
}
