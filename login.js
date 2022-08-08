const express = require('express')
const router = express.Router();
const User = require('./shared/models/user')
const jwt = require('jsonwebtoken')



router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log('Error: ', err)
    })

    if (!userWithEmail)
        return res.json({ message: 'Email or Password does not match' })

    if (userWithEmail.password !== password)
        return res.json({ message: 'Password is incorrect' })

    // const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SECRET)
    jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    })

    // res.json({ message: 'Welcome Back', token: jwtToken })




})




module.exports = router