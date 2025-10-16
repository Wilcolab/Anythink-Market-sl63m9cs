const express = require('express');

const app = express();
const PORT = 8001;

// parse JSON bodies
app.use(express.json());

// same initial tasks list as the Python app
const tasks = [
    "Write a diary entry from the future",
    "Create a time machine from a cardboard box",
    "Plan a trip to the dinosaurs",
    "Draw a futuristic city",
    "List items to bring on a time-travel adventure"
];

// GET / should return the same as the Python root handler
app.get('/', (req, res) => {
    res.json('Hello World');
});


// GET /tasks -> { tasks: [...] }
app.get('/tasks', (req, res) => {
    res.json({ tasks });
});

// POST /tasks -> { message: "Task added successfully" }
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'text is required' });
    }
    tasks.push(text);
    return res.json({ message: 'Task added successfully' });
});

app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});