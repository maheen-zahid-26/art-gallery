import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArtistHome from './ArtistHome';
import ArtistAddWork from './ArtistAddWork';
import ArtistDeleteWork from './ArtistDeleteWork';
import ArtistExhibition from './ArtistExhibition';
import ArtistChangePassword from './ArtistChangePassword';
import ArtistSale from './ArtistSale';
import ArtistLogout from './ArtistLogout';
import ArtistMyAccount from './ArtistMyAccount';
import Message from './message'; 
import './ArtistDashboard.css'

function ArtistDashboard() {
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

    const handleArtistLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('username'); 
        setIsLoggedOut(true); 
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
            case 'ArtistHome':
                return <ArtistHome />;
            case 'ArtistAddWork':
                return <ArtistAddWork />;
            case 'ArtistDeleteWork':
                return <ArtistDeleteWork username={username} />;
            case 'ArtistExhibition':
                return <ArtistExhibition username={username} />;
            case 'ArtistSale':
                return <ArtistSale  username={username} />;
            case 'ArtistMyAccount':
                return <ArtistMyAccount username={username} />; 
            case 'ArtistChangePassword':
                return <ArtistChangePassword
                username={username} 
                 onPasswordChangeSuccess={handlePasswordChangeSuccess} 
                 />;
            case 'ArtistLogout':
                return (
                    <ArtistLogout
                        username={username}
                        onConfirm={handleArtistLogout}  
                        onCancel={() => setCurrentComponent('')}
                    />
                );
            default:
                return <ArtistHome />;
        }
    };

    return (
        <div className='outer'>
            <div className="App1">
                <h1 className="logo1">WELCOME TO ARTIST PORTAL</h1>
                <nav className="navbar1">
                    <ul className="nav-links1">
                        <li>
                            <button className='b' onClick={() => navigate('/')} >Main Page</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistHome')} disabled={isLoggedOut || isPasswordChanged}>Home</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistAddWork')} disabled={isLoggedOut || isPasswordChanged}>Add Work</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistDeleteWork')} disabled={isLoggedOut || isPasswordChanged}>Delete Work</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistExhibition')} disabled={isLoggedOut || isPasswordChanged}>Exhibition</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistSale')} disabled={isLoggedOut || isPasswordChanged}>Sales</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistMyAccount')} disabled={isLoggedOut || isPasswordChanged}>My Account</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistChangePassword')} disabled={isLoggedOut || isPasswordChanged}>Change Password</button>
                        </li>
                        <li>
                            <button className='b' onClick={() => handleNavigation('ArtistLogout')} disabled={isLoggedOut || isPasswordChanged}>Logout</button>
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

export default ArtistDashboard;
