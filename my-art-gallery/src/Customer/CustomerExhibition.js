import React from 'react';
import './CustomerExhibition.css';

function CustomerExhibition({username}) {
  const handleParticipation1 = async () => {
    try {
      const response = await fetch('http://localhost:9000/admin/exhibition1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          exhibitionName: 'PAINTING EXHIBIT',
        }),
      });
      const result = await response.json();
      alert(result.message || 'Participation confirmed for Painting Exhibit!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleParticipation2 = async () => {
    try {
      const response = await fetch('http://localhost:9000/admin/exhibition2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          exhibitionName: 'ANNUAL ART EXHIBITION',
        }),
      });
      const result = await response.json();
      alert(result.message || 'Participation confirmed for Annual Art Exhibition!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleParticipation3 = async () => {
    try {
      const response = await fetch('http://localhost:9000/admin/exhibition3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          exhibitionName: 'ART EXHIBIT',
        }),
      });
      const result = await response.json();
      alert(result.message || 'Participation confirmed for Art Exhibition!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleParticipation4 = async () => {
    try {
      const response = await fetch('http://localhost:9000/admin/exhibition4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          exhibitionName: 'ART EXHIBITION',
        }),
      });
      const result = await response.json();
      alert(result.message || 'Participation confirmed for Art Exhibition!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='exhibitionPage1'>
      <h1 className='heading1'>CLICK THE BUTTON TO TAKE PART IN THE EXHIBITION</h1>
      <div className='exhibitionBackground1'>
        <div className="card-container1">
          <div className="card1">
            <div className="side1">
              <img className='image1' src="ex1.jpg" alt="Jimmy Eat World" />
            </div>
            <div className="side1 back1">
              <p className='paragraph1'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>PAINTING EXHIBIT</strong></p>
              <p>Date:<strong>21-23 APRIL 2025</strong></p>
              <p>Time:<strong>9AM-4PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>2000/-</strong></p>
            </div>
          </div>
          <div className="button-container">
            <button className='confirmButton' onClick={handleParticipation1}>Confirm Participation</button>
          </div>
        </div>

        <div className="card-container1">
          <div className="card1">
            <div className="side1">
              <img className='image1' src="ex2.jpg" alt="Middle Painting" />
            </div>
            <div className="side1 back1">
              <p className='paragraph1'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ANNUAL ART EXHIBITION</strong></p>
              <p>Date:<strong>15-20 DECEMBER 2024</strong></p>
              <p>Time:<strong>10AM-10PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>FREE!</strong></p>
            </div>
          </div>
          <div className="button-container">
            <button className='confirmButton' onClick={handleParticipation2}>Confirm Participation</button>
          </div>
        </div>

        <div className="card-container1">
          <div className="card1">
            <div className="side1">
              <img className='image1' src="ex3.jpg" alt="Middle Painting" />
            </div>
            <div className="side1 back1">
              <p className='paragraph1'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ART EXHIBIT</strong></p>
              <p>Date:<strong>11-30 NOVEMBER 2024</strong></p>
              <p>Time:<strong>11AM-6PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>3000/-</strong></p>
            </div>
          </div>
          <div className="button-container">
            <button className='confirmButton' onClick={handleParticipation3}>Confirm Participation</button>
          </div>
        </div>

        <div className="card-container1">
          <div className="card1">
            <div className="side1">
              <img className='image1' src="ex4.jpg" alt="Another Painting" />
            </div>
            <div className="side1 back1">
              <p className='paragraph1'><strong>EXHIBITION DETAILS</strong></p>
              <p>Name:<strong>ART EXHIBITION</strong></p>
              <p>Date:<strong>1-14 MAY 2024</strong></p>
              <p>Time:<strong>11AM-11PM</strong></p>
              <p>Held At:<strong>CITY ABC</strong></p>
              <p>Ticket Price:<strong>5000/-</strong></p>
            </div>
          </div>
          <div className="button-container">
            <button className='confirmButton' onClick={handleParticipation4}>Confirm Participation</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerExhibition;
