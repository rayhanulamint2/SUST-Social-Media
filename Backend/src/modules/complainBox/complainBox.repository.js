const mongoose = require('mongoose')
const complainSchema = require('./complainBox.model')
const Complain = new mongoose.model('Complain',complainSchema);

const newComplainCreation = async(complainData) => {
    const newComplain = new Complain(complainData);
    try{
        await newComplain.save();
        console.log('complain created successfully')
        return newComplain;
    } catch(error){
        console.log('there are an error in server end')
    }
}
const findComplain = async(id)=>{
    try{
        const complain = await Complain.findById(id)
        return complain
    }
    catch(error){
        console.log('there are an error in server end')
    }
}

const deleteComplainByID = async(id) => {
    try {
        await Complain.findByIdAndDelete(id);
        console.log('Complain deleted successfully');
    } catch (error) {
        console.log('there are an error in server end');
    }
}

const complainUpdate = async(id, updateData) => {
    try {
        console.log('Updating complain with ID:', id);
        console.log('Update data:', updateData);
        const updatedComplain = await Complain.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedComplain) {
            throw new Error('Complain not found');
        }
        console.log('Complain updated successfully');
        console.log(updatedComplain);
        return updatedComplain;
    } catch (error) {
        console.log('there are an error in server end');
        console.error(error);
    }
}
module.exports = {newComplainCreation, findComplain, deleteComplainByID, complainUpdate}