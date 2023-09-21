let title = document.getElementById('title');
function newClick(a) {
    title.textContent = a.textContent;
};

const lists = [
    {
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
        listsHtml += `<li class="list-group-item"><button class="list w-full h-14">${list.name}</button></li>`;
    });
    listsHtml += '</ul>';
    console.log(listsHtml);
    
    document.getElementById('mainLists').innerHTML = listsHtml;
    document.getElementById('current-list-name').innerText = currentList.name;

    let todosHtml = '<ul class="list-group-flush">';
    currentList.todos.forEach((todo) => {
        todosHtml += `<li class="current-list-todos"><input type="checkbox" id="check">${todo.text}</li>`;
    });
    
    document.getElementById('current-list-todos').innerHTML = todosHtml;
}


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
        newClick(b);
    })
});
