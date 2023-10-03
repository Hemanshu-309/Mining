import express from 'express'
import daily_report from '../controller/daily_report.js'

const router = express.Router()

router.post('/addDailyReport',daily_report.insertDailyReport)
router.post('/getDailyReport',daily_report.getAllDailyReport)
router.post('/getDailyReportUser',daily_report.getDailyReport)

export default {
    router
}