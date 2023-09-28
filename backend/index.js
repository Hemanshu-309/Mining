import express from 'express'
import constant from './src/helpers/constant.js'
import trip from './src/routes/trip.js'
import role from './src/routes/role.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/trip',trip.router)
app.use('/role',role.router)


app.listen(constant.PORT,()=>{
    console.log(`Server is running on http://localhost:${constant.PORT}`)
})
