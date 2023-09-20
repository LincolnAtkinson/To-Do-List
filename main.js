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
    })
});