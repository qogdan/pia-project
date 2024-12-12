import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Obavestenje = new Schema({
    receiver:{
        type:String
    },
    datetime:{
        type:String
    },
    read:{
        type:Boolean
    },
    text:{
        type:String
    },
    type:{
        type:String
    },
    _id:{
        type:ObjectId
    }
})

export default mongoose.model('ObavestenjeModel',Obavestenje,'obavestenja')