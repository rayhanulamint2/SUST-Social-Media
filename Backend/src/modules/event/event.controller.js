const express = require('express');
const router = express.Router();
const {createEvent,deleteEvent, updateEvent, findingEvent, findingAllEvents, commentAdding, interested} = require('./event.service')

// Route to create a new event
router.post('/create', createEvent);
// Route to delete an event by ID
router.post('/delete/:id', deleteEvent);
// Route to update an event by ID
router.post('/update/:id', updateEvent);
// Route to find an event by ID
router.get('/:id', findingEvent);
// Route to find all events
router.get('/', findingAllEvents);

router.put('/addComment', commentAdding);

router.put('/interested', interested);



module.exports = router