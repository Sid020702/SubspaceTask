const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const blogRoutes = require('./routes/blogs')
const PORT = 80

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', blogRoutes)

app.use((error, req, res, next) => {        //Error handling middleware
    console.log(error)
    const status = error.satusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message, data })
})



app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Listening on port 80...")
})