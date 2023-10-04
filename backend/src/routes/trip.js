import express from 'express'
import trip from '../controller/trip.js'

const router = express.Router()

router.post('/addTripType',trip.createTrip)
router.post('/getTripType',trip.getTrip)
router.post('/deleteTripType',trip.deleteTrip)
router.post('/deleteMultipleTripType',trip.deletedMultipleTrip)
router.post('/updateTripType',trip.updateTrip)

export default {
    router
}