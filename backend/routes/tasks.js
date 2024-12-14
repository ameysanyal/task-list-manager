import express from 'express'
import Task from '../models/Task.js'

const router = express.Router();
// Fetch tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch single task
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Add task
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    }
    catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    try {
        await Task.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Task updated' });
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        await Task.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
