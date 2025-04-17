import React, { useState } from "react";
import './ArtistAddWork.css';

const ArtistAddWork = () => {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        type: "",
        picture: null,
        artistName: "",
        price: "",
        artistId: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

            if (file && validImageTypes.includes(file.type)) {
                setPreviewImage(URL.createObjectURL(file));
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: file,
                }));
                setErrorMessage(""); 
            } else {
                setErrorMessage("Please select a valid image (JPEG, PNG, GIF).");
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

      
        for (const key in formData) {
            if (key !== "picture" && (!formData[key] || formData[key] === "")) { 
                setErrorMessage(`Please fill in the ${key} field.`);
                setIsSubmitting(false);
                return;
            }
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        console.log("Form data being submitted:", Array.from(data.entries()));

        try {
            const response = await fetch("http://localhost:9000/artists/addArtwork", {
                method: "POST",
                body: data,
            });

            if (response.ok) {
                alert("Art Work Added!");
                setMessage("Artwork added successfully!");
                setErrorMessage("");
                resetForm();
            } else {
                const result = await response.json();
                setErrorMessage(result.message || "Failed to add artwork.");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.error("Fetch error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            category: "",
            type: "",
            picture: null,
            artistName: "",
            price: "",
            artistId: "",
        });
        setPreviewImage(null);
        setErrorMessage("");
        setMessage("");
    };

    return (
        <div className="addwork">
            <div className="add-artwork-container">
                <h2 className="add-artwork-title">Add New Artwork</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {message && <p className="success-message">{message}</p>}
                <form className="add-artwork-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label htmlFor="title" className="add-artwork-label">Title:</label>
                        <input type="text" id="title" name="title" className="add-artwork-input" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="category" className="add-artwork-label">Category:</label>
                        <select id="category" name="category" className="add-artwork-select" value={formData.category} onChange={handleChange} required>
                            <option value="">Select Category</option>
                            <option value="painting">Painting</option>
                            <option value="sculpture">Sculpture</option>
                            <option value="culture">Culture</option>
                            <option value="photograph">Photograph</option>
                            <option value="oilpainting">Oil Painting</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="type" className="add-artwork-label">Type:</label>
                        <select id="type" name="type" className="add-artwork-select" value={formData.type} onChange={handleChange} required>
                            <option value="">Select Type</option>
                            <option value="spray paint art">Spray Paint Art</option>
                            <option value="traditional art">Traditional Art</option>
                            <option value="western art">Western Art</option>
                            <option value="print art">Print Art</option>
                            <option value="digital art">Digital Art</option>
                            <option value="water color art">Water Color Art</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="artistName" className="add-artwork-label">Artist Name:</label>
                        <input type="text" id="artistName" name="artistName" className="add-artwork-input" value={formData.artistName} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="price" className="add-artwork-label">Price:</label>
                        <input type="number" id="price" name="price" className="add-artwork-input" value={formData.price} onChange={handleChange} required step="0.01" />
                    </div>
                    <div>
                        <label htmlFor="artistId" className="add-artwork-label">Artist ID:</label>
                        <input type="text" id="artistId" name="artistId" className="add-artwork-input" value={formData.artistId} onChange={handleChange} required />
                    </div>
                    <div className="add-picture-input">
                        <label htmlFor="picture" className="add-artwork-label">Add Picture:</label>
                        <input type="file" id="picture" name="picture" className="add-artwork-file" onChange={handleChange} required />
                        {previewImage && <img src={previewImage} alt="Artwork Preview" className="image-preview" />}
                    </div>
                    <button type="submit" className="add-artwork-button" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : "Add Artwork"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ArtistAddWork;


