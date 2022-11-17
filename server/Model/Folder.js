const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        required: true,
    },
    parentFolder: {
        type: String,
    },
}, { timestamps: true} )

const FolderModel = mongoose.model('Folder', FolderSchema)

module.exports = FolderModel