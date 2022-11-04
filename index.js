const express = require('express')
const cors = require('cors')
require('colors')
require('dotenv').config()
const app = express()
const port = 5111
const ConnectDB = require('./Config/ConnectDB')
const AuthRoute = require('./Routes/AuthRoute')
const UsersRoute = require('./Routes/UsersRoute')
const PostsRoute = require('./Routes/PostsRoute')

ConnectDB()

app.use(express.json())
app.use(cors({ origin: '*' }))


app.get('/', (req, res) => {
    res.send("Server is Running Prefectly ☢️🏃‍♂️")
})


app.use('/auth', AuthRoute)
app.use('/users', UsersRoute)
app.use('/post', PostsRoute)



app.listen(process.env.PORT || port, () => console.log(`Server is running at ${port}`.yellow.underline))