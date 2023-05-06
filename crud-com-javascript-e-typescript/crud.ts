import fs from 'fs' //ES6
const DB_FILE_PATH = "./database"

console.log("CRUD")

interface Todo {
    date: string;
    content: string;
    done: boolean
}

function create(content: string){

    const todo: Todo = {
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
    return content
}

function read(): Todo[] {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8")

    /* O método "JSON.parse()" converte um JSON em um objeto.
    * Se ele não tiver nada, será um objeto vazio. */

    const db = JSON.parse(dbString || "{}");

    if(!db.todos){ //fail fast validation
        return [];
    }
    return db.todos;
}

function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, "")
}

create("Hoje eu preciso estudar muito!")
create("Hoje eu preciso estudar muito 3!")
console.log(read())

