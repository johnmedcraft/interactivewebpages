var taskInput = document.getElementById("new-task"); //NEW TASK
var addButton = document.getElementsByTagName("button")[0]; //FIRST BUTTON ON THE PAGE
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //UL  #INCOMPLETE-TASKS
var completedTasksHolder = document.getElementById("completed-tasks"); //UL #COMPLETED-TASKS

//NEW TASK LIST ITEM
var createNewTaskElement = function(taskString){
	//CREATE LIST ITEM
	var listItem = document.createElement("li");
	//CREATE INPUT (CHECKBOX)
	var checkBox = document.createElement("input");
	//CREATE LABEL
	var label = document.createElement("label");
	//CREATE INPUT (TEXT)
	var editInput = document.createElement("input");
	//CREATE BUTTON.EDIT
	var editButton = document.createElement("button");
	//CREATE BUTTON.DELETE
	var deleteButton = document.createElement("button");
	//EACH ELEMENT NEEDS TO BE MODIFIED
	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";
	label.innerText = taskString;
	//EACH ELEMENT NEEDS TO BE APPENDED
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

//ADD A NEW TASK
var addTask = function(){
	//CREATE A NEW LIST ITEM WITH TEXT FROM THE NEW TASK
	var listItem = createNewTaskElement(taskInput.value);
	//APPEND LISTITEM TO INCOMPLETETASKSHOLDER
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}

//EDIT AN EXISTING TASK
var editTask = function(){
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var containsClass = listItem.classList.contains("editMode");
	//IF CLASS OF PARENT IS EDITMODE
	if(containsClass){
		//SWITCH BACK FROM EDITMODE
		//LABEL TEXT BECOME THE INPUT VALUE
		label.innerText = editInput.value;
	}else{
		//SWITCH TO EDITMODE
		//INPUT VALUE BECOMES THE LABEL TEXT
		editInput.value = label.innerText;
	}
	//^^TOGGLE EDITMODE^^//
	listItem.classList.toggle("editMode");
}

//DELETE AN EXISTING TASK
var deleteTask = function(){
	//WHEN DELETE BUTTON IS PRESSED
		var listItem = this.parentNode;
		var ul = listItem.parentNode;
		//REMOVE PARENT LIST ITEM FROM THE UL		
		ul.removeChild(listItem);
}

//MARK A TASK AS COMPLETE
var taskCompleted = function(){
	//WHEN CHECKBOX IS CHECKED
		//APPEND THE TASK LIST ITEM TO THE #COMPLETED-TASKS
		var listItem = this.parentNode;
		completedTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskIncomplete);
}

//MARK A TASK AS INCOMPLETE
var taskIncomplete = function(){
	//WHEN CHECKBOX IS UNCHECKED
		//APPEND THE TASK LIST ITEM TO THE #INCOMPLETE-TASKS
		var listItem = this.parentNode;
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	//SELECT ITS CHILDREN
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	//BIND EDITTASK TO EDIT BUTTON
	editButton.onclick = editTask;
	//BIND DELETETASK TO DELETE BUTTON
	deleteButton.onclick = deleteTask;
	//BIND CHECKBOXEVENTHANDLER TO CHECKBOX
	checkBox.onchange = checkBoxEventHandler;
}


//SET THE CLICK HANDLER TO THE ADDTASK FUNCTION
addButton.onclick = addTask;

//CYCLE OVER INCOMPLETETASKSHOLDER UL LIST ITEMS
for(var i = 0; i < incompleteTasksHolder.children.length; i++){
	//BIND EVENTS TO LIST ITEM'S CHILDREN (TASKCOMPLETED)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//CYCLE OVER COMPLETEDTASKSHOLDER UL LIST ITEMS
for(var i = 0; i < completedTasksHolder.children.length; i++){
	//BIND EVENTS TO LIST ITEM'S CHILDREN (TASKINCOMPLETE)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}