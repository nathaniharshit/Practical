
// task.js
class Task {
    constructor(title, dueTime, priority) {
        this.title = title;
        this.dueTime = Date.now() + dueTime * 60000; // Convert minutes to milliseconds
        this.priority = priority;
    }
}

module.exports = Task;

// taskManager.js
const Task = require('./task');

let tasks = [];

function addTask(title, dueTime, priority) {
    try {
        const newTask = new Task(title, dueTime, priority);
        tasks.push(newTask);
        console.log(`Task "${title}" added successfully.`);
    } catch (error) {
        console.error('Error adding task:', error.message);
    }
}

function sortTasksByPriority() {
    tasks.sort((a, b) => b.priority - a.priority);
    console.log('Tasks sorted by priority.');
}

function displayTasksDueWithin(timeframe) {
    const now = Date.now();
    const dueTasks = tasks.filter(task => task.dueTime <= now + timeframe * 60000);
    console.log('Tasks due within the next', timeframe, 'minutes:');
    dueTasks.forEach(task => console.log(task.title));
}

function simulateReminders() {
    tasks.forEach(task => {
        const delay = task.dueTime - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                console.log(`Reminder: ${task.title} is due now!`);
            }, delay);
        }
    });
}

module.exports = { addTask, sortTasksByPriority, displayTasksDueWithin, simulateReminders };

// main.js
const { addTask, sortTasksByPriority, displayTasksDueWithin, simulateReminders } = require('./taskManager');

addTask('Finish homework', 5, 1);
addTask('Meeting with team', 10, 2);
addTask('Call mom', 3, 3);

sortTasksByPriority();
displayTasksDueWithin(10);
simulateReminders();
