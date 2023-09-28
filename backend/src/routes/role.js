import express from 'express'
import role from '../controller/role.js'

const router = express.Router()

router.post('/createRole',role.createRole)

export default {
    router
}