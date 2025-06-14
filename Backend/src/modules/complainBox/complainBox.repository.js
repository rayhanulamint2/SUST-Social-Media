const mongoose = require('mongoose')
const complainSchema = require('./complainBox.model')
const Complain = new mongoose.model('Complain', complainSchema);

const newComplainCreation = async (complainData) => {
    const newComplain = new Complain(complainData);
    try {
        await newComplain.save();
        console.log('complain created successfully')
        return newComplain;
    } catch (error) {
        console.log('there are an error in server end')
    }
}
const findComplain = async () => {
    try {
        const complaints = await Complain.find({ solved: false });
        return complaints;
    } catch (error) {
        console.log('There was an error on the server end:', error);
    }

}

const deleteComplainByID = async (id) => {
    try {
        await Complain.findByIdAndDelete(id);
        console.log('Complain deleted successfully');
    } catch (error) {
        console.log('there are an error in server end');
    }
}

const complainUpdate = async (updateData) => {
    try {
        console.log('Updating complain with ID:', updateData.id);
        console.log('Update data:', updateData);
        const updatedComplain = await Complain.findById(updateData.id);
        if (!updatedComplain) {
            throw new Error('Complain not found');
        }
        console.log('Complain updated successfully');
        updatedComplain.solved = true;
        console.log(updatedComplain);
        updatedComplain.save();
        return updatedComplain;
    } catch (error) {
        console.log('there are an error in server end');
        console.error(error);
    }
}
module.exports = { newComplainCreation, findComplain, deleteComplainByID, complainUpdate }