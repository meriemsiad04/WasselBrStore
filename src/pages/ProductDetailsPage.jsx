import './ProductDetailsPage.css';
import { useMemo, useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../api/product';
import { formatPrice } from '../data/translations';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import DOMPurify from 'dompurify';
import baridiLogo from '../assets/logo/baridi.png';

const PAYMENT_METHODS = ['baridi', 'ccp', 'flexy'];
const FLEXY_FEE = 0.2;

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('baridi');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const conditions = useMemo(
    () => [
      t('productPage.conditionOne'),
      t('productPage.conditionTwo'),
      t('productPage.conditionThree')
    ],
    [t]
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const subtotal = product.price * quantity;
  const flexyFee = Math.round(subtotal * FLEXY_FEE);
  const finalTotal = paymentMethod === 'flexy' ? subtotal + flexyFee : subtotal;

  const updateQuantity = (value) => {
    const nextValue = Number(value);
    if (Number.isNaN(nextValue)) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.max(1, nextValue));
  };

  const paymentLabel = (method) => {
    if (method === 'baridi') return t('payments.baridiMob');
    if (method === 'ccp') return t('payments.ccp');
    if (method === 'flexy') return `${t('payments.flexy')} (+20%)`;
    return method;
  };

  const handleBuyNow = () => {
    const trimmedName = customerName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName || !trimmedPhone) {
      setFormError(t('productPage.requiredFields'));
      return;
    }

    if (!paymentMethod || !PAYMENT_METHODS.includes(paymentMethod)) {
      setFormError(t('productPage.paymentMethodRequired'));
      return;
    }

    setFormError('');
    const paymentInfo = paymentMethod === 'flexy'
      ? `${t('productPage.subtotal')}: ${formatPrice(subtotal, lang)} ${t('productCard.price')}\n${t('productPage.flexyFee')}: ${formatPrice(flexyFee, lang)} ${t('productCard.price')}\n`
      : `${t('productPage.subtotal')}: ${formatPrice(subtotal, lang)} ${t('productCard.price')}\n`;

    const message = encodeURIComponent(
      `${t('productPage.whatsappMessage')} ${product.title}\n${t('productPage.customerName')}: ${trimmedName}\n${t('productPage.phoneNumber')}: ${trimmedPhone}\n${t('productPage.quantity')}: ${quantity}\n${paymentInfo}${t('productPage.total')}: ${formatPrice(finalTotal, lang)} ${t('productCard.price')}\n${t('productPage.paymentMethod')}: ${paymentLabel(paymentMethod)}`
    );
    window.open(`https://wa.me/213793706511?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <section className="product-details-page">
      <div className="product-details-container">
        <Link to="/shop" className="product-details-back">
          {t('productPage.backToShop')}
        </Link>

        <div className="product-details-card">
          <div className="product-details-media">
            <img
              src={product.image}
              alt={product.title}
              className="product-details-image"
            />
          </div>

          <div className="product-details-content">
            {product.badge && (
              <span className="product-details-badge">{product.badge}</span>
            )}

            <h1 className="product-details-title">{product.title}</h1>

            <div className="product-details-price-row">
              <span className="product-details-price">
                {formatPrice(product.price, lang)} {t('productCard.price')}
              </span>
              {product.oldPrice && (
                <span className="product-details-old-price">
                  {formatPrice(product.oldPrice, lang)} {t('productCard.price')}
                </span>
              )}
            </div>

            <div className="product-details-section">
              <h2 className="product-details-heading">{t('productPage.description')}</h2>
              <div 
                className="product-details-text" 
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} 
              />
            </div>

            <div className="product-details-section">
              <h2 className="product-details-heading">{t('productPage.conditions')}</h2>
              <ul className="product-details-conditions">
                {conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
            </div>

            <div className="product-details-purchase">
              <div className="product-details-form-grid">
                <div className="product-details-field">
                  <label htmlFor="customer-name" className="product-details-label">
                    {t('productPage.customerName')}
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="product-details-text-input"
                    placeholder={t('productPage.customerNamePlaceholder')}
                  />
                </div>

                <div className="product-details-field">
                  <label htmlFor="phone-number" className="product-details-label">
                    {t('productPage.phoneNumber')}
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="product-details-text-input"
                    placeholder={t('productPage.phoneNumberPlaceholder')}
                  />
                </div>
              </div>

              <div className="product-details-quantity">
                <label htmlFor="quantity" className="product-details-label">
                  {t('productPage.quantity')}
                </label>
                <div className="product-details-quantity-controls">
                  <button
                    type="button"
                    className="product-details-quantity-btn"
                    onClick={() => updateQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => updateQuantity(event.target.value)}
                    className="product-details-input"
                  />
                  <button
                    type="button"
                    className="product-details-quantity-btn"
                    onClick={() => updateQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="payment-methods-section">
                <label className="product-details-label">
                  {t('productPage.paymentMethod')}
                </label>
                <div className="payment-methods-grid">
                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'baridi' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('baridi')}
                  >
                    <div className="payment-method-icon">
                      <img src={baridiLogo} alt="Baridi Mob" />
                    </div>
                    <div className="payment-method-name">{t('payments.baridiMob')}</div>
                  </button>

                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'ccp' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('ccp')}
                  >
                    <div className="payment-method-icon ccp-icon">
                      <span className="ccp-text">CCP</span>
                    </div>
                    <div className="payment-method-name">{t('payments.ccp')}</div>
                  </button>

                  <button
                    type="button"
                    className={`payment-method-card ${paymentMethod === 'flexy' ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod('flexy')}
                  >
                    <div className="payment-method-icon flexy-icon">
                      <span className="flexy-text">%</span>
                    </div>
                    <div className="payment-method-name">{t('payments.flexy')}</div>
                    <div className="payment-method-tag">+20%</div>
                  </button>
                </div>
              </div>

              <div className="product-details-total">
                <span>{t('productPage.subtotal')}</span>
                <span>
                  {formatPrice(subtotal, lang)} {t('productCard.price')}
                </span>
              </div>

              {paymentMethod === 'flexy' && (
                <div className="product-details-total flexy-fee-row">
                  <span>{t('productPage.flexyFee')}</span>
                  <span>
                    +{formatPrice(flexyFee, lang)} {t('productCard.price')}
                  </span>
                </div>
              )}

              <div className="product-details-total final-total-row">
                <span>{t('productPage.total')}</span>
                <strong>
                  {formatPrice(finalTotal, lang)} {t('productCard.price')}
                </strong>
              </div>

              {formError && <p className="product-details-error">{formError}</p>}

              <div className="product-details-actions">
                <button
                  type="button"
                  className="product-details-buy-btn"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  {product.inStock ? t('productPage.buyNow') : t('productPage.outOfStock')}
                </button>
                <button
                  type="button"
                  className="product-details-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {t('productPage.addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
