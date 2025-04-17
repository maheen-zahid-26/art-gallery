import React from 'react';
import './App.css';
import Main from './Home/main';
import Home from './Home/Home';
import AboutProject from './Home/AboutProject';
import AllArts from './Home/AllArts';
import AllCategories from './Home/AllCategories';
import AllTypes from './Home/AllTypes';
import Login1 from './Home/Login1';
import LoginCustomer from './Home/LoginCustomer';
import LoginArtist from './Home/LoginArtist'; 
import LoginAdmin from './Home/LoginAdmin'; 
import Register1 from './Home/Register1';
import ContactUs from './Home/ContactUs';
import Exhibition from './Home/Exhibition';
import CustomerDashboard from './Customer/CustomerDashboard'; 
import ArtistDashboard from './Artist/ArtistDashboard'; 
import AdminDashboard from './Admin/AdminDashboard'; 
import RegisterCustomer from './Home/RegisterCustomer';
import RegisterArtist from './Home/RegisterArtist';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 

function AppContent() {
    const location = useLocation(); 


    const hideNavbar = location.pathname === "/dashboard" || 
                       location.pathname === "/dashboard-artist" || 
                       location.pathname === "/dashboard-admin";

    return (
        <div className="App">
            <h1 className="logo">PRISMA GALLERY</h1>
            
            {!hideNavbar && (
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/allarts">All Arts</a></li>
                        <li><a href="/allcategories">All Categories</a></li>
                        <li><a href="/alltypes">All Types</a></li>
                        <li><a href="/exhibition">Exhibition</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </nav>
            )}

            <div className="component-container">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<AboutProject />} />
                    <Route path="/allarts" element={<AllArts />} />
                    <Route path="/allcategories" element={<AllCategories />} />
                    <Route path="/alltypes" element={<AllTypes />} />
                    <Route path="/exhibition" element={<Exhibition />} />
                    <Route path="/login" element={<Login1 />} />
                    <Route path="/login-customer" element={<LoginCustomer />} />
                    <Route path="/login-artist" element={<LoginArtist />} />
                    <Route path="/login-admin" element={<LoginAdmin />} />
                    <Route path="/register" element={<Register1 />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/dashboard" element={<CustomerDashboard />} />
                    <Route path="/dashboard-artist" element={<ArtistDashboard />} />
                    <Route path="/dashboard-admin" element={<AdminDashboard />} />
                    <Route path="/register-customer" element={<RegisterCustomer />} />
                    <Route path="/register-artist" element={<RegisterArtist />} />
                </Routes>
            </div>

            <footer className="footer">
                <p>© Prisma Gallery</p>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
