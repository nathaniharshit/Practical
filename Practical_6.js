const fs = require('fs'); 
const app = express(); 
const PORT = 3000; 
const TASKS_FILE = 'tasks.json'; 
 
app.use(express.json()); 
 
const loadTasks = () => { 
    try { 
        return JSON.parse(fs.readFileSync(TASKS_FILE)); 
    } catch (error) { 
        return []; 
    } 
}; 
 
const saveTasks = (tasks) => { 
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2)); 
}; 
 
const validateTask = (req, res, next) => { 
    const { title, status } = req.body; 
    if (!title || typeof title !== 'string') { 
        return res.status(400).json({ error: "Title is required and must be a string." }); 
    } 
    if (status && !['pending', 'completed'].includes(status)) { 
 
        return res.status(400).json({ error: "Invalid status. Use 'pending' or 'completed'." }); 
    } 
    next(); 
}; 
 
app.post('/tasks', validateTask, (req, res) => { 
    const tasks = loadTasks(); 
    const newTask = { id: tasks.length + 1, ...req.body }; 
    tasks.push(newTask); 
    saveTasks(tasks); 
    res.status(201).json(newTask); 
}); 
 
app.get('/tasks', (req, res) => { 
    res.json(loadTasks()); 
}); 
 
app.put('/tasks/:id', validateTask, (req, res) => { 
    const tasks = loadTasks(); 
    const taskIndex = tasks.findIndex(task => task.id == req.params.id); 
    if (taskIndex === -1) return res.status(404).json({ error: "Task not found" }); 
 
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body }; 
    saveTasks(tasks); 
    res.json(tasks[taskIndex]); 
}); 
 
app.delete('/tasks/:id', (req, res) => { 
    let tasks = loadTasks(); 
    const newTasks = tasks.filter(task => task.id != req.params.id); 
    if (tasks.length === newTasks.length) return res.status(404).json({ error: 
"Task not found" }); 
 
    saveTasks(newTasks); 
    res.json({ message: "Task deleted successfully" }); 
}); 
 
app.listen(PORT, () =>  console.log(`Server running on 
http://localhost:${PORT}`));
