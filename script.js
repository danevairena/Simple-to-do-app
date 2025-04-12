const todoValue = document.getElementById("todoText"),
    listitems = document.getElementById("list-items"),
    addUpdateClick = document.getElementById("AddUpdateClick");

function CreateToDoData() {
    alert(todoValue.value);
    if(todoValue.value) {

    }
}



/*let todoList = [];

//Save tot list to localstorage
const saveTodo = (todoList) => {
    if (localStorage && todoList.length)
        //LocalStorage can only store strings
        //JSON.stringify() method converts the value into a string representation before sending it to local storage.
        localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  const getTodo = () => {
    let todoList;
    if (localStorage && localStorage.getItem("todoList")) {
        //JSON.parse() method converts the value from its string representation back to the original form
      todoList = JSON.parse(localStorage.getItem("todoList"));
    }
    return todoList || [];
  };

function addTask() {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var text = document.getElementById("task").value;
    li.textContent = text; // Setting the text
    ul.appendChild(li); // Appending new li to ul
}*/