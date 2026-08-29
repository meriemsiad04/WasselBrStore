import './CategorySelector.css';
import { FaTh } from 'react-icons/fa'; // "All" icon
import { useLanguage } from '../contexts/LanguageContext';

function CategorySelector({ categoryObjects, selectedCategory, onCategoryChange }) {
  const { t, lang } = useLanguage();
  
  // Function to get translated category name
  const getTranslatedCategoryName = (cat) => {
    if (cat === 'All') return t('categorySelector.all');
    const categoryKeys = {
      'Watch': 'watch',
      'Work': 'work',
      'Joy': 'joy',
      'Music': 'music',
      'AI Subscriptions': 'aiSubscriptions',
      'Games': 'games',
    };
    return t(`categories.${categoryKeys[cat]}`) || cat;
  };
  
  // Display "All" as the first option with an icon
  const allCategories = [
    { name: 'All', icon: FaTh },
    ...categoryObjects
  ];
  
  return (
    <div className="category-selector">
      <h3 className="category-selector-title">{t('categorySelector.title')}</h3>
      <div className="category-cards">
        {allCategories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.name}
              className={`category-card ${selectedCategory === category.name ? 'category-card-active' : ''}`}
              onClick={() => onCategoryChange(category.name)}
            >
              <Icon className="category-card-icon" />
              <span className="category-card-name">{getTranslatedCategoryName(category.name)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelector;