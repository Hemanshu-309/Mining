import express from 'express'
import role from '../controller/role.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()

router.post('/createRole',middleware.checkJwt,role.createRole)
router.post('/getRole',middleware.checkJwt,role.getRole)
router.post('/deleteRole',middleware.checkJwt,role.deleteRole)
router.post('/deleteMultipleRoles',middleware.checkJwt,role.deleteMultipleRoles)
router.post('/updateRole',middleware.checkJwt,role.updateRole)
router.post('/paginateRole',middleware.checkJwt,role.paginateRole)


export default {
    router
}