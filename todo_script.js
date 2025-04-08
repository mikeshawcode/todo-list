document.addEventListener("DOMContentLoaded", function () {
    // Select the form, input field, and task list from the HTML
    const todoForm = document.getElementById("todoForm"); // Form where tasks are added
    const taskInput = document.getElementById("task"); // Text input field for task entry
    const todoList = document.getElementById("todoList"); // <ul> list where tasks are displayed

    // Load tasks from local storage when the page loads
    loadTasks();

    // Event listener for when a new task is submitted
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the page from refreshing on form submission

        const taskText = taskInput.value.trim(); // Get the user's input and trim extra spaces

        // Only add the task if the input is not empty
        if (taskText !== "") {
            addTask(taskText); // Display the task in the list
            saveTask(taskText); // Save the task to local storage
            taskInput.value = ""; // Clear the input field after adding the task
        }
    });

    // Function to add a new task to the list
    function addTask(taskText) {
        const taskItem = document.createElement("li"); // Create a new list item element
        taskItem.textContent = taskText; // Set the text content to the task text

        // Add a click event to remove the task when clicked
        taskItem.addEventListener("click", function () {
            todoList.removeChild(taskItem); // Remove task from the displayed list
            removeTask(taskText); // Remove task from local storage
        });

        // Append the new task to the <ul> list
        todoList.appendChild(taskItem);
    }

    // Function to save a task to local storage
    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get existing tasks or initialize an empty array
        tasks.push(taskText); // Add the new task to the array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated tasks back to local storage
    }

    // Function to load saved tasks from local storage when the page loads
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get saved tasks or initialize an empty array
        tasks.forEach(task => addTask(task)); // Add each task to the displayed list
    }

    // Function to remove a task from local storage
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get the existing tasks
        tasks = tasks.filter(task => task !== taskText); // Remove the selected task from the array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated list back to local storage
    }
});
