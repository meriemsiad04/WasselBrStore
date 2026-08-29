import './ReviewsPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { FaStar, FaQuoteLeft, FaPaperPlane, FaComments } from 'react-icons/fa';
import { useState } from 'react';

// Import screenshots from assets/reviews folder
import r1 from '../assets/reviews/r1.jpeg';
import r2 from '../assets/reviews/R2.jpeg';
import r3 from '../assets/reviews/R3.jpeg';
import r4 from '../assets/reviews/R4.jpeg';
import r5 from '../assets/reviews/R5.jpeg';

const reviews = [
  {
    id: 1,
    name: 'Meriem',
    initials: 'MR',
    rating: 5,
    text: 'بصح روعة! الخدمة كانت سريعة والمنتج خدم معايا بلا حتى مشكل. يعطيكم الصحة ❤️',
    date: '2 days ago',
    product: 'Netflix Subscription'
  },
  {
    id: 2,
    name: 'Sarah Ch',
    initials: 'SC',
    rating: 5,
    text: 'Fast and reliable. The ChatGPT Plus account works perfectly. Thank you!',
    date: '1 week ago',
    product: 'ChatGPT Plus'
  },
  {
    id: 3,
    name: 'Amel',
    initials: 'YK',
    rating: 4,
    text: ' ما شاء الله عليكم خدمة احترافية ورد سريع على الرسائل. أكيد نرجع نشري مرة أخرى .',
    date: '2 weeks ago',
    product: 'Spotify Premium'
  }
  
];

// Screenshots from assets/reviews folder
const screenshots = [
  { id: 1, title: 'Client Review 1', image: r1 },
  { id: 2, title: 'Client Review 2', image: r2 },
  { id: 3, title: 'Client Review 3', image: r3 },
  { id: 4, title: 'Client Review 4', image: r4 },
  { id: 5, title: 'Client Review 5', image: r5 }
];

function ReviewsPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text && rating > 0) {
      // Create WhatsApp message
      const stars = '⭐'.repeat(rating);
      const message = `
📝 *New Review Received!*

👤 Name: ${name}
${product ? `📦 Product: ${product}\n` : ''}
⭐ Rating: ${stars} (${rating}/5)

💬 Review:
${text}
      `.trim();

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/213793706511?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Show success message
      setSubmitted(true);
      setName('');
      setProduct('');
      setRating(0);
      setText('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="reviews-page">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">
            <span className="reviews-title-gradient">{t('reviewsPage.title')}</span>
          </h2>
          <p className="reviews-subtitle">{t('reviewsPage.subtitle')}</p>
        </div>

        {reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={review.id} className="review-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="review-quote-icon">
                  <FaQuoteLeft />
                </div>
                <p className="review-text">{review.text}</p>
                <div className="review-divider"></div>
                <div className="review-footer">
                  <div className="review-avatar">
                    {review.initials}
                  </div>
                  <div className="review-info">
                    <h3 className="review-name">{review.name}</h3>
                    <p className="review-product">{review.product}</p>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <p>{t('reviewsPage.noReviews')}</p>
          </div>
        )}

        {/* Screenshot Gallery */}
        <div className="screenshot-section">
          <div className="screenshot-header">
            <div className="screenshot-icon-wrapper">
              <FaComments className="screenshot-icon" />
            </div>
            <div>
              <h2 className="screenshot-title">{t('reviewsPage.clientDiscussions')}</h2>
              <p className="screenshot-subtitle">{t('reviewsPage.trustProof')}</p>
            </div>
          </div>

          <div className="screenshot-grid">
            {screenshots.map((screenshot, index) => (
              <div key={screenshot.id} className="screenshot-card" style={{ animationDelay: `${index * 0.1}s` }}>
                {screenshot.image ? (
                  <img 
                    src={screenshot.image} 
                    alt={screenshot.title} 
                    className="screenshot-image" 
                  />
                ) : (
                  <div className="screenshot-placeholder">
                    <div className="screenshot-placeholder-content">
                      <FaComments className="placeholder-icon" />
                      <p>{screenshot.title}</p>
                      <span className="placeholder-hint">Add your screenshot here</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="review-form-section">
          <h2 className="review-form-title">{t('reviewsPage.leaveReview')}</h2>
          <p className="review-form-subtitle">{t('reviewsPage.shareExperience')}</p>
          
          {submitted ? (
            <div className="review-form-success">
              <h3>{t('reviewsPage.thankYou')}</h3>
              <p>{t('reviewsPage.feedbackAppreciated')}</p>
            </div>
          ) : (
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="review-form-group">
                <label className="review-form-label">{t('reviewsPage.yourName')}</label>
                <input
                  type="text"
                  className="review-form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={t('reviewsPage.namePlaceholder')}
                />
              </div>

              <div className="review-form-group">
                <label className="review-form-label">{t('reviewsPage.productPurchased')}</label>
                <input
                  type="text"
                  className="review-form-input"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={t('reviewsPage.productPlaceholder')}
                />
              </div>

              <div className="review-form-group">
                <label className="review-form-label">{t('reviewsPage.rating')}</label>
                <div className="review-form-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="review-form-star"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <FaStar className={(hoverRating || rating) >= star ? 'star-filled' : 'star-empty'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="review-form-group">
                <label className="review-form-label">{t('reviewsPage.yourReview')}</label>
                <textarea
                  className="review-form-textarea"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  placeholder={t('reviewsPage.reviewPlaceholder')}
                  rows="4"
                />
              </div>

              <button type="submit" className="review-form-submit">
                <span>{t('reviewsPage.submitReview')}</span>
                <FaPaperPlane />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReviewsPage;