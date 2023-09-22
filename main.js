const lists = [
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
    }
];

var input = document.getElementById('userInput');
let currentListId = 0;
const currentList = {};
var sel;
let b = document.querySelectorAll('button.list');
let t = document.querySelectorAll('trash');

function showCurrentList(list, index) {
    currentitem = list[index];
    currentList.name = currentitem.name;
    currentList.todos = currentitem.todos;
    render();
    return currentList;
};

showCurrentList(lists, currentListId);

function render() {
    let listsHtml = '<ul class="list-group">';
    lists.forEach((list) => {
        listsHtml += `<li class="list-group-item"><button id="${list.id}" class="list w-full bg-gray-300 h-14  flex justify-around items-center px-10"><span class="trash"></span>${list.name}<button id="${list.id}" class="trash"><i class="fa-solid fa-trash fa-xs"></i></button><span class="tresh"></span></button></li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="current-list-todos"><input type="checkbox" id="check">${todo.text}</li>`;
    });
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    console.log(sel);
    sel = document.getElementById(currentListId);
    sel.classList.add('selected');
    sel.classList.remove('list');
    console.log(sel);
    addButtons();
    addDelete();
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

function addDelete() {
    t = document.querySelectorAll('button.trash');
    t.forEach(function(t) {
        t.addEventListener('click', function() {
            deleteItem(t.id);
            render();
            console.log(lists);
        })
    })
}

function deleteItem(index) {
    if (index >= 0 && index < lists.length) {
        lists.splice(index, 1);
        //console.log(sel);
        if (currentListId === 0) {
            sel = document.getElementById('1');
        }
        else {
            sel = document.getElementById(currentListId - 1);
        }
        //console.log(sel);
        for (let i = index; i < lists.length; i++) {
            lists[i].id = i + 1;
        }
    }
}