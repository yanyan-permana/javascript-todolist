const dataTodo = ['Selalu bersyukur'];
const btnAddTodo = document.getElementById('btn-add-todo');

function clearTodo() {
    const tBodyTodo = document.getElementById('body-todo');   
    while (tBodyTodo.firstChild) {
        tBodyTodo.removeChild(tBodyTodo.firstChild);
    }
}

function buildTodo() {
    clearTodo();
    dataTodo.forEach((value, index) => {
        const searchDataTodo = document.getElementById('search-todo').value;
        if (value.toLowerCase().includes(searchDataTodo.trim().toLowerCase())) {
            const tBodyTodo = document.getElementById('body-todo');    
            const trTodo = document.createElement('tr');

            const tdTodo = document.createElement('td');
            tdTodo.setAttribute('id', 'td'+index);
            tdTodo.textContent = value;

            const tdAction = document.createElement('td');        
            const btnEdit = document.createElement('a');
            const btnDelete = document.createElement('a');

            btnEdit.setAttribute('href', '#');
            btnEdit.classList.add('badge', 'badge-success', 'mr-1');
            btnEdit.onclick = () => editTodo(value, index);
            btnEdit.textContent = 'Edit';

            btnDelete.setAttribute('href', '#');
            btnDelete.classList.add('badge', 'badge-danger');
            btnDelete.onclick = () => deleteTodo(index);
            btnDelete.textContent = 'Hapus';

            tdAction.appendChild(btnEdit);
            tdAction.appendChild(btnDelete);

            trTodo.appendChild(tdTodo);
            trTodo.appendChild(tdAction);

            tBodyTodo.appendChild(trTodo);
        }
    });    
};

buildTodo();

btnAddTodo.addEventListener('click', () => {
    let inputTodo = document.getElementById('input-todo');

    if (inputTodo.value != '') {
        dataTodo.push(inputTodo.value);
        inputTodo.value = '';
        buildTodo();
    }
});

const searchTodo = document.getElementById('search-todo');
searchTodo.onkeydown = () => buildTodo();
searchTodo.onkeyup = () => buildTodo();

function editTodo(value, index) {
   const td = document.getElementById('td' + index);
   td.innerHTML = `<input type="text" class="form-control" id="edit-todo" value="${value}" onblur="onBlurInputEdit('${value}', '${index}')">`;
}

function onBlurInputEdit(value, index) {
    const td = document.getElementById('td' + index);
    const editTodo = document.getElementById('edit-todo').value;
    td.textContent = editTodo;

    const indexDataTodo = dataTodo.indexOf(value);
    dataTodo[indexDataTodo] = editTodo;

    console.log(dataTodo);
}

function deleteTodo(index) {
   dataTodo.splice(index, 1);
   buildTodo();
}