// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp, signIn } = require('../controllers/userController')
const { secret } = require('../controllers/secret')
const auth = require('../auth/auth')
const { createQuotes, getQuotes } = require('../controllers/quotes')
// const { createMemories, addImages, getImages } = require('../controllers/@depricatedmemories')
const { createYear, createMonth, uploadImages } = require('../controllers/memories')
const upload = require('../middleware/images')
const update = require('../middleware/addImages')
const { createEvent, getEvent, deleteEvent } = require('../controllers/events')
const passwordChange = require('../auth/passwordChange')

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
/**
 * @working
 */

router.route('/memories/create-year')
    .post(createYear)
router.route('/memories/create-month')
    .post(createMonth)

router.route('/memories/upload-images')
    .post(upload.fields([
        { fieldName: "photos" },
        { fieldName: "year" },
        { fieldName: "month" }
    ]), uploadImages)


/**
 * @Okay
 */
router.route('/events')
    .post(auth, createEvent)
    .get(auth, getEvent)
router.route('/events/:id')
    .delete(deleteEvent)

router.route("/auth/change-pass/:id")
    .post(auth, passwordChange)
module.exports = router


