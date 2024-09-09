import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const inititalTodos = [];
const model = createTodosModel(inititalTodos);
const view = createView('.js-output', handleClickTodo);
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
    model.setTodos(todos);
    view.renderTodos(model.getTodos());

});

btnNode.addEventListener('click', function() {
    const todoTitle = inputNode.value;

    const todo = model.addTodo({ 
        title: todoTitle
     });

     view.addTodo(todo);

    storage.push(todo);

})

btnClearNode.addEventListener('click', function() {
    storage.delete(model.getTodos());


    model.setTodos([]);

    view.clearTodos();
})

function handleClickTodo(id) {
    model.toggleTodo(id);
    storage.update(model.getTodo(id));
}