const express = require('express');
const tasksRouter = require("./routes/tasks");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send('Welcome to task manager');
});

app.use("/tasks", tasksRouter);