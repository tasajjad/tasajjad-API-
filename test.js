// const jwt = require('jsonwebtoken')


// const token = jwt.sign({
//     name: "JANNAT",
//     name2: "TASIN MONI"
// }, "mySecret", { expiresIn: 60 * 60 })



// console.log(token)


// const obj = {
//     name: "Sajjad Ahmed",
//     email: "sajjad@gmail.com",
//     password: "test"
// }

// const Joi = require('joi')


// const schema = Joi.object({
//     name: Joi.string().required().min(3).max(30),
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(6).max(100)
// })


// const data = schema.validate(obj)

// console.log(data.error.details[0].message)

// const jwt = require('jwt-decode')


// async function Test() {
//     const data = jwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVmZWNhYmI5Nzc2NzVkMDRkMWJhYjYiLCJuYW1lIjoiVEFTSU4gTU9OSSIsImVtYWlsIjoidGFzaW5AZ21haWwuY29tIiwiYW5uaXZlcnNhcnlEYXRlIjoiMTEgSnVuZSIsIm5pY2tOYW1lIjoiamFubmF0Iiwic2VjcmV0IjoidGFzYWpqYWQiLCJpYXQiOjE2MjYzMzc5MzMsImV4cCI6MTYyNjM0MTUzM30.42EUBuZ9mOAsl1zZ8V9aK68fVw6D4dFFVBBg3m9Z9zQ')
//     console.log(data)
// }

// Test()

// const data = {
//     name: "TASIN MONI",
//     nickName: "JANNAT",
//     test: function () {
//         console.log(`${this.name}  ${this.nickName}`)
//         console.log(this)
//     }
// }

// data.test()


// console.log(data.replace(/\s/g, ''))
// console.log(data.replace(/^\s+|\s+$/gm, ''))
const data = "    11     June  "
const result = data.replace(/\s/g, '').toLocaleLowerCase()
console.log(data)
console.log(result)