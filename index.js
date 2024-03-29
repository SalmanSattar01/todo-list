#! /usr/bin/env node
import inquirer from "inquirer";
const todoList = [];
const mainMenu = () => {
    inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ["Add a task", "Complete a task", "View tasks", "Exit"],
        },
    ])
        .then((answer) => {
        switch (answer.action) {
            case "Add a task":
                addTask();
                break;
            case "Complete a task":
                completeTask();
                break;
            case "View tasks":
                viewTasks();
                break;
            case "Exit":
                console.log("Goodbye!");
                break;
        }
    });
};
const addTask = () => {
    inquirer
        .prompt([
        {
            type: "input",
            name: "task",
            message: "Enter the task:",
        },
    ])
        .then((answer) => {
        const newTask = {
            task: answer.task,
            completed: false,
        };
        todoList.push(newTask);
        console.log("Task added successfully!");
        mainMenu();
    });
};
const completeTask = () => {
    inquirer
        .prompt([
        {
            type: "checkbox",
            name: "tasks",
            message: "Select tasks to mark as complete:",
            choices: todoList.map((item) => ({ name: item.task, value: item })),
        },
    ])
        .then((answer) => {
        answer.tasks.forEach((task) => {
            task.completed = true;
        });
        console.log("Tasks marked as complete!");
        mainMenu();
    });
};
const viewTasks = () => {
    console.log("Current tasks:");
    todoList.forEach((item, index) => {
        console.log(`${index + 1}. [${item.completed ? "x" : " "}] ${item.task}`);
    });
    mainMenu();
};
mainMenu();
///////////////////////////////////////////////////////
// let fruit = ["apple", "banana"]
// fruit.push("melon")
// fruit.pop()
// console.log(fruit)
// fruit = fruit.concat(["melon","kiwi"])
// console.log(fruit)
// let ramadandays = 0;
// while(ramadandays <= 30){
//     console.log("fasting");
//     console.log("five times prayers");
//     console.log(ramadandays);
//     ramadandays++;
// }
// let todos = [];
// let condition = true;
// while(condition){
// let addTask = await inquirer.prompt(
//     [
//         {
//             name: "todo",
//             type: "input",
//             message:"what do you want to add in you Todos ?"
//         },
//         {
//             name: "addMore",
//             type: "confirm",
//             message:"Do you you want to add more ",
//             default: "false"
//         }
//     ]
// );
// todos.push(addTask.todo)
// condition = addTask.addMore
// console.log(todos)
// }
