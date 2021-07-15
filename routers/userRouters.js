// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp } = require('../controllers/userController')

router.route('/signup')

    .post(signUp)

module.exports = router

