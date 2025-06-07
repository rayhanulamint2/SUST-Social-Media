const {newNoticeCreation, findNotice,deleteNoticeById, noticeUpdate} = require('./post.repository')    

const createNotice = async(req, res) => {
    try{
        const noticeData = {
            description: Array.isArray(req.body.description)
                ? req.body.description.join('\n')
                : req.body.description,
            filePath: req.body.filePath || '',
            createdAt: new Date(), // Optional, Mongoose sets this automatically
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            isDepartmentPost: req.body.isDepartmentPost,
            department: req.body.department || ''
        };



        const newNotice = await newNoticeCreation(noticeData);
        res.status(201).json({
            message: 'Notice created successfully',
            notice: {
                _id: newNotice._id,
                description: newNotice.description,
                filePath: newNotice.filePath,
                createdAt: newNotice.createdAt,
                startDate: newNotice.startDate,
                endDate: newNotice.endDate,
                isDepartmentPost: newNotice.isDepartmentPost,
                department: newNotice.department || '' // Ensure department is included
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to create notice'
        });
    }
};

const deleteNotice = async(req, res) => {
    try {
        const notice = await findNotice(req.params.id);
        console.log(notice)
        if (!notice) {
            return res.status(404).json({
                error: 'Notice not found'
            });
        }
        deleteById = await deleteNoticeByID(req.params.id);
        res.status(200).json({
            message: 'Notice deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to delete notice'
        });
    }
};

const updateNotice = async(req, res) => {
    try {
        const notice = await findNotice(req.params.id);
        if (!notice) {
            return res.status(404).json({
                error: 'Notice not found'
            });
        }
        // Update logic here
        // For example, updating content or tags
        const noticeData = {
            description: Array.isArray(req.body.description)
                ? req.body.description.join('\n')
                : req.body.description,
            filePath: req.body.filePath || '',
            createdAt: new Date(), // Optional, Mongoose sets this automatically
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            isDepartmentPost: req.body.isDepartmentPost,
            department: req.body.department || ''
        };
        // Ensure createdAt is not updated
    } catch (error) {
        console.error(error);
    }
    try {
        const updatedNotice = await noticeUpdate(req.params.id, noticeData);
        // notice updated
        res.status(200).json({
            message: 'Notice updated successfully',
            notice: updatedNotice
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to update notice'
        });
    }
};

const findingNotice = async(req, res) => {
    try {
        const notice = await findNotice(req.params.id);
        if (!notice) {
            return res.status(404).json({
                error: 'Notice not found'
            });
        }
        res.status(200).json({
            notice: notice
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve notice'
        });
    }
};

module.exports = {createNotice, deleteNotice, updateNotice, findingNotice};