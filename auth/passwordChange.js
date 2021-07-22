const { User } = require('../models/user')
const bcrypt = require('bcrypt')


/**
 * 
 * @param {http} req 
 * @param {http} res 
 * @returns no
 * @problem1 if first time do not match new and again so after block doesn`t execute 
 * @problem2 it is authorization problem if a i can change password so i should give
 * @JWT token but after change password  token is changed but doesn`t show auth warning 
 * in again password changing . it problem is 
 * @JWT expiresIn . Now i should if anyone change password  when change the expiresIn time 
 * other way remove token in
 * @localStorage in Browser or create a 
 * @middleware 
 */


module.exports = async function (req, res) {
    const { oldPassword, newPassword, againPassword } = req.body
    const { id } = req.params;
    const idLength = id.length



    if (idLength === 24) {
        const userExist = await User.findById({ _id: id })
        if (!userExist) {
            res.status(404).send("User Not Found !")
        } else {

            if (newPassword === againPassword) {
                try {
                    const databaseHashPass = await User.findById({ _id: id }).select({ password: true })
                    const match = await bcrypt.compare(oldPassword, databaseHashPass.password)
                    if (match) {
                        try {
                            const salt = await bcrypt.genSalt(10)
                            const hashedPassword = await bcrypt.hash(newPassword, salt)

                            const updatePassword = await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, { new: true })
                                .select({ name: true, email: true, password: true })


                            if (updatePassword) {
                                return res.status(201).send({
                                    message: "Password updated successfull",
                                    newPass: updatePassword
                                })
                            } else {
                                res.status(412).send("Something went wrong !")

                            }

                        } catch (err) {
                            if (err) {
                                res.status(500).send("Some Internal[database] or[hashed] Problem !")

                            }

                        }


                    } else {
                        res.status(406).send("Password does not match !")
                    }


                } catch (err) {
                    res.status(500).send("[compare] or internal database error")
                }


            } else {
                res.status(409).send("newPassword and again password does not match.Please try again !")
            }


        }

    } else {
        res.status(411).send("ID Length 24 is required !")
    }

}
