const fs = require("fs")
const DB_FILE_PATH = "./database"

console.log("CRUD")

function create(content){
    fs.writeFileSync(DB_FILE_PATH, content)
    return content
}

create("Hoje eu preciso estudar muito!")

