import mongoose from 'mongoose';

const Schema = mongoose.Schema

let Izvestaj = new Schema({
    zakazani:{
        type:Object
    },
    razlog:{
        type:String
    },
    dijagnoza:{
        type:String
    },
    terapija:{
        type:String
    },
    kontrola:{
        type:String
    }
})

export default mongoose.model('IzvestajModel',Izvestaj,'izvestaji')