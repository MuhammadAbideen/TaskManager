const express = require("express");
const router = express.Router();

taskData =  require('../../src/tasks.json');

const path = require('path');
const fs = require('fs');


router.get("/", async (req, res) => {
    return res.status(200).send(taskData);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let result = taskData.filter(val => val.id == id);

    if (result.length === 0) {
        return res.status(404).send("Item not found");
    }
    return res.status(200).send(result[0]);
});


router.get("/priority/:level", async (req, res) => {
    const { level } = req.params;
    
    const priorityLevel = level.toLowerCase();
    const tasksByPriority = taskData.filter(task => task.priority === priorityLevel);

    if (tasksByPriority.length === 0) {
        return res.status(404).send("No tasks found with this priority level");
    }

    return res.status(200).send(tasksByPriority);
});


const haveSameKeys = (obj1, obj2) => {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();
    return JSON.stringify(keys1) === JSON.stringify(keys2);
};

router.post("/", async (req, res) => {
    const newTask = req.body; // Assuming the request body contains the new task data

    // Check if the new task's ID matches any existing task's ID
    const isDuplicate = taskData.some(task => task.id === newTask.id);

    if (isDuplicate) {
        return res.status(400).send("Duplicate entry: Task with the same ID already exists");
    }

    if (!taskData.every(task => haveSameKeys(task, newTask))) {
        return res.status(400).send("New task structure doesn't match existing tasks");
    }

    taskData.push(newTask);
    return res.status(201).send("Task added successfully");
});

// POST route to update a task based on its id
router.post("/:id", async (req, res) => {
    const idToUpdate = parseInt(req.params.id); // Parse the id to ensure it's a number
    const updatedtask = req.body; // Updated task data

    let taskIndex = taskData.findIndex(task => task.id === idToUpdate);
    if (taskIndex !== -1) {
        taskData[taskIndex] = { ...taskData[taskIndex], ...updatedtask };
        return res.status(200).send("task updated successfully");
    } else {
        return res.status(404).send("task not found");
    }
});


router.delete("/:id", async (req, res) => {
    const idToDelete = parseInt(req.params.id); // Parse the id to ensure it's a number
    const initialLength = taskData.length;
    taskData = taskData.filter(task => task.id !== idToDelete);

    if (taskData.length < initialLength) {
        return res.status(200).send("task deleted successfully");
    } else {
        return res.status(404).send("task not found");
    }
});

module.exports = router;