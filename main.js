let lists = [
    {
        id: 0,
        name: 'Example',
        todos: [
            {
                id: 100,
                text: 'test',
                completed: false
            },
            {
                id: 101,
                text: 'a wee bit of honey',
                completed: false
            }
        ]
    }
];

var input = document.getElementById('userInput');
var taskInput = document.getElementById('enter');
var clear = document.getElementById('clear');
let currentListId = 0;
const currentList = {};
var sel;
let b = document.querySelectorAll('button.list');
let t = document.querySelectorAll('trash');
load();

function showCurrentList(list, index) {
    currentitem = list[index];
    currentList.name = currentitem.name;
    currentList.todos = currentitem.todos;
    render();
    return currentList;
};

showCurrentList(lists, currentListId);

function render() {
    let listsHtml = '<ul class="list-group" id="sort">';
    lists.forEach((list) => {
        listsHtml += `<li class="list-group-item" draggable="true"><button id="${list.id}" class="list w-full bg-gray-300 h-14 flex justify-around items-center "><span class="trash"></span>${list.name}<button id="${list.id}" class="trash"><i class="fa-solid fa-trash fa-xs"></i></button><span class="tresh"></span></button></li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        if (todo.completed === true) {
            todosHtml += `<li class="current-list-todos green" id="${todo.id}"><input type="checkbox" class="check" checked><span>${todo.text}</span><button class="editTodo"></button> <input class="edit hide" type="text"><button class="delete comp">Delete</button></li>`;
        }
        else if (todo.completed === false) {
            todosHtml += `<li class="current-list-todos red" id="${todo.id}"><input type="checkbox" class="check"><span>${todo.text}</span><button class="editTodo"><i class="fa-solid fa-pen-to-square"></i></button> <input class="edit hide" type="text"><button class="delete hide">Delete</button></li>`;
        }
    });
    todosHtml += '</ul>';
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    sel = document.getElementById(currentListId);
    sel.classList.add('selected');
    sel.classList.remove('list');
    addButtons();
    addDelete();
    editTodo();
    DragnDrop();
    complete();
    save();
}

render();
//Makes it so you can switch between different lists
function addButtons() {
    b = document.querySelectorAll('button.list');
    b.forEach(function(b) {
        b.addEventListener('click', function() {
            currentListId = b.id;
            sel.classList.add('list');
            sel.classList.remove('selected');
            sel = b;
            sel.classList.add('selected');
            sel.classList.remove('list');
            showCurrentList(lists, currentListId);
        })
    });
}

//Makes it so you can edit your todos
function editTodo() {
    e = document.querySelectorAll('button.editTodo');
    e.forEach(function(e) {
        e.addEventListener('click', function() {
            var listItem = e.closest('li');
            var editInput = listItem.querySelector('input.edit');
            var del = listItem.querySelector('button.delete');
            var todoText = listItem.querySelector('span');
            
            editInput.classList.toggle('hide');
            del.classList.toggle('hide');
            
            editInput.value = todoText.textContent;

            editInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    todoText.textContent = editInput.value;
                    editInput.classList.toggle('hide');
                    del.classList.toggle('hide');
                    
                    var todoId = listItem.id;
                    console.log(listItem.id);
                    var currentList = lists[currentListId];
                    var todoToUpdate = currentList.todos.find(todo => todo.id == todoId);
                    if (todoToUpdate) {
                        todoToUpdate.text = editInput.value;
                        save();
                    }
                }
            });

            del.addEventListener('click', function() {
                var todoId = listItem.id;
                var currentList = lists[currentListId];
                var todoToDeleteIndex = currentList.todos.findIndex(todo => todo.id == todoId);
                if (todoToDeleteIndex !== -1) {

                    currentList.todos.splice(todoToDeleteIndex, 1);
                    
                    for (let i = 0; i < currentList.todos.length; i++) {
                        currentList.todos[i].id = 100 + i;
                    }

                    save();
                    render();
                }
            });
        })
    })
}

function complete() {
    const tasks = document.querySelectorAll('input.check');
    tasks.forEach(function(tasks) {
        tasks.addEventListener('click', function() {
            const li = tasks.closest('li');
            const ed = (li.id - 100);
            if (lists[currentListId].todos[ed].completed === true) {
                lists[currentListId].todos[ed].completed = false;
            }
            else if (lists[currentListId].todos[ed].completed === false) {
                lists[currentListId].todos[ed].completed = true;
            }
            save();
            render();

            const deleteButtons = document.querySelectorAll('button.comp');
            deleteButtons.forEach(function (deleteButtons) {
                deleteButtons.addEventListener('click', function () {
                    var todoId = li.id;
                    var currentList = lists[currentListId];
                    var todoToDeleteIndex = currentList.todos.findIndex(todo => todo.id == todoId);
                    if (todoToDeleteIndex !== -1) {
                        currentList.todos.splice(todoToDeleteIndex, 1);
                        for (let i = 0; i < currentList.todos.length; i++) {
                            currentList.todos[i].id = 100 + i;
                        }
                        save();
                        render();
                    }
                })
            })
        });
    });
};

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (input.value.trim() !== '') {
            let newList = {
                id: lists.length,
                name: input.value.trim(),
                todos: []
            }
            lists.push(newList);
            input.value = '';
            render();
        }
    }
})

taskInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (taskInput.value.trim() !== '') {
            let curr = lists[currentListId];
            let newTask = {
                id: curr.todos.length + 100,
                text: taskInput.value.trim(),
                completed: false
            }
            curr.todos.push(newTask);
            taskInput.value = '';
            render();
        }
    }
})

//Lets you clear all completed tasks
clear.addEventListener('click', function() {
    var currL = lists[currentListId];
    for (let i = 0; i < currL.todos.length; i++) {
        if (currL.todos[i].completed === true) {
            currentList.todos.splice(i, 1);
        }
    }
    for (let i = 0; i < currL.todos.length; i++) {
        currL.todos[i].id = 100 + i;
    }
})

//makes the trash can icon a delete button
function addDelete() {
    t = document.querySelectorAll('button.trash');
    t.forEach(function(t) {
        t.addEventListener('click', function() {
            deleteItem(t.id);
            render();
        })
    })
}
//You can now delete lists
function deleteItem(index) {
    if (index >= 0 && index < lists.length) {
        lists.splice(index, 1);
        if (currentListId >= lists.length) {
            currentListId = Math.max(0, lists.length - 1);
        }
        for (let i = index; i < lists.length; i++) {
            lists[i].id = i;
        }
        showCurrentList(lists, currentListId);
    }
}

function reorder(item, sibling) {
    const movedId = parseInt(item.children[0].id);
    const placeId = parseInt(sibling.children[0].id);

    const movedItem = lists.find(item => item.id === movedId);
    const placeItem = lists.find(item => item.id === placeId);

    const movedIndex = lists.indexOf(movedItem);
    const placeIndex = lists.indexOf(placeItem);

    lists.splice(movedIndex, 1);

    lists.splice(placeIndex, 0, movedItem);

    for (let i = 0; i < lists.length; i++) {
        lists[i].id = i;
    }

    save();
}

function DragnDrop() {
    const sort = document.getElementById("sort");
    let draggedItem = null;

    const listItems = document.querySelectorAll("li");

    listItems.forEach((item) => {
        item.addEventListener("dragstart", (event) => {
        draggedItem = item;
        event.dataTransfer.setData("text/plain", item.id);
        });
    });

    sort.addEventListener("dragover", (event) => {
        event.preventDefault();
        const targetItem = event.target.closest("li");

        if (targetItem && draggedItem !== targetItem) {
        const y = event.clientY - targetItem.getBoundingClientRect().top;
        const insertBefore = y < targetItem.clientHeight / 2;

        if (insertBefore) {
            sort.insertBefore(draggedItem, targetItem);
        } else {
            sort.insertBefore(draggedItem, targetItem.nextSibling);
        }
        }
    });
    sort.addEventListener("dragend", () => {
        reorder(draggedItem, draggedItem.nextSibling);
        draggedItem = null;
    });
}

DragnDrop();

function save() {
    
    localStorage.setItem('currentListId', JSON.stringify(currentListId)); 
    localStorage.setItem('lists', JSON.stringify(lists));
}

const keyStates = {};

document.addEventListener('keydown', (event) => {
    keyStates[event.key] = true;
    checkKeys();
})
document.addEventListener('keyup', (event) => {
    keyStates[event.key] = false;
})

//Lets you reset your local save
function checkKeys() {
    if (keyStates['z'] && keyStates['p'] && keyStates['g']) {
        console.log('presssss');
        var exList = [
            {
                id: 0,
                name: 'Example',
                todos: [
                    {
                        id: 100,
                        text: 'test',
                        completed: false
                    },
                    {
                        id: 101,
                        text: 'a wee bit of honey',
                        completed: false
                    }
                ]
            }
        ];
        localStorage.setItem('currentListId', JSON.stringify(0));
        localStorage.setItem('lists', JSON.stringify(exList));
        lists = exList;
        currentListId = 0;
        showCurrentList(lists, currentListId);
    }
}

function load() {
    const storedCurrentListId = localStorage.getItem('currentListId');
    const storedLists = localStorage.getItem('lists');

        if (storedCurrentListId) {
        currentListId = JSON.parse(storedCurrentListId);
        }

        if (storedLists) {
        lists = JSON.parse(storedLists);
        }
}