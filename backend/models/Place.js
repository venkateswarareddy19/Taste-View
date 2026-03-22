const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Restaurants', 'Street Food', 'Cafes', 'Malls', 'Heritage', 'Monuments', 'Temples', 'Festivals', 'Destination']
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Place', PlaceSchema);
