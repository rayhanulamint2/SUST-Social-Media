const mongoose = require('mongoose')
const eventSchema = require('./event.model')
const Event = new mongoose.model('Event',eventSchema);

const newEventCreation = async(eventData) => {
    const newEvent = new Event(eventData);
    try{
        await newEvent.save();
        console.log('event created successfully')
        return newEvent;
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findEvent = async(id)=>{
    try{
        const event = await Event.findById(id)
        return event
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

const deleteEventByID = async(id) => {
    try {
        await Event.findByIdAndDelete(id);
        console.log('Event deleted successfully');
    } catch (error) {
        console.log('there are an error in server end');
    }
}

const eventUpdate = async(id, updateData) => {
    try {
        console.log('Updating event with ID:', id);
        console.log('Update data:', updateData);
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEvent) {
            throw new Error('Event not found');
        }
        console.log('Event updated successfully');
        console.log(updatedEvent);
        return updatedEvent;
    } catch (error) {
        console.log('there are an error in server end');
        console.error(error);
    }
}
const findAllEvents = async () => {
  try {
    const events = await Event.find()
      .populate({ path: 'creator', select: 'name avatar' })
      .populate({ path: 'comment.userId', select: 'name avatar' })
      .sort({ createdAt: -1 });

    return events;
  } catch (error) {
    console.error('Server error:', error);
    return [];
  }
};

const addComment = async(payload) =>{
    try{
        console.log("payload = ", payload);
        const event= await Event.findById(payload.eventId)
        console.log("event: ", event);
        event.comment.push(payload.comment);

        const newEvent = await event.save();
        return newEvent;

    }
    catch(error){
        console.log('there is an error');
    }
}

const addInterested = async(payload) => {
    try{
        console.log("payload = ", payload);
        const event= await Event.findById(payload.eventId)
        console.log("event: ", event);
        event.interested = event.interested+1;

        const newEvent = await event.save();
        return newEvent;
    }
    catch(error){
        console.log('there is an error');
    }
}

module.exports = {newEventCreation, findEvent, deleteEventByID, eventUpdate, findAllEvents, addComment, addInterested}