const express = require('express');
const router = express.Router();
const {createNotice,deleteNotice, updateNotice, findingNotice, findAllNotices} = require('./notice.service')

// Route to create a new notice
router.post('/create', createNotice);
// Route to delete a notice by ID
router.delete('/:id', deleteNotice);
// Route to update a notice by ID
router.post('/update/:id', updateNotice);
// Route to find a notice by ID
router.get('/:id', findingNotice);

router .get('/', findAllNotices);



module.exports = router