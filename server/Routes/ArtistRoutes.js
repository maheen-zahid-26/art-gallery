const express = require("express");
const { registerArtist, loginArtist } = require("../Artist/ArtistRegistration");
const { ArtistMyAccount } = require("../Artist/ArtistAccount");
const { fetchArtworksByUsername } = require('../Artist/ArtistArtwork');
const { DeleteArtwork } = require('../Artist/DeleteArtwork');
const { logoutArtist } = require('../Artist/ArtistLogout');
const { ArtistChangePassword } = require('../Artist/ArtistChangePassword');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

const { addArtwork } = require('../Artist/AddWork');
const router = express.Router();

// Register artist route with file upload
router.post("/registerArtist", upload.single('photo'), async (req, res) => {
    try {
        const artistData = {
            ...req.body,
            photo: req.file ? req.file.path : null
        };
        const result = await registerArtist(artistData);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Login route
router.post("/loginArtist", async (req, res) => {
    try {
        const result = await loginArtist(req.body);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Add artwork route
router.post("/addArtwork", upload.single("picture"), addArtwork);

// Artist account route
router.get("/account", async (req, res) => {
    try {
        const result = await ArtistMyAccount(req.query);
        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Fetch artworks route
router.get("/artworks", async (req, res) => {
    try {
        const result = await fetchArtworksByUsername(req.query);
        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Delete artwork route
router.delete("/deleteArtworks", async (req, res) => {
    try {
        const result = await DeleteArtwork(req.query); 
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Logout artist route
router.delete("/logoutArtist", async (req, res) => {
    try {
        const result = await logoutArtist(req.query);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Change password route
router.post("/ArtistChangePassword", async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body; 
        const result = await ArtistChangePassword({ username, currentPassword, newPassword });
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;
