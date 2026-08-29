import './CartPage.css';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { formatPrice } from '../data/translations';
import baridiLogo from '../assets/logo/baridi.png';

const PAYMENT_METHODS = ['baridi', 'ccp', 'flexy'];
const FLEXY_FEE = 0.2;

function CartPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { t, lang } = useLanguage();
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('baridi');

  const flexyFee = Math.round(cartTotal * FLEXY_FEE);
  const finalTotal = paymentMethod === 'flexy' ? cartTotal + flexyFee : cartTotal;

  const paymentLabel = (method) => {
    if (method === 'baridi') return t('payments.baridiMob');
    if (method === 'ccp') return t('payments.ccp');
    if (method === 'flexy') return `${t('payments.flexy')} (+20%)`;
    return method;
  };

  const orderLines = useMemo(
    () =>
      cartItems.map(
        (item) =>
          `- ${item.title} | ${t('cartPage.itemQuantity')}: ${item.quantity} | ${t('cartPage.total')}: ${formatPrice(
            item.price * item.quantity,
            lang
          )} ${t('productCard.price')}`
      ),
    [cartItems, lang, t]
  );

  const handleCheckout = () => {
    const trimmedName = customerName.trim();
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedName || !trimmedPhone) {
      setFormError(t('cartPage.requiredFields'));
      return;
    }

    if (!paymentMethod || !PAYMENT_METHODS.includes(paymentMethod)) {
      setFormError(t('cartPage.paymentMethodRequired'));
      return;
    }

    setFormError('');
    const paymentBreakdown = paymentMethod === 'flexy'
      ? `${t('cartPage.subtotal')}: ${formatPrice(cartTotal, lang)} ${t('productCard.price')}\n${t('cartPage.flexyFee')}: ${formatPrice(flexyFee, lang)} ${t('productCard.price')}\n`
      : `${t('cartPage.subtotal')}: ${formatPrice(cartTotal, lang)} ${t('productCard.price')}\n`;

    const message = encodeURIComponent(
      `${t('cartPage.orderMessage')}\n${t('cartPage.customerName')}: ${trimmedName}\n${t('cartPage.phoneNumber')}: ${trimmedPhone}\n\n${orderLines.join(
        '\n'
      )}\n\n${paymentBreakdown}${t('cartPage.orderTotal')}: ${formatPrice(finalTotal, lang)} ${t('productCard.price')}\n${t('cartPage.paymentMethod')}: ${paymentLabel(paymentMethod)}`
    );
    window.open(`https://wa.me/213793706511?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">{t('cartPage.title')}</h1>
          {cartItems.length > 0 && (
            <button type="button" className="cart-clear-btn" onClick={clearCart}>
              {t('cartPage.clearCart')}
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>{t('cartPage.empty')}</p>
            <Link to="/shop" className="cart-link-btn">
              {t('cartPage.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <h2 className="cart-item-title">{item.title}</h2>
                      <button
                        type="button"
                        className="cart-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        {t('cartPage.remove')}
                      </button>
                    </div>

                    <div className="cart-item-price">
                      {formatPrice(item.price, lang)} {t('productCard.price')}
                    </div>

                    <div className="cart-item-controls">
                      <label className="cart-item-label" htmlFor={`cart-qty-${item.id}`}>
                        {t('cartPage.itemQuantity')}
                      </label>
                      <div className="cart-quantity-controls">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          id={`cart-qty-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(event) =>
                            updateCartItemQuantity(item.id, Number(event.target.value) || 1)
                          }
                          className="cart-qty-input"
                        />
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      {t('cartPage.total')}: {formatPrice(item.price * item.quantity, lang)}{' '}
                      {t('productCard.price')}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <div className="cart-form-grid">
                <div className="cart-field">
                  <label htmlFor="cart-name" className="cart-label">
                    {t('cartPage.customerName')}
                  </label>
                  <input
                    id="cart-name"
                    type="text"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    className="cart-text-input"
                    placeholder={t('cartPage.customerNamePlaceholder')}
                  />
                </div>

                <div className="cart-field">
                  <label htmlFor="cart-phone" className="cart-label">
                    {t('cartPage.phoneNumber')}
                  </label>
                  <input
                    id="cart-phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="cart-text-input"
                    placeholder={t('cartPage.phoneNumberPlaceholder')}
                  />
                </div>
              </div>

              <div className="payment-methods-section">
                <label className="cart-label">
                  {t('cartPage.paymentMethod')}
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

              <div className="cart-summary-total">
                <span>{t('cartPage.subtotal')}</span>
                <span>
                  {formatPrice(cartTotal, lang)} {t('productCard.price')}
                </span>
              </div>

              {paymentMethod === 'flexy' && (
                <div className="cart-summary-total flexy-fee-row">
                  <span>{t('cartPage.flexyFee')}</span>
                  <span>
                    +{formatPrice(flexyFee, lang)} {t('productCard.price')}
                  </span>
                </div>
              )}

              <div className="cart-summary-total final-total-row">
                <span>{t('cartPage.orderTotal')}</span>
                <strong>
                  {formatPrice(finalTotal, lang)} {t('productCard.price')}
                </strong>
              </div>

              {formError && <p className="cart-error">{formError}</p>}

              <button type="button" className="cart-checkout-btn" onClick={handleCheckout}>
                {t('cartPage.checkout')}
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default CartPage;
