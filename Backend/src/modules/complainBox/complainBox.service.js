const {newComplainCreation, findComplain, deleteComplainByID, complainUpdate} = require('./complainBox.repository')    

const createComplain = async(req, res) => {
    try{
        const complainData = {
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            date: new Date(req.body.date),
            image: req.body.image || '',
            createdAt: new Date(), // Optional, Mongoose handles this by default
            department: req.body.department || '',
            solved: false // Optional, Mongoose sets this by default
        };



        const newComplain = await newComplainCreation(complainData);
        res.status(201).json({
            message: 'Complain created successfully',
            complain: {
                _id: newComplain._id,
                content: newComplain.content,
                date: newComplain.date,
                image: newComplain.image,
                createdAt: newComplain.createdAt,
                department: newComplain.department || '',
                solved: newComplain.solved
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create complain'
        });
    }
};

const deleteComplain = async(req, res) => {
    try {
        const complain = await findComplain(req.params.id);
        console.log(complain)
        if (!complain) {
            return res.status(404).json({
                error: 'Complain not found'
            });
        }
        deleteById = await deleteComplainByID(req.params.id);
        res.status(200).json({
            message: 'Complain deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete complain'
        });
    }
};

const updateComplain = async(req, res) => {
    try {
        const complain = await findComplain(req.params.id);
        if (!complain) {
            return res.status(404).json({
                error: 'Complain not found'
            });
        }
        // Update logic here
        // For example, updating content or tags
        const complainData = {
            content: Array.isArray(req.body.content)
                ? req.body.content.join('\n')
                : req.body.content,
            date: new Date(req.body.date),
            image: req.body.image || '',
            createdAt: new Date(), // Optional, Mongoose handles this by default
            department: req.body.department || '',
            solved: false // Optional, Mongoose sets this by default
        };

        const updatedComplain = await complainUpdate(req.params.id, complainData);
        // complain updated
        res.status(200).json({
            message: 'Complain updated successfully',
            complain: updatedComplain
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update complain'
        });
    }
};

const findingComplain = async(req, res) => {
    try {
        const complain = await findComplain(req.params.id);
        if (!complain) {
            return res.status(404).json({
                error: 'Complain not found'
            });
        }
        res.status(200).json({
            complain: complain
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve complain'
        });
    }
};

module.exports = {createComplain, deleteComplain, updateComplain, findingComplain};