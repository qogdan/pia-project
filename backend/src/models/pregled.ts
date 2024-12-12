import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Pregled = new Schema({
    _id:{
        type:ObjectId
    },
    doctors:{
        type:Array
    },
    spec:{
        type:String
    },
    name:{
        type:String
    },
    duration:{
        type:Number
    },
    price:{
        type:Number
    }
})

export default mongoose.model('PregledModel',Pregled,'pregledi')