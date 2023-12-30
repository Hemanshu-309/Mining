import express from 'express'
import constant from './src/helpers/constant.js'
import trip from './src/routes/trip.js'
import role from './src/routes/role.js'
import vehicle from './src/routes/vehicle.js'
import users from './src/routes/users.js'
import daily_report from './src/routes/daily_report.js'
import mine from './src/routes/mine.js'
import cors from 'cors'
import country from './src/middleware/country.js'
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload())

app.use('/trip',trip.router)
app.use('/role',role.router)
app.use('/vehicle',vehicle.router)
app.use('/users',users.router)
app.use('/reports',daily_report.router)
app.use('/mine',mine.router)


app.post('/cc',async(req,res)=>{
    res.send({
        Error:false,
        Code :country.codes
    })
})

app.listen(constant.PORT,()=>{
    console.log(`Server is running on http://localhost:${constant.PORT}`)
})
