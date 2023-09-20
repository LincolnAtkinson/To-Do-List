let b = document.querySelectorAll('button.list');
b.forEach(function(b) {
    b.addEventListener('click', function() {
        let i = document.querySelector('.selected');
        if (i) {
            i.classList.toggle('selected');
            i.classList.toggle('list');
        }
        else {
            console.log('selected not found');
        }
        b.classList.toggle('selected');
        b.classList.toggle('list');
        newClick(b);
    })
});

let title = document.getElementById('title');
function newClick(a) {
    title.textContent = a.textContent;
};

const lists = [
    { id: 1, name: 'Shopping list' },
    { id: 2, name: 'Schedule' }
];

const currentListId = 1;

const currentList = {
    name: "Shopping list",
    todos: [
        {
            text: 'milk',
            completed: false
        },
        {
            text: 'A wee bit of honey',
            completed: false
        }
    ]
};

function render() {
    let listsHtml = '<ul class="list-group">';
    lists.forEach((list) => {
        listsHtml += `<li class="list-group-item">${list.name}</li>`;
    });
    listsHtml += '</ul>';
    // Replace 'lists' with the ID of the element where you want to render the lists
    document.getElementById('lists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="list-group-item">${todo.text}</li>`;
    });
    // Replace 'current-list-todos' with the ID of the element where you want to render todos
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}

// Call the render function to display lists and todos
render();