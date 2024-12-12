import express from 'express'
import Task from '../models/Task.js'

const router = express.Router();
// Fetch tasks
router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Add task
router.post('/', async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});

// Update task
router.put('/:id', async (req, res) => {
    await Task.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Task updated' });
});

// Delete task
router.delete('/:id', async (req, res) => {
    await Task.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Task deleted' });
});

export default router;
