const express = require("express");
const dbConfig = require("../dbConnections");
const { registerCustomer, loginCustomer } = require("../Customer/CustomerRegistration");
const { CustomerMyAccount } = require('../Customer/CustomerAccount');
const { logoutCustomer } = require('../Customer/CustomerLogout');
const { CustomerChangePassword } = require('../Customer/CustomerChangePassword');
const { getArtwork } = require('../Customer/GetArtwork')
const { insertSoldItems } = require("../Customer/artworkCheckout")
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post("/register", upload.single('photo'), async (req, res) => {
    try {
        const customerData = {
            ...req.body,
            photo: req.file ? req.file.path : null 
        };
        const result = await registerCustomer(customerData);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const result = await loginCustomer(req.body);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get("/artworks", async (req, res) => {
    try {
        const result = await fetchArtworksByUsername(req.query);
        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get("/account", async (req, res) => {
    try {
        const result = await CustomerMyAccount(req.query);
        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.delete("/logoutCustomer", async (req, res) => {
    try {
        const result = await logoutCustomer(req.query);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

// Change password route
router.post("/CustomerChangePassword", async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body; 
        const result = await CustomerChangePassword({ username, currentPassword, newPassword });
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

router.get('/getArtworks', async (req, res) => {
    console.log('Fetching artworks...');
    try {
      const result = await getArtwork();
      res.status(result.status).json(result.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      res.status(error.status || 500).json({ error: error.message || 'Failed to fetch artworks' });
    }
  });

  

  router.post('/checkout', async (req, res) => {
    const soldItems = req.body; 
  
    try {
      const result = await insertSoldItems(soldItems); 
      res.status(result.status).send({ message: result.message });
    } catch (error) {
      console.error('Error storing sold items:', error);
      res.status(error.status || 500).send({ message: error.message || 'Failed to store items. Please try again.' });
    }
  });

module.exports = router;
