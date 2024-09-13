const express = require('express')
const { getAllUsers, registerController, loginController, changePassword } = require('../controllers/userController')

const router=express.Router()

router.get('/all-users',getAllUsers)

router.post('/register',registerController)

router.post('/login',loginController)
router.put(`/change-password/:email`,changePassword)

module.exports=router