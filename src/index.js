const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const inititalTodos = [];
const model = createTodosModel(inititalTodos);
const view = createView('.js-output');
const storage = createStorage(TODOS_STORAGE_KEY);

const storageTodos = storage.pull();

if (storageTodos) {
    model.update(storageTodos);
}

view.render(model.get());

btnNode.addEventListener('click', function() {
    const todo = inputNode.value;
    model.add(todo);
    view.render(model.get());
    storage.push(model.get());
})