// first click is predefind click event and other one is function Name 
// document.querySelector(".add").addEventListener("click", click)
var add = document.querySelector(".add");
var input = document.querySelector(".input");
var totalItems = document.querySelector(".total-items");
var mainInputIcon = document.querySelector(".fas");
var footerUl = document.querySelector(".list");
footerUl.style.display = "none";
var allFlip = true;

// array for data collection
// and function to push objects in array
var todoData = JSON.parse(localStorage.getItem('todos')) || [];
var delItems = [];
// ==============================================================================================
// addtodo function to create object and push it into array
// ==============================================================================================
function arrData() {
  if (input.value.trim()) {
    var newObj = {
      todoText: input.value,
      todoStatus: false
    };
    todoData.unshift(newObj);
    localStorage.setItem("todos", JSON.stringify(todoData));
    displayTodo(todoData);
  }
}

// ==============================================================================================
// toggle function
// ==============================================================================================


function toggelTodo(e) {
  var id = e.target.dataset.id;
  todoData[id].todoStatus = !todoData[id].todoStatus;
  localStorage.setItem("todos", JSON.stringify(todoData));
  filterdLength();
  displayTodo(todoData);
}

add.addEventListener("click", arrData);

// ==============================================================================================
// display function
// ==============================================================================================

// todo list add-btn click function
function displayTodo(arrayData = []) {

  if (todoData.length == 0) {
    footerUl.style.display = "none";
  } else {
    footerUl.style.display = "flex";
  }

  var ul = document.querySelector(".task-list")
  ul.innerHTML = "";

  arrayData.forEach((todo, index) => {
    var li = document.createElement("li");

    li.setAttribute("class", "todo-list");
    li.style.display = "flex";

    var checkBox = document.createElement("input");

    // checkbox is true or false will 
    checkBox.checked = todo.todoStatus;
    checkBox.type = "checkbox";
    checkBox.classList.add("roundCheckBox");
    checkBox.setAttribute('data-id', index);
    checkBox.addEventListener('click', toggelTodo)

    li.appendChild(checkBox);

    filterdLength();

    var p = document.createElement("p");

    p.setAttribute("class", "todoText");
    if (todo.todoStatus) {
      p.classList.add('completed')
    }
    p.innerText = todo.todoText;
    li.appendChild(p);

    var cancelBtn = document.createElement("span");

    cancelBtn.setAttribute("class", "crossBtn");
    cancelBtn.innerHTML = '<i class="fas fa-times"></i>';

    // for deleting the todo list
    // set setAttribute for identification of list items
    cancelBtn.setAttribute("data-id", index);

    // set addEventListener for the information that on whitch element action happend 
    cancelBtn.addEventListener("click", (e) => {
      // storing the id value  
      var del = e.target.dataset.id;
      // splicing the value from the array
      delItems.push(todoData.splice(del, 1));
      displayTodo(todoData);
      filterdLength();
    });

    li.appendChild(cancelBtn);
    ul.appendChild(li);
  });

  input.value = "";
}

// ==============================================================================================
// enter button event // function for adding todo list by press enter btn
// ==============================================================================================	
function enter(e) {
  if (e.keyCode === 13) {
    arrData();
    footerUl.style.display = "flex";
  }
}

var flag = true;
input.addEventListener("keydown", enter);


// ==============================================================================================
// all, pending/  show *****active******  task function
// ==============================================================================================

var all = document.querySelector(".list-2 .all").addEventListener("click", () => displayTodo(todoData));

var active = document.querySelector(".active");

function pendingTask() {
  var pending = todoData.filter(value => value.todoStatus === false);
  displayTodo(pending);
}

active.addEventListener("click", pendingTask);


// ==============================================================================================
// show only complete task function
// ==============================================================================================
var complete = document.querySelector(".completed");

function allCompleteTask() {
  var showComplete = todoData.filter(value => value.todoStatus === true);
  displayTodo(showComplete);
}
complete.addEventListener("click", allCompleteTask);


// ==============================================================================================
// clear completed task function
// ==============================================================================================	
var removeCompleted = document.querySelector(".clear");

function rmCompleted() {

  // asign new value to var data by filtering it and then call the main display function  
  todoData = todoData.filter(v => v.todoStatus == false);
  displayTodo(todoData);
}
removeCompleted.addEventListener("click", rmCompleted);


// ==============================================================================================
// all task select by clicking on the input icon
// ==============================================================================================
function allCheck(e) {
  var allTaskCheck = todoData.map(value => {
    value.todoStatus = allFlip;
    return value;
  });
  localStorage.setItem("todos", JSON.stringify(allTaskCheck));
  displayTodo(allTaskCheck);

  allFlip = !allFlip;
}

mainInputIcon.addEventListener("click", allCheck)


// ==============================================================================================
// filtered function
// ==============================================================================================	

function filterdLength() {
  var taskLeft = todoData.filter(value => value.todoStatus === false).length;
  totalItems.innerText = `${taskLeft} items left`;
}

// ==============================================================================================
// actve class function for all items btn
// ==============================================================================================
document.querySelector(".all").classList.add("class", "activeListBorder")

function allTodoTask() {
  document.querySelector(".all").classList.add("class", "activeListBorder");
  document.querySelector(".active").classList.remove("activeListBorder");
  document.querySelector(".completed").classList.remove("activeListBorder");
}
document.querySelector(".all").addEventListener("click", allTodoTask);


// ==============================================================================================
// actve class function for active task btn
// ==============================================================================================
function activeTodoTask() {
  document.querySelector(".all").classList.remove("class", "activeListBorder");
  document.querySelector(".active").classList.add("activeListBorder");
  document.querySelector(".completed").classList.remove("activeListBorder");
}
document.querySelector(".active").addEventListener("click", activeTodoTask);


// ==============================================================================================
// actve class function for complete todo task
// ==============================================================================================
function doneTodoTask() {
  document.querySelector(".all").classList.remove("class", "activeListBorder");
  document.querySelector(".active").classList.remove("activeListBorder");
  document.querySelector(".completed").classList.add("activeListBorder");
}
document.querySelector(".completed").addEventListener("click", doneTodoTask);

// function footerListDisplay(){
// 		if(arrData.length == 0){
// 					footerUl.style.display = "none";
// 				}else{
// 					footerUl.style.display = "flex";
// 			}
// 		}