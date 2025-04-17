import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtsShopping from './ArtsShopping';
import Cart from './Cart';
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';
import CustomerExhibition from './CustomerExhibition'
import Home1 from './Home1';
import Logout from './Logout';
import Message from './message'; 



function CustomerDashboard() {
    const [currentComponent, setCurrentComponent] = useState('');
    const [isLoggedOut, setIsLoggedOut] = useState(false); 
    const [isPasswordChanged, setIsPasswordChanged] = useState(false); 
    const navigate = useNavigate(); 

    
    const username = localStorage.getItem('username');
    console.log('Artist ID from localStorage:', username);


    const handleNavigation = (component) => {
        if (!isLoggedOut && !isPasswordChanged) {
            setCurrentComponent(component);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setIsLoggedOut(true); 
        localStorage.removeItem('username'); 
        setCurrentComponent('Message'); 
    };

    const handlePasswordChangeSuccess = () => {
        setIsPasswordChanged(true); 
        setCurrentComponent('Message');
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 'Message':
                return <Message />;
            case 'Home1':
                return <Home1 />;
            case 'ArtsShopping':
                return <ArtsShopping />;
            case 'Cart':
                return <Cart />;
            case 'MyAccount':
                return <MyAccount  username={username} />;
            case 'CustomerExhibition':
                return <CustomerExhibition username={username} />;
            
            case 'ChangePassword':
                return <ChangePassword 
                username={username} 
                onPasswordChangeSuccess={handlePasswordChangeSuccess} 
            />
            
            case 'Logout':
                return (
                    <Logout
                        username={username}
                        onConfirm={handleLogout}  
                        onCancel={() => setCurrentComponent('')}
                    />
                );
            default:
                return <Home1 />;
        }
    };

    return (
        <div className='outer'>
            <div className="App1">
                <h1 className="logo1">WELCOME TO CUSTOMER PORTAL</h1>
                <nav className="navbar1">
                    <ul className="nav-links1">
                        <li>
                            <button className='b'
                                onClick={() => navigate('/')} 
                            >Main Page
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('Home1')}
                                disabled={isLoggedOut || isPasswordChanged}>Home
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('ArtsShopping')}
                                disabled={isLoggedOut || isPasswordChanged}>Arts Shopping
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('Cart')}
                                disabled={isLoggedOut || isPasswordChanged}>Cart
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('CustomerExhibition')}
                                disabled={isLoggedOut || isPasswordChanged}>Exhibition
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('MyAccount')}
                                disabled={isLoggedOut || isPasswordChanged}>My Account
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('ChangePassword')}
                                disabled={isLoggedOut || isPasswordChanged}>Change Password
                            </button>
                        </li>
                        <li>
                            <button className='b' 
                                onClick={() => handleNavigation('Logout')}
                                disabled={isLoggedOut || isPasswordChanged}>Logout
                            </button>
                        </li>
                    
                    </ul>
                </nav>

                <div className="component-container1">
                    {renderComponent()}
                </div>

                {isLoggedOut && <p className="logout-message">You have logged out successfully</p>}
            </div>
        </div>
    );
}

export default CustomerDashboard;
