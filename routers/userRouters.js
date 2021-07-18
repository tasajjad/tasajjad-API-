// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp, signIn } = require('../controllers/userController')
const { secret } = require('../controllers/secret')
const auth = require('../auth/auth')
const { createQuotes, getQuotes } = require('../controllers/quotes')
const { createMemories } = require('../controllers/memories')
const upload = require('../middleware/memories')






router.route('/signup')
    .post(signUp)
router.route('/signin')
    .post(signIn)
router.route('/create-secret')
    .post(auth, secret)
router.route('/quotes')
    .post(auth, createQuotes)
    .get(getQuotes)
router.route('/memories')
    .post(auth, upload.fields([
        { name: "photos" },
        { name: "year" },
        { name: "month" },
    ]), createMemories)
module.exports = router

