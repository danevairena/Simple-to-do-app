//Objects declarations

const todoValue = document.getElementById("todoText");
const listitems = document.getElementById("list-items");
const todoAlert = document.getElementById("Alert");
const addUpdateClick = document.getElementById("AddUpdateClick");
const sign = document.getElementById("UpdateSign");

//localstorage object declaration with the help of key:todo-list
//deserializing the JSON string data using the JSON parse method to turn it back into a JavaScript object
let todo = JSON.parse(localStorage.getItem("todo-list"));

//if there is no data for todo-list create new array
if (!todo) {
  todo = [];
}

//add new task when press Enter
todoValue.addEventListener("keypress", function (e) {
  if(e.key === "Enter") {
    addUpdateClick.click();
  }
});

//function for setting localstorage item
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

//function for setting alert messages based on user activity
function setAlertMessage(message) {
  todoAlert.style.visibility = "visible";
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.style.visibility = "hidden";
  }, 2500);
}


//functions for (CRUD) CREATE, READ, UPDATE & DELETE


//CREATE
function CreateTodoItems() {
  //display the error message if input field is empty
  if (todoValue.value === "") {
    alert("Please enter your task!");
    todoValue.focus();
    return;
  } else {
    //if the user enters any task on the textbox it will be automatically added to the list as well as in localstorage
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    //notification if the same task is already presented in the list
    if (IsPresent) {
      todoAlert.style.color = "red";
      setAlertMessage("This task is already in the list!");
      //clear user input field
      todoValue.value = "";
      return;
    }

    //create new li element
    let li = document.createElement("li");

    //create task with buttons for complete and delete and asign it to li element
    //the text of the task is the user input
    const todoItems = `<div>${todoValue.value}</div><div>
                    <img class="complete todo-controls" src="/images/complete.png" onclick="CompleteTodoItem(this)"/>
                    <img class="edit todo-controls" src="/images/edit.png" onclick="UpdateTodoItem(this)"/>
                    <img class="delete todo-controls" onclick="DeleteTodoItem(this)" src="/images/delete.png" /></div>`;
    li.innerHTML = todoItems;
    listitems.appendChild(li);

    if (!todo) {
      todo = [];
    }
    //create item object and save it to the localStorage
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
    //clear user input field
    todoValue.value = "";
    //Once the user added a task into the list tool will show the response message
    todoAlert.style.color = "green";
    setAlertMessage("Todo item Created Successfully!");
  }
}

//complete todo button
function CompleteTodoItem(e) {
  if(e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
    e.parentElement.parentElement.querySelector("div").style.textDecoration = "line-through";
    todoAlert.style.color = "green";
    setAlertMessage("Task completed!");

    todoData.forEach((element) => {
      if(e.parentElement.querySelector("div").innerText.trim() == element.item) {
        element.status = true;
      }
    })
}}


//READ
ReadTodoItems();
//list all the data, retrieved from localstorage
//if the user refreshes the browser or closes the browser, 
//localstorage will persist data and display again all the time
function ReadTodoItems() {
  //for each element in todo create new li element
  todo.forEach(element => {
    let li = document.createElement("li");
    let style = "";
    if(element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div>${element.item}</div><div>
      <img class="complete todo-controls" src="/images/complete.png" onclick="CompleteTodoItem(this)"/>
      <img class="edit todo-controls" src="/images/edit.png" onclick="UpdateTodoItem(this)"/>
      <img class="delete todo-controls" onclick="DeleteTodoItem(this)" src="/images/delete.png" /></div>`;

    li.innerHTML = todoItems;
    listitems.appendChild(li);
  });
}

//UPDATE
//users are able to modify todo data that already presents in the list
function UpdateTodoItem(e) {
  //Once the user clicks edit, the selected task's value assigns to the input field
  if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
    todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == todoValue.value) {
      IsPresent = true;
    }
  });

  //check if the task already exist in the list
  if (IsPresent) {
    todoAlert.style.color = "red";
    setAlertMessage("This item already present in the list!");
    return;
  }

  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  //Changes are updated in the list as well as localstorage too.
  setLocalStorage();

  updateText.innerText = todoValue.value;
  addUpdateClick.setAttribute("onclick", "CreateTodoItems()");
  //clear input field and show response message for successfull update
  todoValue.value = "";
  todoAlert.style.color = "green";
  setAlertMessage("Todo item Updated Successfully!");
}


//DELETE
//delete todo button
function DeleteTodoItem(e) {
  let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
  //show a confirm alert message
  if(confirm(`Are you sure? Do you want to delete this -> ${deleteValue}?`)) {
    //if OK is pressed on the confirm window - the task data from the list with localstorage too will be automatically deleted
    //if user clicks cancel nothing will change
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todo.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todo.splice(element, 1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);
    setLocalStorage();

    //response message for deleting task
    todoAlert.style.color = "red";
    setAlertMessage("Task deleted!");
  }
}
