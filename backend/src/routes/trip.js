import express from 'express'
import trip from '../controller/trip.js'
import middleware from '../middleware/jwt.js'

const router = express.Router()

//router.post('/addTripType',middleware.checkJwt,trip.createTrip)
router.post('/getTripType',middleware.checkJwt,trip.getTrip)
//router.post('/deleteTripType',middleware.checkJwt,trip.deleteTrip)
//router.post('/deleteMultipleTripType',middleware.checkJwt,trip.deletedMultipleTrip)
//router.post('/updateTripType',middleware.checkJwt,trip.updateTrip)
router.post('/paginateTripType',middleware.checkJwt,trip.paginateTrip)

export default {
    router
}