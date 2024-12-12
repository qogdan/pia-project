import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Request = new Schema({
    _id:{
        type:ObjectId
    },
    reqType:{
        type:String
    },
    status:{
        type:String
    },
    user:{
        type:Object
    },
    pregled:{
        type:Object
    }
})

export default mongoose.model('RequestModel',Request,'requests')