const express = require('express');
const router = express.Router();
const processmileage = require('../controller/processmileage.js');

router.get('/max', processmileage.getmax);
router.post('/calculate', processmileage.calculate_mileage);
router.get('/getlist', processmileage.getlist);
//router.get('/:id', processmileage.get_details);
router.put('/:id/update', processmileage.product_update);
router.delete('/:id/delete', processmileage.product_delete);

module.exports = router;


