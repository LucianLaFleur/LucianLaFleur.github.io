// Load items from local storage on page load
// window.addEventListener("load", function() {
//     const savedItems = localStorage.getItem("todoItems");
//     if (savedItems) {
//         todoList.innerHTML = savedItems;
//         addDeleteButtons();
//     }
// });

// const todoList = document.getElementById("todo-list");
// const todoInput = document.getElementById("todo-input");
// const addButton = document.getElementById("add-button");

// // Add event listener for button click
// addButton.addEventListener("click", function() {
//     // Get input value
//     const todoInputValue = todoInput.value;
//     if (todoInputValue !== "") {
//         // Create new list item element
//         const listItem = document.createElement("li");
//         listItem.className = "todo-item";
//         listItem.textContent = todoInputValue;

//         // Create delete button
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         listItem.appendChild(deleteButton);

//         // Append list item to the todo list
//         todoList.appendChild(listItem);

//         // Save updated todo list to local storage
//         localStorage.setItem("todoItems", todoList.innerHTML);

//         // Add delete button event listener
//         deleteButton.addEventListener("click", function() {
//             // Ask for confirmation before deleting
//             if (confirm("Really delete this item?")) {
//                 // Remove list item from the todo list
//                 listItem.remove();
//                 // Save updated todo list to local storage
//                 localStorage.setItem("todoItems", todoList.innerHTML);
//             }
//         });
        
//         // Clear input value
//         todoInput.value = "";
//     }
//     else {
//         // Show popup with error message
//         popup.classList.remove("hidden");
//         setTimeout(function() {
//             popup.classList.add("hidden");
//         }, 1); // instantly start the fade animation
//     }
// });

// // Function to add delete buttons to existing items on page load
// function addDeleteButtons() {
//     const deleteButtons = document.querySelectorAll(".todo-item button");
//     deleteButtons.forEach(button => {
//         button.addEventListener("click", function() {
//             // Ask for confirmation before deleting
//             if (confirm("Really delete this item?")) {
//                 // Remove list item from the todo list
//                 const listItem = button.parentElement;
//                 listItem.remove();

//                 // Save updated todo list to local storage
//                 localStorage.setItem("todoItems", todoList.innerHTML);
//             }
//         });
//     });
// }

// Get DOM elements
const todoList = document.getElementById("todo-list");
const todoWrapper = document.getElementById("todo-wrapper");
const inputContainer = document.getElementById("input-container");
const addButton = document.getElementById("add-button");

const input1Value = document.getElementById("input1").value;
const input2Value = document.getElementById("input2").value;
const input3Value = document.getElementById("input3").value;
const input4Value = document.getElementById("input4").value;
const input5Value = document.getElementById("input5").value;
const input6Value = document.getElementById("input6").value;
const myInputArr = ["input1", "input2", "input3", "input4", "input5", "input6"];
const myInputValues = [input1Value, input2Value, input3Value, input4Value, input5Value, input6Value];

// Check if the todo list is empty (contains no li elements)
function handleHideEmptyList() {
    if (todoList.childElementCount === 0) {
        todoWrapper.style.display = "none";
    } else {
        todoWrapper.style.display = "grid";
    }
}

handleHideEmptyList()

// Function to check if all values in an array are filled
function areAllValuesFilled(valueArr) {
    for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] === "") {
            return false; // Return false if any value is empty
        }
    }
    return true; // Return true if all values are filled
}

// Enable/Disable ADD button
inputContainer.addEventListener("input", function() {
    // Update myInputValues array with current input values
    const myInputValues = myInputArr.map(inputId => document.getElementById(inputId).value);
    // Enable Add button only if all input fields have values
    addButton.disabled = !areAllValuesFilled(myInputValues)
});

function resetInputValues(inputIds) {
    for (let i = 0; i < inputIds.length; i++) {
        document.getElementById(inputIds[i]).value = "";
    }
}

function assignClassToDivs(divArray, className) {
    divArray.forEach((div) => {
      div.className = className;
    });
}

// Add event listener for Add button click
addButton.addEventListener("click", function() {
    // Create a new list item element
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    // Create a left column div
    const leftColumn = document.createElement("div");
    leftColumn.className = "left-column";
    const input1Value = document.getElementById("input1").value;
    const input2Value = document.getElementById("input2").value;
    const input1Div = document.createElement("div");
    const input2Div = document.createElement("div");
    input1Div.innerHTML = `input1: ${input1Value}`
    input2Div.innerHTML = `input2: ${input2Value}`
    leftColumn.appendChild(input1Div)
    leftColumn.appendChild(input2Div)
    

    // Create a center column div
    const centerColumn = document.createElement("div");
    centerColumn.className = "center-column";
    const input3Value = document.getElementById("input3").value;
    const input4Value = document.getElementById("input4").value;
    const input3Div = document.createElement("div");
    const input4Div = document.createElement("div");
    input3Div.innerHTML = `input3: ${input3Value}`
    input4Div.innerHTML = `input4: ${input4Value}`
    centerColumn.appendChild(input3Div)
    centerColumn.appendChild(input4Div)

    // Create a right column div 
    const rightColumn = document.createElement("div");
    rightColumn.className = "right-column";
    const input5Value = document.getElementById("input5").value;
    const input6Value = document.getElementById("input6").value;
    const input5Div = document.createElement("div");
    const input6Div = document.createElement("div");
    input5Div.innerHTML = `input5: ${input5Value}`
    input6Div.innerHTML = `input6: ${input6Value}`
    rightColumn.appendChild(input5Div);
    rightColumn.appendChild(input6Div);

    //assign the item
    sheetFieldArr = [input1Div, input2Div, input3Div, input4Div, input5Div, input6Div]
    assignClassToDivs(sheetFieldArr, "sheet-item")

    // Append column divs to the list item
    listItem.appendChild(leftColumn);
    listItem.appendChild(centerColumn);
    listItem.appendChild(rightColumn);

    // Append list item to the todo list
    todoList.appendChild(listItem);

    // Clear input values
    resetInputValues(myInputArr);
    // turn off the add button after submit
    addButton.disabled = true;
    handleHideEmptyList();
});

// Add event listener to each input element for "keydown" event
myInputArr.map(function(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        addButton.click(); // Trigger click event on Add button
      }
    });
  });