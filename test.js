// const jwt = require('jsonwebtoken')


// const token = jwt.sign({
//     name: "JANNAT",
//     name2: "TASIN MONI"
// }, "mySecret", { expiresIn: 60 * 60 })



// console.log(token)


const obj = {
    name: "Sajjad Ahmed",
    email: "sajjad@gmail.com",
    password: "test"
}

const Joi = require('joi')


const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(100)
})


const data = schema.validate(obj)

console.log(data.error.details[0].message)