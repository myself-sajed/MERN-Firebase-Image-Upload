const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({

    selfDeclaration: { type: String, required: true },
    aadhar: { type: String, required: true },
    voter: { type: String, required: true },
    itr: { type: String },
    disability: { type: String },
    ration: { type: String },
    refApplication: { type: String, required: true },
    refVle: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('document', documentSchema)