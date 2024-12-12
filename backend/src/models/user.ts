import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let User = new Schema({
    _id:{
        type:ObjectId
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    spec:{
        type:String
    },
    avatar:{
        type:String
    },
    address:{
        type:String
    },
    contact:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    username:{
        type:String
    },
    type:{
        type:String
    },
    licence:{
        type:String
    },
    branch:{
        type:String
    }
})

export default mongoose.model('UserModel',User,'users')