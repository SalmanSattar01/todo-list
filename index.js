#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
console.log("\t Welcome to the Todo APP");
async function mainMenu() {
    let mainMenuChoice = await inquirer.prompt([
        {
            name: "mainMenu",
            type: "list",
            choices: ["Add task", "Delete Task", "Edit Task", "Exit"],
        },
    ]);
    switch (mainMenuChoice.mainMenu) {
        case "Add task":
            await addTask();
            break;
        case "Delete Task":
            await deleteTask();
            break;
        case "Edit Task":
            await editTask();
            break;
        case "Exit":
            console.log(`Thanks for Using Todo App "Good Bye"`);
            return;
    }
    await mainMenu();
}
async function addTask() {
    let condition = true;
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "what do you want to add in you Todos ?",
                validate: (input) => {
                    if (input.trim() === "") {
                        return "Value cannot be empty. Please enter a valid value.";
                    }
                    return true;
                },
            },
            {
                name: "addMore",
                type: "confirm",
                message: "Do you you want to add more ",
                default: "false",
            },
        ]);
        todos.push(addTask.todo);
        condition = addTask.addMore;
        todos.forEach((todo) => {
            console.log(todo);
        });
    }
}
async function deleteTask() {
    let deleteTask = await inquirer.prompt([
        {
            name: "delete",
            type: "confirm",
            message: "Do you you want to Delete todos ",
            default: "false",
        },
    ]);
    if (deleteTask.delete === true) {
        const deleteTaskPrompt = await inquirer.prompt([
            {
                type: "list",
                name: "taskToDelete",
                message: "Select a task to delete:",
                choices: todos,
            },
        ]);
        let taskToDelete = deleteTaskPrompt.taskToDelete;
        const index = todos.indexOf(taskToDelete);
        if (index !== -1) {
            todos.splice(index, 1);
            console.log(`Deleted task: ${taskToDelete}`);
        }
        else {
            console.log(`Task "${taskToDelete}" not found in the list.`);
        }
        todos.forEach((todo) => {
            console.log(todo);
        });
    }
}
async function editTask() {
    let editTask = await inquirer.prompt([
        {
            name: "edit",
            type: "confirm",
            message: "Do you you want to Edit todos ",
            default: "false",
        },
    ]);
    if (editTask.edit === true) {
        let selectedItem = await inquirer.prompt({
            type: "list",
            name: "selectedItem",
            message: "Select a task to edit:",
            choices: todos,
        });
        let editedValue = await inquirer.prompt({
            type: "input",
            name: "editedValue",
            message: `Enter the new value for "${selectedItem.selectedItem}":`,
            validate: (input) => {
                if (input.trim() === "") {
                    return "Value cannot be empty. Please enter a valid value.";
                }
                return true;
            },
        });
        let selectedIndex = todos.indexOf(selectedItem.selectedItem);
        if (selectedIndex !== -1) {
            todos[selectedIndex] = editedValue.editedValue;
            console.log(`"${selectedItem.selectedItem}" updated to "${editedValue.editedValue}".`);
        }
        else {
            console.log(`"${selectedItem.selectedItem}" not found in the list.`);
        }
        todos.forEach((todo) => {
            console.log(todo);
        });
    }
}
await mainMenu();
// // read , update, delete, add home work
