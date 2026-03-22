const Trip = require('../models/Trip');

const createTrip = async (req, res) => {
    const { destination, startDate, endDate, travelers, totalCost } = req.body;
    try {
        const trip = await Trip.create({
            user: req.user.id,
            destination,
            startDate,
            endDate,
            travelers,
            totalCost
        });
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createTrip, getTrips };
