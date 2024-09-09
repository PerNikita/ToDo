export function createView(selector) {
    const node = document.querySelector(selector);

    return {
        node,
        render: function (todos) {
            todos.forEach((todo) => {
                this.addTodo(todo);
            });
        },
        clear: function() {
            this.node.innerHTML = '';
        },
        addTodo: function(todo) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');

            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', todo.id);

            console.log(todo.id);

            if (todo.done) {
                input.setAttribute('checked', true);
            }

            label.innerText = todo.title,
            label.setAttribute('for', todo.id);

            div.append(input, label);

            this.node.append(div);
        }
    }
}