import express from 'express'
import vehicle from '../controller/vehicle.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()

router.post('/addVehicle',middleware.checkJwt,vehicle.addVehicle)
router.post('/getVehicles',middleware.checkJwt,vehicle.getVehicle)
router.post('/deleteVehicle',middleware.checkJwt,vehicle.deleteVehicle)
router.post('/deleteMultipleVehicle',middleware.checkJwt,vehicle.deleteMultipleVehicles)
router.post('/updateVehicle',middleware.checkJwt,vehicle.updateVehicle)
router.post('/paginateVehicle',middleware.checkJwt,vehicle.paginateVehicle)

export default {
    router
}