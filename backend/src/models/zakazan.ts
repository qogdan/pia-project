import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Zakazan = new Schema({
    _id:{
        type:ObjectId
    },
    pregled:{
        type:Object
    },
    patient:{
        type:String
    },
    doctor:{
        type:String
    },
    timeStart:{
        type:String
    },
    timeEnd:{
        type:String
    }
})

export default mongoose.model('ZakazanModel',Zakazan,'zakazani')