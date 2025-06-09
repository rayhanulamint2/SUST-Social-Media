const {newEventCreation, findEvent, deleteEventByID, eventUpdate, findAllEvents} = require('./event.repository')    

const createEvent = async(req, res) => {
    try{
        const eventData = {
            creator: req.body.creator,
            title: req.body.title,
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            image: req.body.image || '',
            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags].filter(Boolean),
            isDepartmentPost: req.body.isDepartmentPost,
            department: req.body.department || '', // Ensure department is included
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            createdAt: new Date()
        };


        const newEvent = await newEventCreation(eventData);
        res.status(201).json({
            message: 'Event created successfully',
            event: {
                _id: newEvent._id,
                creator: newEvent.creator,
                title: newEvent.title,
                description: newEvent.description,
                image: newEvent.image,
                tags: newEvent.tags,
                isDepartmentPost: newEvent.isDepartmentPost,
                startDate: newEvent.startDate,
                endDate: newEvent.endDate,
                createdAt: newEvent.createdAt,
                department: newEvent.department || '' // Ensure department is included
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create event'
        });
    }
};

const deleteEvent = async(req, res) => {
    try {
        const event = await findEvent(req.params.id);
        console.log(event)
        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }
        deleteById = await deleteEventByID(req.params.id);
        res.status(200).json({
            message: 'Event deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete event'
        });
    }
};

const updateEvent = async(req, res) => {
    try {
        const event = await findEvent(req.params.id);
        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }
        // Update logic here
        // For example, updating content or tags
        const eventData = {
            creator: req.body.creator,
            title: req.body.title,
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            image: req.body.image || '',
            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags].filter(Boolean),
            isDepartmentPost: req.body.isDepartmentPost,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            comment: req.body.comment || [],
            // Ensure createdAt is not updated
            createdAt: event.createdAt,
            department: req.body.department || event.department // Ensure department is included
        };

        const updatedEvent = await eventUpdate(req.params.id, eventData);
        // event updated
        res.status(200).json({
            message: 'Event updated successfully',
            event: updatedEvent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update event'
        });
    }
};

const findingEvent = async(req, res) => {
    try {
        const event = await findEvent(req.params.id);
        if (!event) {
            return res.status(404).json({
                error: 'Event not found'
            });
        }
        res.status(200).json({
            event: event
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve event'
        });
    }
};
const findingAllEvents = async(req, res) => {
    try {
        const events = await findAllEvents();
        if (!events || events.length === 0) {
            return res.status(404).json({
                error: 'No events found'
            });
        }
        res.status(200).json({
            events: events
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve events'
        });
    }
};

module.exports = {createEvent, deleteEvent, updateEvent, findingEvent, findingAllEvents};