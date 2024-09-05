import { TODOS_STORAGE_KEY } from "./constants";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector('.js-input');
const btnNode = document.querySelector('.js-btn');
const btnClearNode = document.querySelector('.js-clear-btn');

const inititalTodos = [];
const model = createTodosModel(inititalTodos);
const view = createView('.js-output');
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((todos) => {
    model.update(todos);
    view.render(model.get());

});

btnNode.addEventListener('click', function() {
    const todo = {
        title: inputNode.value,
        status: 'active'

    };
    model.add(todo);

    view.render(model.get());

    storage.push(todo);

})

btnClearNode.addEventListener('click', function() {
    storage.delete(model.get());

    model.clear();

    view.render(model.get());
})