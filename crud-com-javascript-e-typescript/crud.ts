import fs from 'fs' //ES6
import {v4 as uuid} from 'uuid'

const DB_FILE_PATH = "./database"

console.log("CRUD")

interface Todo {
    id: string
    date: string;
    content: string;
    done: boolean
}

function create(content: string): Todo {

    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    const todos: Todo[] = [
        ...read(),
        todo,
    ]

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos
    }, null, 2))

    return todo
}

function read(): Todo[] {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8")

    /* O método "JSON.parse()" converte um JSON em um objeto.
    * Se ele não tiver nada, será um objeto vazio. */

    const db = JSON.parse(dbString || "{}");

    if (!db.todos) { //fail fast validation
        return [];
    }
    return db.todos;
}

/* Estamos recebendo uma Partial de TODO, ou seja, um objeto que pode
*  ou não ter os atributos "id", "date", "content" e "done". */
function update(id: string, partialTodo: Partial<Todo>) {

    let updatedTodo;

    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if (isToUpdate) {
            /* O "Object.assign()" recebe um objeto alvo e múltiplas
            * fontes. Estamos pegando qualquer valor que estiver atribuído no
            * partial e mudando o valor do "currentTodo". */

            updatedTodo = Object.assign(currentTodo, partialTodo)
        }
    })

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(todos, null, 2))

    if(!updatedTodo){
        throw new Error("Please, provide another ID!")
    }
}

function deleteById(id: string) {
    const todos = read();

    const todosWithoutOne = todos.filter(todo => {
        if(id === todo.id){
            return false;
        }
        return true;
    })

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos: todosWithoutOne
    }, null, 2))
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "")
}

const firstTodo = create("Hoje eu preciso estudar muito!")
const secondTodo = create("Hoje eu preciso estudar muito 3!")
update(secondTodo.id, {
    content: "Novo content!"
})

deleteById(secondTodo.id)
console.log(read())
// CLEAR_DB()

