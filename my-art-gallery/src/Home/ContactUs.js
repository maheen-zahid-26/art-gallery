import React from 'react';
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="background">
      <div className="container">
        <h2>Contact Us</h2>
        <form>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input type="text" id="company" name="company" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="reset" className="reset-button">Reset</button>
          </div>
        </form>
      </div>
      <div className="info-section">
        <h2 className='h'>Where to Find Us</h2>
        <img className="im" src="/map.jpg" alt="Map" />
        <div className="contact-info">
          <p>You'll find us at PRISMA GALLERY.</p>
          <p>ARFA Tower, Lahore-Kasur Road</p>
          <p>(042) 987654321</p>
          <p>info@prismagallery.pk</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
