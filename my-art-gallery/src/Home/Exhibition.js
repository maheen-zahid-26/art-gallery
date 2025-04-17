import React from 'react';
import './Exhibition.css';

function Exhibition() {
  return (
    <div className='exhibitionPage'>
      <h1 className='heading'>JOIN US AT PRISMA GALLERY'S EXCLUSIVE EXHIBITIONS,
         WHERE ART COMES TO LIFE—EXPLORE BREATHTAKING MASTERPIECES AND UNFORGETTABLE EXPERIENCES!</h1>
      <div className='exhibitionBackground'>
        <div className="card-container">
          <div className="card">
            <div className="side">
              <img className='image' src="ex1.jpg" alt="Jimmy Eat World"></img>
            </div>
            <div className="side back">
              <p className='paragraph'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>PAINTING EXHIBIT</strong></p>
              <p>Date:<strong>21-23 APRIL 2025</strong></p>
              <p>Time:<strong>9AM-4PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>2000/-</strong></p>
            </div>
          </div>
        </div>
        
        <div className="card-container">
          <div className="card">
            <div className="side">
              <img className='image' src="ex2.jpg" alt="Middle Painting"></img>
            </div>
            <div className="side back">
              <p className='paragraph'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ANNUAL ART EXHIBITION</strong></p>
              <p>Date:<strong>15-20 DECEMBER 2024</strong></p>
              <p>Time:<strong>10AM-10PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>FREE!</strong></p>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="side">
              <img className='image' src="ex3.jpg" alt="Middle Painting"></img>
            </div>
            <div className="side back">
              <p className='paragraph'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ART EXHIBITION</strong></p>
              <p>Date:<strong>11-30 NOVEMBER 2024</strong></p>
              <p>Time:<strong>11AM-6PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>3000/-</strong></p>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="side">
              <img className='image' src="ex4.jpg" alt="Another Painting"></img>
            </div>
            <div className="side back">
              <p className='paragraph'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ART EXHIBITION</strong></p>
              <p>Date:<strong>1-14 MAY 2024</strong></p>
              <p>Time:<strong>11AM-11PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>5000/-</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exhibition;
