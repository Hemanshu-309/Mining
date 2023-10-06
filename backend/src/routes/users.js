import express from 'express'
import users from '../controller/users.js'

const router = express.Router()

//Rahul's Code
router.post('/addUser',users.createUser)
router.post('/loginUser',users.loginUser)
router.post('/deleteUser',users.deleteUser)


export default {
    router
}