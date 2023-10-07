import express from 'express'
import daily_report from '../controller/daily_report.js'

const router = express.Router()

router.post('/addDailyReport',daily_report.insertDailyReport)
router.post('/getDailyReport',daily_report.getAllDailyReport)
router.post('/getDailyReportWhere',daily_report.getDailyReport)
router.post('/deleteReport',daily_report.deleteReport)
router.post('/paginateDailyReport',daily_report.paginateDailyReport)

export default {
    router
}