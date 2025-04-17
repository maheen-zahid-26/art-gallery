const express = require('express');
const mysql = require('mysql2'); 
const db = require("../dbConnections");
const dbConfig = require("../dbConfig");
const { createArtworkTable } = require("./ArtWorkTable"); 
const multer = require("multer");

createArtworkTable();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const addArtwork = async (req, res) => {
    const { title, category, type, artistName, price, artistId } = req.body;
    const picture = req.file;


    console.log("Received data:", { title, category, type, artistName, price, artistId, picture });


    if (!title || !category || !type || !artistName || !price || !artistId || !picture) {
        return res.status(400).json({ message: "All fields must be provided." });
    }

    let connection;

    try {

        connection = await db.getConnection(); 

    
        const query = "INSERT INTO artwork (title, category, type, artistName, price, artistId, picture) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [title, category, type, artistName, price, artistId, picture.path || null];
        
        console.log("Query values:", values);

        await connection.execute(query, values);

        res.status(201).json({ message: "Artwork added successfully!" });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Failed to add artwork." });
    } finally {
        if (connection) connection.release(); 
    }
};



module.exports = {
    addArtwork,
    upload 
};


