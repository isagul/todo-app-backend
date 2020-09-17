const mongoose = require('mongoose');

const Task = require('../models/Task');

exports.addTask = (req, res, next) => {
    const { content, date, targetTime } = req.body;

    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        status: 'active',
        content: content,
        date: date,
        targetTime: targetTime
    });

    task
        .save()
        .then(result => {
            res.status(200).json({
                status: true,
                addedTask: {
                    id: result._id,
                    status: result.status,
                    content: result.content,
                    date: result.date,
                    targetTime: result.targetTime,
                }
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.getAllTasks = (req, res, next) => {
    Task.find()
        .exec()
        .then(result => {
            res.status(200).json({
                status: true,
                count: result.length,
                result
            })
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.getTasksByStatus = (req, res, next) => {
    // console.log(req.body);
    const { status } = req.body;

    if (status !== 'all') {
        Task.find({ status: status })
            .exec()
            .then(result => {
                res.status(200).json({
                    status: true,
                    result: result
                })

            })
            .catch(err => {
                res.status(200).json({
                    status: false,
                    error: err
                })
            })
    } else {
        Task.find()
            .exec()
            .then(result => {
                res.status(200).json({
                    status: true,
                    count: result.length,
                    result
                })
            })
            .catch(err => {
                res.status(200).json({
                    status: false,
                    error: err
                })
            })
    }


}

exports.updateStatus = (req, res, next) => {
    const { value, id } = req.body;

    Task.findOneAndUpdate({ _id: id }, { $set: { status: value } }, { new: true })
        .exec()
        .then(result => {
            Task.find()
                .exec()
                .then(result => {
                    res.status(200).json({
                        status: true,
                        count: result.length,
                        result
                    })
                })
                .catch(err => {
                    res.status(200).json({
                        status: false,
                        error: err
                    })
                })

        })
        .catch(err => {
            res.status(200).json({
                status: false,
                error: err
            })
        })
}

exports.deleteTaskTemporarily = (req, res, next) => {

}

exports.deleteTaskPermanently = (req, res, next) => {
    const { id } = req.params;
    
    Task.findOne({ _id: id })
        .exec()
        .then(task => {
            if (!task) {
                return res.status(404).json({
                    status: false,
                    error: {
                        message: 'Task not found!'
                    }
                })
            } else {
                Task.deleteOne({ _id: id })
                    .exec()
                    .then(result => {
                        Task.find()
                            .exec()
                            .then(result => {
                                res.status(200).json({
                                    status: true,
                                    count: result.length,
                                    result
                                })
                            })
                            .catch(err => {
                                res.status(200).json({
                                    status: false,
                                    error: err
                                })
                            })
                    })
                    .catch(err => {
                        res.status(200).json({
                            status: false,
                            error: err
                        })
                    })
            }
        })
}

exports.undoTask = (req, res, next) => {

}