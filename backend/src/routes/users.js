import express from 'express'
import users from '../controller/users.js'

const router = express.Router()

router.post('/addUser',users.createUser)

export default {
    router
}