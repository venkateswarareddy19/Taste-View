const express = require('express');
const router = express.Router();
const { createTrip, getTrips } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createTrip);
router.get('/', protect, getTrips);

module.exports = router;
