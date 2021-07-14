const app = require('./app.js')
const database = require('./database.js')



database()
    .then(response => {
        console.log("Database Connection Succesfully")
    })
    .catch(err => {
        console.log(err.message)
    })


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`This Application Running on ${port}`)
})

