// Get references to HTML elements
// const todoList = document.getElementById("todo-list");
// const todoInput = document.getElementById("todo-input");
// const addButton = document.getElementById("add-button");

// Load items from local storage on page load
window.addEventListener("load", function() {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        todoList.innerHTML = savedItems;
        addDeleteButtons();
    }
});

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

// Add event listener for button click
addButton.addEventListener("click", function() {
    // Get input value
    const todoInputValue = todoInput.value;
    if (todoInputValue !== "") {
        // Create new list item element
        const listItem = document.createElement("li");
        listItem.className = "todo-item";
        listItem.textContent = todoInputValue;

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        listItem.appendChild(deleteButton);

        // Append list item to the todo list
        todoList.appendChild(listItem);

        // Save updated todo list to local storage
        localStorage.setItem("todoItems", todoList.innerHTML);

        // Add delete button event listener
        deleteButton.addEventListener("click", function() {
            // Ask for confirmation before deleting
            if (confirm("Really delete this item?")) {
                // Remove list item from the todo list
                listItem.remove();
                // Save updated todo list to local storage
                localStorage.setItem("todoItems", todoList.innerHTML);
            }
        });
        
        // Clear input value
        todoInput.value = "";
    }
    else {
        // Show popup with error message
        popup.classList.remove("hidden");
        setTimeout(function() {
            popup.classList.add("hidden");
        }, 1); // instantly start the fade animation
    }
});

// Function to add delete buttons to existing items on page load
function addDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".todo-item button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Ask for confirmation before deleting
            if (confirm("Really delete this item?")) {
                // Remove list item from the todo list
                const listItem = button.parentElement;
                listItem.remove();

                // Save updated todo list to local storage
                localStorage.setItem("todoItems", todoList.innerHTML);
            }
        });
    });
}

// allow hitting enter to "click" the add button
todoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addButton.click(); // Trigger click event on Add button
    }
  });

