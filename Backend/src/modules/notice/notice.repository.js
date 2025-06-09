const mongoose = require('mongoose')
const noticeSchema = require('./notice.model')
const Notice = new mongoose.model('Notice',noticeSchema);

const newNoticeCreation = async(noticeData) => {
    const newNotice = new Notice(noticeData);
    try{
        await newNotice.save();
        console.log('notice created successfully')
        return newNotice;
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findNotice = async(id)=>{
    try{
        const notice = await Notice.findById(id)
        return notice
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

const deleteNoticeByID = async(id) => {
    try {
        await Notice.findByIdAndDelete(id);
        console.log('Notice deleted successfully');
    } catch (error) {
        console.log('there are an error in server end');
    }
}

const noticeUpdate = async(id, updateData) => {
    try {
        console.log('Updating notice with ID:', id);
        console.log('Update data:', updateData);
        const updatedNotice = await Notice.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNotice) {
            throw new Error('Notice not found');
        }
        console.log('Notice updated successfully');
        console.log(updatedNotice);
        return updatedNotice;
    } catch (error) {
        console.log('there are an error in server end');
        console.error(error);
    }
}
module.exports = {newNoticeCreation, findNotice, deleteNoticeByID, noticeUpdate}