const Event = require('../models/events')

/**
 * @createEvent req object include with date,time,description and image maybe not but 
 * to implement optional
 */

module.exports.createEvent = async function (req, res) {
    const { year, month, time, description } = req.body;
    if (!year || !month || !time || !description) {
        res.status(500).send("All fields no provide ! Please all Field provided !")
    } else {
        try {
            const event = new Event({ year, month, time, description })
            const allFields = await event.save()
            if (allFields) {
                res.status(200).send({
                    message: "Event created successfull !",
                    payload: allFields
                })
            }

        } catch (err) {
            if (err) {
                res.status(500).send({
                    message: "Internal Server Error",
                    err: err.message
                })
            }

        }
    }

}

/**
 * @getEvent Get All Created Events on Page
 * @in db.inventory.find( { qty: { $in: [ 5, 15 ] } } )
 * @and db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
 * @params http://localhost:3001/api/user/events?year=2020&month=4
 */

module.exports.getEvent = async function (req, res) {

    const { year: qyear, month: qmonth } = req.query

    if (!qyear || !qmonth) {
        if (qyear) {
            try {
                const yearSearch = await Event.find({ year: { $in: [qyear] } })
                if (!yearSearch.length) {
                    res.status(404).send("No year found !")
                }
                res.status(200).send(yearSearch)
            } catch (err) {
                res.status(500).send("Database Error")
                console.log(err)
            }
            // console.log("Year ")
        }
        if (qmonth) {
            try {
                const monthSearch = await Event.find({ month: { $in: [qmonth] } })
                if (!monthSearch.length) {
                    res.status(404).send("No Month found !")
                } else {
                    res.status(200).send(monthSearch)
                }


            } catch (err) {
                res.status(500).send("Database Error")

            }
            // console.log("Month")
        }

    } else if (qyear && qmonth) {
        try {
            const events = await Event.find({ $and: [{ year: qyear }, { month: qmonth }] })
            console.log("Length :", events.length)
            if (!events.length) {
                res.status(404).send("No month and year found")
            } else {
                res.status(200).send(events)
            }
        } catch (err) {
            res.status(500).send("Database error")
        }

        // console.log("ALL")
    } else {
        res.status(404).send("Not Found")
    }
}

/**
 * @deleteEvents
 */

module.exports.deleteEvent = async function (req, res) {
    const { id } = req.params
    const isEvent = await Event.findByIdAndDelete({ _id: id })
    if (!isEvent) {
        res.status(404).send("Event Not Found")
    } else {
        res.status(200).send({
            message: "Event Delete Succesfull",
            deletedEvent: isEvent
        })
    }


}

