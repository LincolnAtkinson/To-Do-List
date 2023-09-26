let lists = [
    {
        id: 0,
        name: 'Shopping List',
        todos: [
            {
                text: 'bananas',
                completed: false
            },
            {
                text: 'a wee bit of honey',
                completed: false
            }
        ]
    },
    {
        id: 1,
        name: 'Schedule',
        todos: [
            {
                text: 'sleep',
                completed: false
            },
            {
                text: 'homework',
                completed: false
            }
        ]
    },
    {
        id: 2,
        name: 'People',
        todos: [
            {
                text: 'james',
                completed: false
            },
            {
                text: 'ur mom',
                completed: false
            }
        ]
    },
    {
        id: 3,
        name: 'Vacation Dates',
        todos: []
    },
];

var input = document.getElementById('userInput');
var taskInput = document.getElementById('enter');
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
        listsHtml += `<li class="list-group-item" draggable="true"><button id="${list.id}" class="list w-full bg-gray-300 h-14  flex justify-around items-center "><span class="trash"></span>${list.name}<button id="${list.id}" class="trash"><i class="fa-solid fa-trash fa-xs"></i></button><span class="tresh"></span></button></li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="current-list-todos"><input type="checkbox" class="check">${todo.text} <button id="editTodo" onclick="editItem()"><i class="fa-solid fa-pen-to-square"></i></button> <input  class="edit hidden" type = "text"></li>`;
    });
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    sel = document.getElementById(currentListId);
    sel.classList.add('selected');
    sel.classList.remove('list');
    addButtons();
    addDelete();
    save();
}

render();

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
                text: taskInput.value.trim(),
                completed: false
            }
            curr.todos.push(newTask);
            taskInput.value = '';
            render();
        }
    }
})

function addDelete() {
    t = document.querySelectorAll('button.trash');
    t.forEach(function(t) {
        t.addEventListener('click', function() {
            deleteItem(t.id);
            render();
        })
    })
}

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

function editItem() {

}

const sort = document.getElementById("sort");
let draggedItem = null;
const listItems = document.querySelectorAll("li");

listItems.forEach((item)=>{
   item.addEventListener("dragstart", (event) =>{
    draggedItem = item;
    event.dataTransfer.setData("text/plain", item.id);
   }); 
});

sort.addEventListener("dragover", (event) =>{
    event.preventDefault();
    const targetItem = event.target.closest("li")
    if (targetItem && draggedItem !== targetItem){
        const y = event.clientY - targetItem.getBoundingClientRect().top;
        const insertBefore = y < targetItem.clientHeight / 2;

        if (insertBefore) {
            sort.insertBefore(draggedItem, targetItem);
        } else {
            sort.insertBefore(draggedItem, targetItem.nextSibling);
        }
    }
});



function save() {
    localStorage.setItem('currentListId', JSON.stringify(currentListId)); 
    localStorage.setItem('lists', JSON.stringify(lists));
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