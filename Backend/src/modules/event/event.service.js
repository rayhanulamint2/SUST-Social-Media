const {newEventCreation, findEvent, deleteEventByID, eventUpdate, findAllEvents, addComment, addInterested} = require('./event.repository')    

const createEvent = async(req, res) => {
    try{
        const eventData = {
            creator: req.body.creator,
            title: req.body.title,
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            comment: req.body.comment || [], // Ensure comment is included
            image: req.body.image || '',
            tags: Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags].filter(Boolean),
            feedType: req.body.feedType || 'university', // Default to 'university' if not provided
            department: req.body.department || '', // Ensure department is included
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            createdAt: new Date(),
            participationLink: req.body.participationLink || '', // Optional field for participation link
            place: req.body.place || '', // Optional field for event place
            interested: req.body.interested || 0 // Optional field for interested count
        };


        const newEvent = await newEventCreation(eventData);
        res.status(201).json({
            message: 'Event created successfully',
            event: {
                _id: newEvent._id,
                creator: newEvent.creator,
                title: newEvent.title,
                content: newEvent.content,
                image: newEvent.image,
                tags: newEvent.tags,
                feedType: newEvent.feedType || 'university', // Ensure feedType is included
                startDate: newEvent.startDate,
                endDate: newEvent.endDate,
                createdAt: newEvent.createdAt,
                department: newEvent.department || '', // Ensure department is included
                comment: newEvent.comment || [], // Ensure comment is included
                participationLink: newEvent.participationLink || '', // Include participation link if available
                place: newEvent.place || '', // Include event place if available
                interested: newEvent.interested || 0 // Include interested count if available
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
            feedType: req.body.feedType || 'university', // Default to 'university' if not provided
            comment: req.body.comment || [], // Ensure comment is included
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            comment: req.body.comment || [],
            // Ensure createdAt is not updated
            createdAt: event.createdAt,
            department: req.body.department || event.department, // Ensure department is included
            participationLink: req.body.participationLink || event.participationLink, // Optional field for participation link
            place: req.body.place || event.place, // Optional field for event place
            interested: req.body.interested || event.interested // Optional field for interested count
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

const commentAdding = async(req,res) => {
    try {
        const event = await addComment(req.body);
        if (!event) {
            return res.status(404).json({
                error: 'event not found'
            });
        }
        res.status(200).json({
            event: event
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve post'
        });
    }

}

const interested = async(req, res) => {
    try{
        const event = await addInterested(req.body);
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
            error: 'Failed to retrieve post'
        });
    }

}

module.exports = {createEvent, deleteEvent, updateEvent, findingEvent, findingAllEvents, commentAdding, interested};