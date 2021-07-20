// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp, signIn } = require('../controllers/userController')
const { secret } = require('../controllers/secret')
const auth = require('../auth/auth')
const { createQuotes, getQuotes } = require('../controllers/quotes')
const { createMemories, addImages, getImages } = require('../controllers/memories')
const upload = require('../middleware/memories')
const update = require('../middleware/addImages')
const { createEvent, getEvent } = require('../controllers/events')

/**
 * @auth all route should be a authentication middleware
 */


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
router.route('/memories')
    .get(getImages)
router.route('/memories/update')
    .put(update.fields([
        { name: "photos" },
        { name: "year" }
    ]), addImages)
router.route('/events')
    .post(createEvent)
    .get(getEvent)
module.exports = router


