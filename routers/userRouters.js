// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp, signIn } = require('../controllers/userController')

router.route('/signup')

    .post(signUp)
router.route('/signin')
    .post(signIn)
module.exports = router

