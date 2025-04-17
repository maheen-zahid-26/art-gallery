const express = require("express");
const dbConfig = require("../dbConnections");
const { CustomerDetails } = require("../Admin/CustomerDetails");
const { ArtistDetails } = require("../Admin/ArtistDetails");
const { participateInExhibition } = require("../Admin/ExhibitionParticipationCustomer")
const { participateInExhibitionArtist } = require("../Admin/ExhibitionParticipationArtist")
const { ExhibitionDetails } = require("../Admin/ExhibitionDetails")
const { Sales } = require("../Admin/Sales")


const router = express.Router();


    router.get("/customersDetails", async (req, res) => {
        try {
            const result = await CustomerDetails(req.query);
            res.status(result.status).json({ message: result.message, data: result.data });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
        });

    router.get("/artistsDetails", async (req, res) => {
        try {
            const result = await ArtistDetails(req.query);
            res.status(result.status).json({ message: result.message, data: result.data });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
        });

    // Route to handle participation for "PAINTING EXHIBIT"
    router.post("/exhibition1", async (req, res) => {
    const { username, exhibitionName } = req.body;
    
    try {
      const result = await participateInExhibition(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error handling participation request for PAINTING EXHIBIT:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  // Route to handle participation for "ANNUAL ART EXHIBITION"
  router.post("/exhibition2", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibition(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error handling participation request for ANNUAL ART EXHIBITION:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  // Route to handle participation for "ART EXHIBIT" 
  router.post("/exhibition3", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibition(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error handling participation request for ART EXHIBIT:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });
  
  // Route to handle participation for "ART EXHIBITION"
  router.post("/exhibition4", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibition(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error handling participation request for ART EXHIBITION:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });

  //artist exhibitions
  router.post("/ex1", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibitionArtist(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error handling participation request for PAINTING EXHIBIT:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });

  router.post("/ex2", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibitionArtist(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error handling participation request for ANNUAL ART EXHIBITION:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });

  router.post("/ex3", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibitionArtist(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error handling participation request for ART EXHIBIT:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });

  router.post("/ex4", async (req, res) => {
    const { username, exhibitionName } = req.body;
  
    try {
      const result = await participateInExhibitionArtist(exhibitionName, username);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error handling participation request for ART EXHIBITION:", error);
      res.status(error.status || 500).json({ message: error.message });
    }
  });


  //exhibition details
  router.get("/exhibitionDetails", async (req, res) => {
    const exhibitionName = req.query.name;

    if (!exhibitionName) {
        return res.status(400).json({ error: "Exhibition name is required" });
    }

    try {
        const result = await ExhibitionDetails(exhibitionName);
        res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
        console.error("Error fetching exhibition details:", error);
        res.status(error.status || 500).json({ message: error.message });
    }
});


router.get("/soldItems", async (req, res) => {
  try {
      const result = await Sales(req.query);
      res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
  }
  });




    module.exports = router;
