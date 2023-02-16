const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoCompletedList = document.querySelector('.completed-todo');
const cntComplete = document.querySelector('.completed');

let todos = [];
let id = 0;
let comId = 0;
let completeCnt = 0;
let totalTodos = 0;

const saveTodos = () => {
    localStorage.setItem("Todos",JSON.stringify(todos));
}

const loadTodos = () => {
    const loadTodos = localStorage.getItem("Todos");

    if(loadTodos !== null)
    {
        const parsedTodos = JSON.parse(loadTodos);
        setTodos(parsedTodos);
        paintTodos();
    }
}

const getTodos = () => {
    return todos;
}

const setTodos = (newTodo) => {
    return todos = [...newTodo];
}

const appendTodos = (text) => {
    const newTodos = [...getTodos() , {id:id++ , isCompleted: false, content: text}];
    setTodos(newTodos);
    paintTodos();
    saveTodos();
    countComplete();
}
const countComplete = () => {
    completeCnt = 0;
    todos.forEach(todo=> todo.isCompleted === true ? completeCnt++ : null);
    totalTodos = todos.length;
    cntComplete.innerHTML = `Completed (${completeCnt} / ${totalTodos})`
    
    paintTodos();
}


const delTodo = (todoId) => {
    const newTodos = getTodos().filter(todo => todo.id != todoId);
    setTodos(newTodos);
    countComplete();
    saveTodos();
    paintTodos();
}

const isCompleteTodo = (todoId) => {
    const newTodos = getTodos().map(todo => 
        todo.id === todoId ? {...todo , isCompleted : !todo.isCompleted} : todo
    )
    setTodos(newTodos);
    countComplete();
    paintTodos();
}

const paintTodos = () => {
 
    todoList.innerHTML = '';
    todoCompletedList.innerHTML = '';

    todos.map((todo) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('item');
        
        const checkAndText = document.createElement('div');
        checkAndText.classList.add('checkAndText');
    
        const checkBox = document.createElement('div');
        checkBox.classList.add('check');
        checkBox.addEventListener('click', () => {isCompleteTodo(todo.id)})

        const todoText = document.createElement('div');
        todoText.classList.add('text-todo');
        todoText.innerText = todo.content;
        
        const delBtn = document.createElement('button');
        delBtn.classList.add('delBtn');
        delBtn.innerText = 'X';
        delBtn.addEventListener('click', () => {delTodo(todo.id)});
        
        checkAndText.appendChild(checkBox);
        checkAndText.appendChild(todoText);

        todoItem.appendChild(checkAndText);
        todoItem.appendChild(delBtn);

        if(todo.isCompleted)
        {
            todoItem.classList.add('checked');
            checkBox.innerText = '✔';
            todoCompletedList.appendChild(todoItem);
        }
        else
            todoList.appendChild(todoItem);
    }) 
}

const init = () => {
    loadTodos();
    countComplete();
    todoInput.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter'){
            appendTodos(e.target.value);
            countComplete();
            todoInput.value = '';
        }
        
    })
}

init();