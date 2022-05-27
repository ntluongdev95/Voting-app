import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import{notFound,errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()
import connectDB from './configs/db.js'
import userRoutes from './routers/userRoutes.js'
import uploadRoutes from './routers/uploadRoutes.js'
import candidateRoutes from './routers/candidateRoutes.js'
import eventRoutes from './routers/eventRoutes.js'
connectDB()
const app = express()
app.use(express.json())
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
const __dirname = path.resolve()
app.use('/images',express.static(path.join(__dirname,'/images')))

//socketIO


app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)
app.use('/upload',uploadRoutes)
app.use('/event',eventRoutes)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 8080 
app.listen(PORT,()=>{
    console.log(`Server is runing on ${PORT}`);
})
