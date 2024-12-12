import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Specijalizacija = new Schema({
    _id:{
        type:ObjectId
    },
    name:{
        type:String
    },
    pregledi:{
        type:Array
    }
})

export default mongoose.model('SpecModel',Specijalizacija,'specijalizacije')