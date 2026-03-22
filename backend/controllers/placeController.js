const Place = require('../models/Place');

const getPlaces = async (req, res) => {
    try {
        const places = await Place.find({});
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const analyzeBudget = async (req, res) => {
    // Smart budget analysis mock logic
    const { budget, category } = req.body;
    try {
        let query = {};
        if (category && category !== 'All') query.category = category;
        const places = await Place.find(query).sort({ rating: -1 });
        
        // Filter by budget logically
        const recommended = places.filter(place => place.price <= budget);
        res.json(recommended);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getPlaces, analyzeBudget };
