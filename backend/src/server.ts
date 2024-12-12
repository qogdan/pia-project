import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import docRouter from './routers/doctor.router'
import managerRouter from './routers/manager.router';

const app = express();
app.use(cors())
app.use(express.json())






mongoose.connect('mongodb://127.0.0.1:27017/Ordinacija')
const connection = mongoose.connection
connection.once('open',()=>{
    console.log('opened db connection')
})

const router = express.Router();
const path = require("path")

router.use('/users', userRouter)
router.use('/doctors',docRouter)
router.use('/managers',managerRouter)
router.use('/src/uploads',express.static(path.join('./src/uploads')))
app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));