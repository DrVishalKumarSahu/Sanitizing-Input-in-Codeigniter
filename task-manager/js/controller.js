/*
Create a simple task manager using html css and javascript.This task manager has 2 vertical sections:
- Todo: List of tasks to be done
- Done: List of tasks which have already been done.

Each task will have a name and a description. 
There should be an empty form on the top of the 'Todo' list. 
A user can create a task in the 'Todo' list  by filling up that form. 
Once the task is done, he/she can move that task to the 'Done' section. 
You can either implement this using a button called 'Done' on every task on the 'Todo' list 
or by dragging and dropping the task from one list to another. 
The user should be able to see his/her lists whenever he/she opens the app in the browser. 
For this you will need to save the list in localStorage every time a change has been made in the list.https://www.w3schools.com/jsref/prop_win_localstorage.asp


You are free to use any css framework or not to use it. However you can only use pure Javascript.

*/

// One has to load the tasks from localStorage
// Copy and paste the following in your console to see how you can store it in localStorage:
// - localStorage.setItem("tm_list", JSON.stringify([{ name: "Create HTML and CSS", description: "Simple layout wth HTML and CSS" }]))
// - localStorage.getItem("tm_list")
// - JSON.parse(localStorage.getItem("tm_list"))

// new Date().valueOf()

// Alternative choice of list structure 
let tasks = [
	// {
	// 	title: "Task Title",
	// 	description: "Task Description",
	// 	date_added: 1623951099481,
	// 	date_last_updated: 1623951099481,
	// 	status: 0
	// }
];

// Populates list
// Creates DOM for the lists
// Could be used every time the lists are updated

function populateLists(){
	// Loop through list or lists of tasks 
	// add an html structure corresponding to each task to respective lists
	// Ideally the last task added should be on top
	let task_done_id = 'tasks--done-1';
	let task_todo_id = 'tasks--todo-1';
	let task_id_to_append = task_todo_id;
	tasks = tasks.length ? tasks : getFromStorage();
	if(!tasks.length || !getFromStorage().length) {
		// Show no tasks are there
		document.getElementById(task_todo_id).innerHTML = "No tasks in the list. Please add new task.";
		document.getElementById(task_done_id).innerHTML = "You don't have any completed task.";
	}else{
		// Remove old task before populating new task list
		document.getElementById(task_todo_id).innerHTML = "";
		document.getElementById(task_done_id).innerHTML = "";

		tasks = tasks.sort((a, b) => a.date_added > b.date_added ? -1 : 1);
	
		for (let index = 0; index < tasks.length; index++) {
			let task = tasks[index];
			let title = task['title'];
			let description = task['description'];
			let date_added = task['date_added'];
			let date_last_updated = task['date_last_updated'];
	
			let el_task = document.createElement("div");
			let el_task_title = document.createElement("h3");
			let el_task_desc = document.createElement("p");
			let el_task_button = document.createElement("button");
			let el_task_datetime = document.createElement("span");
	
			let date = new Date(task.status ? date_last_updated : date_added);

			let datetime = (date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds());

			el_task_title.setAttribute('class', 'task--title');
			el_task_desc.setAttribute('class', 'task--desc');
			el_task_datetime.setAttribute('class', 'w3-small w3-text-gray w3-margin-left ');
	
			el_task_title.innerHTML = title;
			el_task_desc.innerHTML = description;
			el_task_datetime.innerHTML = datetime;
	
			el_task.appendChild(el_task_title);
			el_task.appendChild(el_task_desc);
			el_task.appendChild(el_task_button);
			el_task.appendChild(el_task_datetime);
	
			if(task.status == 1) {
				el_task.setAttribute('class', 'task w3-leftbar w3-border-green');
				el_task_button.innerHTML = "Delete &times;";
				el_task_button.setAttribute('onClick', 'deleteTask('+ index +');');
				el_task_button.setAttribute('class', 'w3-btn w3-red task--action');
				task_id_to_append = task_done_id;
				document.getElementById(task_id_to_append).appendChild(el_task);
			}else if(task.status == 0) {
				el_task.setAttribute('class', 'task w3-leftbar w3-border-red');
				el_task_button.innerHTML = "Mark as Done &rarr;";
				el_task_button.setAttribute('onClick', 'moveTask('+ index +', 1);');
				el_task_button.setAttribute('class', 'w3-btn w3-green task--action');
				task_id_to_append = task_todo_id;
				document.getElementById(task_id_to_append).appendChild(el_task);
			}
		}
	}
}

// Saves to localStorage
function saveToStorage(){
	localStorage.setItem('tasks-list', JSON.stringify(tasks));
}

// Returns from localStorage
function getFromStorage(){
	let data = [];
	try{
		data = localStorage.getItem('tasks-list');
		data = JSON.parse(data);
	}catch(e) {}
	return data || [];
}

// Adds new task to ToDo list
// Triggers onclick on add
function addNewTask() {
	// Add a task {title: "", description: ""} or {title: "", description: "", type: ""} to corresponding list
	let title = document.getElementsByName('title')[0];
	let description = document.getElementsByName('description')[0];
	// Clear out the input form
	if(title.value) {
		tasks.push({
			title: title.value,
			description: description.value || "",
			date_added: new Date().valueOf(),
			date_last_updated: new Date().valueOf(),
			status: 0
		});
		saveToStorage();
		// Populate the lists in HTML
		populateLists();
		title.value = "";
		description.value = "";
	}
	// Save to localStorage
	return false;
}

// Moves task to Done list
// Triggers onclick of done
function moveTask(index, type = 1) {
	// Move a task {title: "", description: ""} from todo list to done list
	// Or change type of task {title: "", description: "", type: ""}
	if(tasks[index]) {
		tasks[index].date_last_updated = new Date().valueOf();
		tasks[index].status = type;
		// Save to localStorage
		saveToStorage();
		// Populate the lists in HTML
		populateLists();
	}else{
	}
}

// Deletes task from done list
// Triggers on click of delete
function deleteTask(index) {
	// Remove the task from list
	tasks.splice(index, 1);
	// Save to localStorage
	saveToStorage();
	// Populate the lists in HTML
	populateLists();
}

populateLists();
