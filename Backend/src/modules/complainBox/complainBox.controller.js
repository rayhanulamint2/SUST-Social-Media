const express = require('express');
const router = express.Router();
const {createComplain,deleteComplain, updateComplain, findingComplain} = require('./complainBox.service')

// Route to create a new complain
router.post('/create', createComplain);
// Route to delete a complain by ID
router.post('/delete/:id', deleteComplain);
// Route to update a complain by ID
router.post('/update/:id', updateComplain);
// Route to find a complain by ID
router.get('/:id', findingComplain);



module.exports = router