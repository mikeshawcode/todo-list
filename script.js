document.addEventListener("DOMContentLoaded", function () {

    // Select the form and the task list from the HTML
    const todoForm = document.getElementById("todoForm"); // The form where tasks are added
    const taskInput = document.getElementById("task"); // The text input field
    const todoList = document.getElementById("todoList"); // The <ul> list where tasks appear

    // Load saved tasks from local storage when the page loads
    loadTasks();

    // Listen for form submission (when the user clicks "Add Task")
    todoForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents the page from refreshing when submitting the form

        // Get the text entered by the user in the input field
        const taskText = taskInput.value.trim(); // .trim() removes any extra spaces

        // Check if the user actually entered something (not just empty space)
        if (taskText !== "") {
            addTask(taskText); // Call function to add the task
            saveTask(taskText); // Save task in local storage
            taskInput.value = ""; // Clear the input field after adding the task
        }
    });

    // Add AI suggestion button
    const suggestButton = document.createElement("button");
    suggestButton.textContent = "Suggest a Task";
    suggestButton.style.marginTop = "10px"; // Add space for styling
    suggestButton.type = "button"; // Prevents it from submitting the form
    todoForm.appendChild(suggestButton); // Add button to form

    // Event listener for suggestion button
    suggestButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevents default behavior

        try {
            // Get the current tasks from the list
            const tasks = Array.from(todoList.children).map(item => item.textContent);

            const response = await fetch("https://expert-halibut-69w4g5jgvpq5c7jj-3000.app.github.dev/suggest-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tasks }) // Send the existing tasks to the backend
            });

            const data = await response.json();
            if (data.suggestion) {
                addTask(data.suggestion); // Add suggested task to the list
                saveTask(data.suggestion); // Save it in local storage
            }
        } catch (error) {
            console.error("Error fetching suggested task:", error);
        }
    });

    // Function to add a new task to the list
    function addTask(taskText) {
        // Create a new list item <li> for the task
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText; // Set the text of the <li> to the user's input

        // Add an event listener to remove a task when clicked
        taskItem.addEventListener("click", function () {
            todoList.removeChild(taskItem); // Removes the task from the list
            removeTask(taskText); // Remove from local storage
        });

        // Append (add) the new task to the <ul> task list
        todoList.appendChild(taskItem);
    }

    // Function to save task to Local Storage
    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get existing tasks
        tasks.push(taskText); // Add new task
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated list
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get saved tasks
        tasks.forEach(task => addTask(task)); // Add each task to the list
    }

    // Function to remove a task from local storage
    function removeTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Get tasks
        tasks = tasks.filter(task => task !== taskText); // Remove selected task
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated list
    }

});
