/*

   - QUERY PARAMS => meusite.com/users?nome=bryan&age=20
   - ROUTE PARAMS => /users/2      // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
   - REQUEST BODY => {name: bryan, age: 20}

   - GET          => Buscar informação no back-end
   - POST         => Criar informação no back-end
   - PUT / PATCH  => Alterar/Atualizar informação no back-end
   - DELETE       => Deletar informação no back-end


   - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição

*/

/* npm run devn para executar o código no insomnia */


const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
   const {id} = request.params

   const index = users.findIndex(user => user.id === id)

   if(index < 0){
      return response.status(404).json({message: "user not found"})
   }

   request.userIndex = index
   request.userId = id
   next()
}


app.listen(port, () => {
   console.log(`Server started on port ${port} 😉`)
})

app.get("/users", (request, response) => {
   console.log("A rota foi chamada")
   return response.json(users)    
})

app.post("/users", (request, response) => {
  const {name, age} = request.body
   

   const user = {id:uuid.v4(), name, age}


   users.push(user)
    return response.status(201).json(user)    
 })

app.put("/users/:id", checkUserId, (request, response) =>{
   const {name, age} = request.body
   const index = request.userIndex
   const id = request.userId
   const updateUser = {id, name, age}

   users[index] = updateUser

   return response.json(updateUser)
})
    
app.delete("/users/:id", checkUserId, (request, response) => {

   const index = request.userIndex 
   users.splice(index,1)

   return response.status(204).json()    
})