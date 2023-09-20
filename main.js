const lists = [
    {
        id: 0,
        name: 'Shopping list',
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
    }
];

const currentListId = 0;
const currentList = {};

function showCurrentList(list, index) {
    currentitem = list[index];
    currentList.name = currentitem.name;
    currentList.todos = currentitem.todos;
    return currentList;
};

showCurrentList(lists, currentListId);

function render() {
    let listsHtml = '<ul class="list-group">';
    lists.forEach((list) => {
        listsHtml += `<li class="list-group-item"><button id="${list.id}" class="list w-full bg-gray-300 h-14 text-2xl flex justify-center items-center">${list.name}</button></li>`;
    });
    listsHtml += '</ul>';
    // Replace 'lists' with the ID of the element where you want to render the lists
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="list-group-item"><input type="checkbox">${todo.text}</li>`;
    });
    // Replace 'current-list-todos' with the ID of the element where you want to render todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

// Call the render function to display lists and todos
render();

let b = document.querySelectorAll('button.list');
b.forEach(function(b) {
    b.addEventListener('click', function() {
        let i = document.querySelector('.selected');
        if (i) {
            i.classList.toggle('selected');
            i.classList.toggle('list');
        }
        b.classList.toggle('selected');
        b.classList.toggle('list');
    })
});