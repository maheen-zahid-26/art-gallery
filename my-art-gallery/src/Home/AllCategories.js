import React, { useState } from 'react';
import Painting from './AllCategories/Painting'; 
import Sculpture from './AllCategories/Sculpture';
import Culture from './AllCategories/Culture';
import Photograph from './AllCategories/Photograph';
import OilPainting from './AllCategories/OilPainting';
import './AllCategories.css';

function AllCategories() {
  const [currentCategory, setCurrentCategory] = useState(''); 

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  
  const renderCategory = () => {
    switch (currentCategory) {
      case 'Painting':
        return <Painting />;
      case 'Sculpture':
        return <Sculpture />;
      case 'Culture':
        return <Culture />;
      case 'Photograph':
        return <Photograph />;
      case 'OilPainting':
        return <OilPainting />;
      default:
        return <p>Select a category to view its details.</p>;
    }
  };

  return (
    <div className="art-gallery-page">
      <header>
        <h1>ALL CATEGORIES OF ART</h1>
      </header>

      <main>
        <section className="category-list" >
          <div className="category" onClick={() => handleCategoryClick('Painting')} >
            <img className="img1" src="/painting.jpg" alt="Painting" />
            <p>PAINTING</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Sculpture')}>
            <img className="img1"  src="/sculpture.jpg" alt="Sculpture" />
            <p>SCULPTURE</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Culture')}>
            <img className="img1" src="/culture.jpg" alt="Culture" />
            <p>CULTURE</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Photograph')}>
            <img className="img1"  src="/photograph.jpg" alt="Photograph" />
            <p>PHOTOGRAPH</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('OilPainting')}>
            <img className="img1"  src="/oilpainting.jpg" alt="Oil Painting" />
            <p>OIL PAINTING</p>
          </div>
        </section>

        <section className="category-details">
          {renderCategory()}
        </section>
      </main>
    </div>
  );
}

export default AllCategories;
