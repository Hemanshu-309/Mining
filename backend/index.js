import express from 'express'
import constant from './src/helpers/constant.js'
import trip from './src/routes/trip.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/trip',trip.router)

app.listen(constant.PORT,()=>{
    console.log(`Server is running on http://localhost:${constant.PORT}`)
})
