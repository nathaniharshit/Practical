const express = require('express'); 
const fs = require('fs'); 
const path = require('path'); 
const app = express(); 
const port = 3000; 
 
const logVisit = (req, res, next) => { 
const ip = req.ip || req.connection.remoteAddress; 
const timestamp = new Date().toISOString(); 
const logEntry = `{ "ip": "${ip}", "time": "${timestamp}" }\n`; 
 
fs.appendFile(path.join( dirname, 'logs', 'visits.log'), logEntry, (err) 
=> { 
if (err) { 
console.error('Error writing to log file', err); 
} 
}); 
 
next(); 
}; 
 
app.use(express.json()); 
app.use(express.static('public')); 
app.use(logVisit); 
app.get('/', (req, res) => { 
res.sendFile(path.join( dirname, 'public', 'index.html')); 
}); 
app.get('/logs', (req, res) => { 
fs.readFile(path.join( dirname, 'logs', 'visits.log'), 'utf-8', (err, 
data) => { 
if (err) { 
return res.status(500).json({ error: 'Error reading log file' }); 
} 
const logs = data.trim().split('\n').map(log => JSON.parse(log)); 
res.json(logs); 
}); 
}); 
app.listen(port, () => { 
console.log(`Server running at http://localhost:${port}`); 
});
