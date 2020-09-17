const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/Task');

router.post('/create', TaskController.addTask);
router.delete('/delete-permanently', TaskController.deleteTaskPermanently);
router.delete('/delete-temporarily', TaskController.deleteTaskTemporarily);
router.get('/', TaskController.getAllTasks);
router.get('/by-status', TaskController.getTasksByStatus);
router.post('/update', TaskController.updateStatus);
router.post('/undo', TaskController.undoTask);

module.exports = router;