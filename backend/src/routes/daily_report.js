import express from 'express'
import daily_report from '../controller/daily_report.js'

const router = express.Router()

router.post('/addDailyReport',daily_report.insertDailyReport)

export default {
    router
}