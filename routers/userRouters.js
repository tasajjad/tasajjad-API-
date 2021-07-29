// Internal Import
const router = require('express').Router()
const path = require('path')
// External Import
const { signUp, signIn } = require('../controllers/userController')
const { secret } = require('../controllers/secret')
const auth = require('../auth/auth')
const { createQuotes, getQuotes, deleteQuotesById } = require('../controllers/quotes')
const { createGift, getGift } = require('../controllers/giftControllers')
const giftUpload = require('../middleware/giftMiddleware')
const { createLike, getAllLikes, deleteLikeById } = require('../controllers/likeController')

const { createDate, getAllDate, deleteDateById } = require('../controllers/dateController')
const {
    createYear,
    createMonth,
    uploadImages,
    getAllMemories,
    getImagesIndivisual,
    getMonth,
    getYear,
    deleteYearById,
    deleteMonthById,

} = require('../controllers/memories')
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
router.route('/quotes/:id')
    .delete(deleteQuotesById)
/**
 * @working
 */

router.route('/memories/year')
    .post(createYear)
    .get(getYear)
router.route('/memories/year/:id')
    .delete(deleteYearById)
router.route('/memories/month')
    .post(createMonth)
    .get(getMonth)
router.route('/memories/month/:id')
    .delete(deleteMonthById)

router.route('/memories/upload-images')
    .post(upload.fields([
        { name: "photos" },
        { name: "year" },
        { name: "month" }
    ]), uploadImages)

router.route('/memories/')
    .get(getAllMemories)

router.route('/memories/individual')
    .get(getImagesIndivisual)

/**
 * @gift
 */

router.route('/gift')
    .post(giftUpload.fields([
        { name: "photos" },
        { name: "date" },
        { name: "month" },
        { name: "day" }
    ]), createGift)
    .get(getGift)

/**
 * @Like
 */

router.route('/like')
    .post(createLike)
    .get(getAllLikes)

router.route('/like/:id')
    .delete(deleteLikeById)


/**
 * @Date
 */


router.route('/date')
    .post(createDate)
    .get(getAllDate)

router.route('/date/:id')
    .delete(deleteDateById)


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


