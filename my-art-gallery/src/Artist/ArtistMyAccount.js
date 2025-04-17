import React, { useState, useEffect } from "react";
import './ArtistMyAccount.css';

const ArtistMyAccount = ({ username }) => {
    const [error, setError] = useState("");
    const [artistDetails, setArtistDetails] = useState(null);
    const [artworks, setArtworks] = useState([]);


    useEffect(() => {
        const fetchArtistDetails = async () => {
            if (!username) return; 
            try {
                const response = await fetch(`http://localhost:9000/artists/account?username=${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    setArtistDetails(result.data); 
                    console.log("Artist details fetched!");
                } else {
                    setError(result.message || "No Artist Found");
                }
            } catch (err) {
                setError("An error occurred while fetching the artist details.");
                console.error("Fetch artworks error:", err);
            }
        };

        fetchArtistDetails(); 
    }, [username]);

    // Effect for fetching artworks
    useEffect(() => {
        const fetchArtworks = async () => {
            if (!username) return;
            try {
                const response = await fetch(`http://localhost:9000/artists/artworks?username=${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    setArtworks(result.data); 
                    console.log("Artworks fetched successfully!",result.data);
                } else {
                    setError(result.message || "No Artworks Found");
                }
            } catch (err) {
                setError("An error occurred while fetching artworks.");
                console.error(err);
            }
        };

        fetchArtworks();
    }, [username]);
    return (
        <div className="background">
            <div className="my-account-container">
                <h2 className="h2">My Account</h2>
                {error && <p className="error-message">{error}</p>}

                {artistDetails && (
                    <div className="profile-section">
                        <div className="profile-text">
                            <p><strong>Username:</strong> {artistDetails.username}</p>
                            <p><strong>Name:</strong> {artistDetails.name}</p>
                            <p><strong>Email:</strong> {artistDetails.email}</p>
                            <p><strong>Mobile:</strong> {artistDetails.mobile}</p>
                            <p><strong>Date of Birth:</strong> {artistDetails.dob}</p>
                            <p><strong>Address Line 1:</strong> {artistDetails.address1}</p>
                            <p><strong>Address Line 2:</strong> {artistDetails.address2}</p>
                            <p><strong>City:</strong> {artistDetails.city}</p>
                            <p><strong>State:</strong> {artistDetails.state}</p>
                            <p><strong>Country:</strong> {artistDetails.country}</p>
                        </div>
                        <img src={`http://localhost:9000/${artistDetails.photo}`} alt="Profile" className="imgg" />
                    </div>
                    
                )}
            

                <h3>My Artworks</h3>
                {artworks.length > 0 ? (
                <div className="artworks-grid">
                {artworks.map((artwork) => (
                    <div key={artwork.id} className="artwork-card">
                        <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.title} className="artwork-image" />
                        <h4>{artwork.Title}</h4>
                        <p><strong>Category:</strong> {artwork.Category}</p>
                        <p><strong>Type:</strong> {artwork.Type}</p>
                        <p><strong>Price:</strong> Rs.{artwork.Price}</p>
                    </div>
                ))}
            </div>
            
            ) : (
                <p>No artworks found.</p>
            )}

            </div>
        </div>
    );
};

export default ArtistMyAccount;
