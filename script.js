// Wait until the entire page (DOM) is loaded before running the script

document.addEventListener("DOMContentLoaded", function () {

  // Select the form and the task list from the HTML
  const todoForm = document.getElementById("todoForm"); // The form where tasks are added
  const taskInput = document.getElementById("task"); // The text input field
  const todoList = document.getElementById("todoList"); // The <ul> list where tasks appear

  // Listen for form submission (when the user clicks "Add Task")
  todoForm.addEventListener("submit",function (event) {
      event.preventDefault(); // Prevents the page from refreshing when submitting the form

      // Get the text entered by the user in the input field
      const taskText = taskInput.value.trim(); // .trim() removes any extra spaces

      // Check if the user actually entered something (not just empty space)
      if (taskText !== "") {
          // Create a new list item <li> for the task
          const taskItem = document.createElement("li");
          taskItem.textContent = taskText; // Set the text of the <li> to the user's input

          // Add an event listener to remove a task when clicked
          taskItem.addEventListener("click",function () {
              todoList.removeChild(taskItem); // Removes the task from the list
          });


          // Append (add) the new task to the <ul> task list
          todoList.appendChild(taskItem);

          // Clear the input field after adding the task
          taskInput.value = "";
      }
  });
  
});
