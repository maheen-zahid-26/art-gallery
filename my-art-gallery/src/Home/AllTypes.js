import React, { useState } from 'react';
import SprayPaintArt from './AllTypes/SprayPaintArt'; 
import TraditionalArt from './AllTypes/TraditionalArt';
import WesternArt from './AllTypes/WesternArt';
import PrintArt from './AllTypes/PrintArt';
import DigitalArt from './AllTypes/DigitalArt';
import WaterColorArt from './AllTypes/WaterColorArt';
import './AllTypes.css';

function AllTypes() {
  const [currentCategory, setCurrentCategory] = useState(''); 

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  
  const renderCategory = () => {
    switch (currentCategory) {
      case 'SprayPaintArt':
        return <SprayPaintArt />;
      case 'TraditionalArt':
        return <TraditionalArt />;
      case 'WesternArt':
        return <WesternArt />;
      case 'PrintArt':
        return <PrintArt />;
      case 'DigitalArt':
        return <DigitalArt />;
      case 'WaterColorArt':
        return <WaterColorArt />;
      default:
        return <p>Select a type to view its details.</p>;
    }
  };

  return (
    <div className="art-gallery">
      <header>
        <h1>ALL TYPES OF ART</h1>
      </header>

      <main>
        <section className="category-list" >
          <div className="category1" onClick={() => handleCategoryClick('SprayPaintArt')} >
            <img className="img2" src="/sprayPaintArt.jpg" alt="SprayPaintArt"/>
            <p>SPRAY PAINT ART</p>
          </div>
          <div className="category1" onClick={() => handleCategoryClick('TraditionalArt')}>
            <img className="img2" src="/traditionalArt.jpg" alt="TraditionalArt"/>
            <p>TRADITIONAL ART</p>
          </div>
          <div className="category1" onClick={() => handleCategoryClick('WesternArt')}>
            <img className="img2" src="/westernArt.jpg" alt="WesternArt"/>
            <p>WESTERN ART</p>
          </div>
          <div className="category1" onClick={() => handleCategoryClick('PrintArt')}>
            <img className="img2" src="/printArt.jpg" alt="PrintArt"/>
            <p>PRINT ART</p>
          </div>
          <div className="category1" onClick={() => handleCategoryClick('DigitalArt')}>
            <img className="img2" src="/digitalArt.jpg" alt="DigitalArt"/>
            <p>DIGITAL ART</p>
          </div>
          <div className="category1" onClick={() => handleCategoryClick('WaterColorArt')}>
            <img className="img2" src="/waterColorArt.jpg" alt="Water Color Art"/>
            <p>WATER COLOR ART</p>
          </div>
          
          
      
        </section>

        <section className="category-details">
          {renderCategory()}
        </section>
      </main>
    </div>
  );


}

export default AllTypes;