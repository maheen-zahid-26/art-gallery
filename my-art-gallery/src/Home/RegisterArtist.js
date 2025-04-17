import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Register.css';

const RegisterArtist = () =>  {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        email: '',
        dob: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        photo: null
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            const file = files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (file && validImageTypes.includes(file.type)) {
                setPreviewImage(URL.createObjectURL(file));
                setFormData({
                    ...formData,
                    [name]: file
                });
                setErrorMessage("");
            } else {
                setErrorMessage("Please select a valid image (JPEG, PNG, GIF).");
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
    
        for (const key in formData) {
            if (formData[key] === '') {
                setErrorMessage(`Please fill in the ${key.charAt(0).toUpperCase() + key.slice(1)} field.`);
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again.");
            return;
        }
        
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await fetch("http://localhost:9000/artists/registerArtist", {
                method: "POST",
                body: data
            });
    
            const result = await response.json();
            if (response.ok) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                setErrorMessage(result.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            email: '',
            dob: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            country: '',
            photo: null
        });
        setPreviewImage(null);
        setErrorMessage(''); 
    };

    return (
        <div className="background">
            <div className="registration-form-container">
                <h2>Artist Registration Form</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="registration-form" encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address1">Address Line 1</label>
                        <input type="text" name="address1" value={formData.address1} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address2">Address Line 2</label>
                        <input type="text" name="address2" value={formData.address2} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <select name="city" value={formData.city} onChange={handleChange} required>
                            <option value="">Select City</option>
                            <option value="city1">City 1</option>
                            <option value="city2">City 2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <select name="state" value={formData.state} onChange={handleChange} required>
                            <option value="">Select State</option>
                            <option value="state1">State 1</option>
                            <option value="state2">State 2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select name="country" value={formData.country} onChange={handleChange} required>
                            <option value="">Select Country</option>
                            <option value="country1">Country 1</option>
                            <option value="country2">Country 2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo</label>
                        <input type="file" name="photo" onChange={handleChange} />
                        {previewImage && <img src={previewImage} alt="Profile Preview" className="image-preview" />}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="reset" className="reset-button" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterArtist;
