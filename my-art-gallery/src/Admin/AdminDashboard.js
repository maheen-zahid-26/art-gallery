import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminArtistDetails from './AdminArtistDetails';
import AdminExhibition from './AdminExhibition';
import AdminSales from './AdminSales';
import AdminCustomerDetails from './AdminCustomerDetails';
import Message from './message';

function AdminDashboard() {
  const [currentComponent, setCurrentComponent] = useState('');
  const navigate = useNavigate();

  const handleNavigation = (component) => {
    setCurrentComponent(component);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Message':
        return <Message />;
      case 'Home1':
        return <AdminHome />;
      case 'AdminHome':
        return <AdminHome />;
      case 'AdminExhibition':
        return <AdminExhibition />;
      case 'AdminSales':
        return <AdminSales />;
      case 'AdminArtistDetails':
        return <AdminArtistDetails />;
      case 'AdminCustomerDetails':
        return <AdminCustomerDetails />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="outer">
      <div className="App1">
        <h1 className="logo1">WELCOME TO ADMIN PORTAL</h1>
        <nav className="navbar1">
          <ul className="nav-links1">
            <li>
              <button className="b" onClick={() => navigate('/')}>
                Main Page
              </button>
            </li>
            <li>
              <button className="b" onClick={() => handleNavigation('AdminHome')}>
                Home
              </button>
            </li>
            <li>
              <button className="b" onClick={() => handleNavigation('AdminExhibition')}>
                Exhibition
              </button>
            </li>
            <li>
              <button className="b" onClick={() => handleNavigation('AdminCustomerDetails')}>
                Customer Details
              </button>
            </li>
            <li>
              <button className="b" onClick={() => handleNavigation('AdminArtistDetails')}>
                Artist Details
              </button>
            </li>
            <li>
              <button className="b" onClick={() => handleNavigation('AdminSales')}>
                Sales
              </button>
            </li>
          </ul>
        </nav>

        <div className="component-container1">{renderComponent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
