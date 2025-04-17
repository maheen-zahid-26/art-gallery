const express = require('express');
const router = express.Router();
const { getAllArtworks } = require('../MainPage/AllArts');
const {getAllArtworksByCategory} = require('../MainPage/AllCategories');
const { getAllArtworksByTypes } = require('../MainPage/AllTypes');


// Route to fetch all artworks
router.get('/getArtworks', async (req, res) => {
  console.log('Fetching artworks...');
  try {
    const result = await getAllArtworks();
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(error.status || 500).json({ error: error.message || 'Failed to fetch artworks' });
  }
});


// Route to fetch artworks by category
router.get('/getArtworksByCategory', async (req, res) => {
    const category = req.query.Category; 
  
    console.log("Category received in request:", category);
  
    if (!category) {
      console.error("No category provided in the request");
      return res.status(400).json({ error: 'Category is required' });
    }
  
    try {
      const result = await getAllArtworksByCategory(category);
      console.log("Data fetched from database:", result.data);
      res.status(result.status).json(result.data);
    } catch (error) {
      console.error('Error fetching artworks by category:', error);
      res.status(error.status || 500).json({ error: error.message || 'Failed to fetch artworks by category' });
    }
  });
  

// Route to fetch artworks by type
router.get('/getArtworksByType', async (req, res) => {
  const type = req.query.Type; 

  console.log("Type received in request:", type);

  if (!type) {
    console.error("No type provided in the request");
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    const result = await getAllArtworksByTypes(type);
    console.log("Data fetched from database:", result.data);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error('Error fetching artworks by type:', error);
    res.status(error.status || 500).json({ error: error.message || 'Failed to fetch artworks by type' });
  }
});


module.exports = router;

