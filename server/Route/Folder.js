const express = require('express');
const router = express.Router();

const FolderModel = require('../Model/Folder')

// Creating a new folder

router.post('/create', async(req, res) => {
    const newFolder = new FolderModel(req.body)
    try {
        const folder = await newFolder.save();
        res.status(200).json("Folder Created Successfully!")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Deleting a folder

router.delete('/delete', async(req, res) => {

    try {
        const folder = await FolderModel.findById(req.body)
        await folder.deleteOne();
        res.status(200).json("Folder Deleted Successfully!")
    } catch (error) {
        res.status(500).json(error)
    }
})


// Getting all folder

router.get('/all', async(req, res) => {
    try {
        const folder = await FolderModel.find()
        res.status(200).json(folder)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router