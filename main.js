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
        todos: [
            {
                text: 'June 4',
                completed: false
            },
            {
                text: 'July 21',
                completed: false
            }
        ]
    }
];

let currentListId = 0;
const currentList = {};
let i;
let b = document.querySelectorAll('button.list');

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
        listsHtml += `<li class="list-group-item"><button id="${list.id}" class="list w-full bg-gray-300 h-14 text-2xl flex justify-center items-center">${list.name}</button></li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="list-group-item"><input type="checkbox">${todo.text}</li>`;
    });
    document.getElementById('current-list-todos').innerHTML = todosHtml;
    i = document.getElementById(currentListId);
    i.classList.add('selected');
    i.classList.remove('list');
    addButtons();
}

render();

function addButtons() {
    b = document.querySelectorAll('button.list');
    b.forEach(function(b) {
        b.addEventListener('click', function() {
            currentListId = b.id;
            i.classList.add('list');
            i.classList.remove('selected');
            i = b;
            i.classList.add('selected');
            i.classList.remove('list');
            showCurrentList(lists, currentListId);
        })
    });
}