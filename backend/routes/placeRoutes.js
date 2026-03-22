const express = require('express');
const router = express.Router();
const { getPlaces, analyzeBudget } = require('../controllers/placeController');

router.get('/', getPlaces);
router.post('/analyze', analyzeBudget);

module.exports = router;
