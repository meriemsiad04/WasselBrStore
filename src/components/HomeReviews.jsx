import './HomeReviews.css';
import { useLanguage } from '../contexts/LanguageContext';
import { FaStar, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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

function HomeReviews() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="home-reviews-wrapper">
      <div className="home-reviews">
        <div className="home-reviews-header">
          <h2 className="home-reviews-title">
            <span className="home-reviews-title-gradient">What People Say</span>
          </h2>
          <button 
            className="home-reviews-see-all"
            onClick={() => navigate('/reviews')}
          >
            See all <FaArrowRight />
          </button>
        </div>
        <div className="home-reviews-grid">
          {reviews.map((review, index) => (
            <div key={review.id} className="home-review-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="home-review-quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="home-review-text">{review.text}</p>
              <div className="home-review-divider"></div>
              <div className="home-review-footer">
                <div className="home-review-avatar">
                  {review.initials}
                </div>
                <div className="home-review-info">
                  <h3 className="home-review-name">{review.name}</h3>
                  <p className="home-review-product">{review.product}</p>
                </div>
                <div className="home-review-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? 'home-star-filled' : 'home-star-empty'} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeReviews;