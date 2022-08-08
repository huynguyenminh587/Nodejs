const express = require('express')
const router = express.Router();
const User = require('./shared/models/user')

router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    const alreadyExistUser = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Err :', err)
    })

    if (alreadyExistUser) {
        return res.json({ message: "User with email already exists" })
    }

    const newUser = new User({ fullName, email, password })

    const savedUser = await newUser.save().catch((err) => {

        console.log('Error : ', err)
        res.json({ error: 'Cannot register user at the moment' })

    });

    if (savedUser)
        res.json({ message: 'Thank for registering' })
    else
        res.json({
            message: 'Cannot register user at the moment'
        })
})

module.exports = router