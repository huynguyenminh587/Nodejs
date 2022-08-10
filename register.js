const express = require('express')
const router = express.Router();
// const User = require('./shared/models/user')
const User = require('./shared/models/dtb_user/dtb_user.class_methods')
// code-structure\api\shared\models\dtb_user\dtb_user.class_methods.js

router.post('/register', async (req, res) => {
    const { first_name, last_name, username, email, address, birth, phone_number, password, sex, del_flg, image, status, role, is_block } = req.body;

    const alreadyExistUser = await User.getUserByEmail1(email).catch((err) => {
        console.log('Err: ', err)
    })

    // const alreadyExistUser = await User.findOne({ where: { email } }).catch((err) => {
    //     console.log('Err :', err)
    // })

    console.log(alreadyExistUser)

    if (alreadyExistUser) {
        return res.json({ message: "User with email already exists" })
    }

    const newUser = new User({ first_name, last_name, username, email, address, birth, phone_number, password, sex, del_flg, image, status, role, is_block })

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
// const alreadyExistUser = User.getUserByEmail1('HuyNguyenMin587@gmail.com')
// console.log(typeOf(alreadyExistUser))


module.exports = router