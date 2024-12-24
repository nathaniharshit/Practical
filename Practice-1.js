const task=[{title: "Washing Clothes", status:"Complete", priority: 3},
{title: "Washing Utensils", status:"Pending", priority: 5},
{title: "Washing Clothes", status:"Complete", priority: 3},
{title: "Gardening", status:"Pending", priority: 1}
]

console.log("Task list before:");
console.log(task);

const addTask=(collection,task)=>{
    collection.push(task);  
};

addTask(task,{title: "Bath", status:"Complete", priority: 3}
);

console.log("Task list after:");
console.log(task);

const filter_status=task.filter(task=>task.status=="Complete");
console.log("All the task based on the complete status");
console.log(filter_status);

const find_priority=task.find(task=>task.priority==5);
console.log("All the task based on priority 5");
console.log(find_priority);

const map=task.map(task=>task=task.status)
console.log("The mapped of this array list is:");
console.log(map);