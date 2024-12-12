import express from 'express'
import UserModel from '../models/user'
import PregledModel from '../models/pregled'
import ZakazanModel from '../models/zakazan'
import IzvestajModel from '../models/izvestaj'
import ZahtevModel from '../models/request'
import ObavestenjeModel from '../models/obavestenje'
import { ObjectID } from 'bson'
import obavestenje from '../models/obavestenje'

export class DoctorController{
    
    getAllDoctors = ( req:express.Request, res: express.Response)=>{
        UserModel.find({'type':'doctor'},(err,doctors)=>{
            if(err)console.log(err)
            else res.json(doctors)
        })
    }
    
    getDoctorsWithUsernames = ( req:express.Request, res: express.Response)=>{
        let uns = req.body.docs;
        UserModel.find({'username':{$in:uns}},(err,doctors)=>{
            if(err)console.log(err)
            else res.json(doctors)
        })
    }
   
    updateDoctorData = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let address=req.body.address;
        let phone=req.body.phone;
        let licence = req.body.licence;
        let spec = req.body.spec;
        let branch = req.body.branch;
        let email = req.body.email;
        
        UserModel.updateOne({'username':username},{$set:{'firstname':firstname,'email':email,'branch':branch,'lastname':lastname,'address':address,'spec':spec,'licence':licence,'contact':phone}},(err,r)=>{
            if(err) console.log(err)
            else res.json({'message':'ok update'})
        })
    }
    updateDocPregled = (req:express.Request, res: express.Response)=>{
        let doctor = req.body.doctor;
        let pregledi = req.body.pregledi;
        let spec = req.body.spec;
        console.log(req.body)
        PregledModel.updateMany({'spec':spec},{$pull:{'doctors':doctor}},(err,resp)=>{
        })
        PregledModel.updateMany({'spec':spec,'name':{$in:pregledi}},{$push:{'doctors':doctor}},(err,resp)=>{
            if(err)console.log(err)
            else res.json([{message:'ok'}])
        })
    }
    posaljiZahtevPregled = (req:express.Request, res: express.Response)=>{
        let us = req.body.pregled
        let u = new PregledModel({
            ...us
        })
        let zm = new ZahtevModel({
            reqType:'pregled',
            status:null,
            user:null,
            pregled:u,
            _id:new ObjectID()
        })
        console.log(zm)
        zm.save((err,resp)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
        
    }
    searchDoctors = ( req:express.Request, res: express.Response)=>{
   
        let fn = req.body.firstname;
        let ln = req.body.lastname;
        let sp = req.body.spec;
        let br = req.body.branch;

        UserModel.find({'type':'doctor','firstname':{$regex:fn,$options:'i'},'lastname':{$regex:ln,$options:'i'},'spec':{$regex:sp,$options:'i'},'branch':{$regex:br,$options:'i'}},(err,doctors)=>{
            if(err)console.log(err)
            else res.json(doctors)
        })
    }

    getPregledi = ( req:express.Request, res: express.Response)=>{
        let doc = req.body.doctor;
        PregledModel.find({'doctors':doc},(err,pregledi)=>{
            if(err)console.log(err)
            else res.json(pregledi)
        })
    }
    getIzvestajiPatient = ( req:express.Request, res: express.Response)=>{
        let pat = req.body.patient;
        console.log(pat)
        IzvestajModel.find({'zakazani.patient':pat},(err,pregledi)=>{
            if(err)console.log(err)
            else res.json(pregledi)
        })
    }
    getSviIzvestaji = ( req:express.Request, res: express.Response)=>{
        let doc = req.body.doctor;

        IzvestajModel.find({'zakazani.doctor':doc},(err,zak)=>{
            if(err)console.log(err)
            else res.json(zak)
        })
    }
    getPreglediPatient = ( req:express.Request, res: express.Response)=>{
        let pat = req.body.patient;

        ZakazanModel.find({'patient':pat},(err,zak)=>{
            if(err)console.log(err)
            else res.json(zak)
        })
    }
    getPrethodniPregledi = ( req:express.Request, res: express.Response)=>{
        let doc = req.body.doctor;
        let datetime = req.body.datetime;
        console.log(req.body)
        ZakazanModel.find({'doctor':doc,'timeStart':{$lte:datetime}},(err,zak)=>{
            if(err)console.log(err)
            else res.json(zak)
        })
    }
    getNextTriPregleda = ( req:express.Request, res: express.Response)=>{
        let doctor = req.body.doctor;
        let datetime = req.body.datetime;
        ZakazanModel.find({'doctor':doctor,'timeStart':{$gt:datetime}}).sort({'timeStart':1}).limit(3)
        .then((documents)=>{
            res.status(200).json({
                nextThree: documents
            })
        })
    }
    getPreglediSpec = ( req:express.Request, res: express.Response)=>{
        let spec = req.body.spec;

        PregledModel.find({'spec':spec},(err,zak)=>{
            console.log(zak)
            if(err)console.log(err)
            else res.json(zak)
        })
    }

    getZauzetiLekar= ( req:express.Request, res: express.Response)=>{
        let doc = req.body.doctor;
        let ts = req.body.timeStart;
        let te = req.body.timeEnd;
        ZakazanModel.findOne({'doctor':doc,"$or":[{'timeStart':{$lte:ts},'timeEnd':{$gt:ts}},{'timeStart':{$lte:ts},'timeEnd':{$gte:te}},{'timeStart':{$gte:ts},'timeEnd':{$lte:te}},{'timeStart':{$lt:te},'timeEnd':{$gte:te}}]},(err,zak)=>{
            if(err)console.log(err)
            else res.json(zak)
        })
    }
    getObavestenja= ( req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        ObavestenjeModel.find({'receiver':username},(err,ob)=>{
            if(err)console.log(err)
            else res.json(ob)
        })
    }
    updateObavestenje= ( req:express.Request, res: express.Response)=>{
        let id = new ObjectID(req.body.id)
        ObavestenjeModel.updateOne({'_id':id},{$set:{'read':true}},(err,ob)=>{
            if(err)console.log(err)
            else res.json({message:'Ok'})
        })
    }

    otkaziPregled = (req:express.Request, res: express.Response)=>{
        let id = req.body.id;
        let om = new ObavestenjeModel({
            receiver:id.patient,
            read:false,
            text:"Pregled: "+id.pregled.name+" kod doktora: "+id.doctor+" je otkazan.",
            datetime:id.timeStart,
            type:'otkazan',
            _id:new ObjectID()
        })
        om.save(()=>{

        })
        ZakazanModel.deleteOne({'_id':id._id},(err,ress)=>{
            if(err) console.log(err)
            else res.json({message:'ok'})
        })
    }
    addIzvestaj = ( req:express.Request, res: express.Response)=>{
        console.log(req.body)
        let prem = new PregledModel({
            ...req.body.zakazan.pregled,
            _id:new ObjectID(req.body.zakazan.pregled._id)
        })
        let zakm = new ZakazanModel({
            ...req.body.zakazan,
            pregled:prem,
            _id:new ObjectID(req.body.zakazan._id)
        })
        let zm = new IzvestajModel({
            zakazani:zakm,
            razlog:req.body.razlog,
            dijagnoza:req.body.dijagnoza,
            terapija:req.body.terapija,
            kontrola:req.body.kontrola
        })
        ZakazanModel.deleteOne({'_id':zakm._id},()=>{
            
        })
        zm.save({},(err,r)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
    zakaziPregled = ( req:express.Request, res: express.Response)=>{  
        let patient=req.body.patient
        let pregled=req.body.pregled
        let doctor=req.body.doctor
        let timeEnd=req.body.timeEnd
        let timeStart=req.body.timeStart

        let pm = new PregledModel({
            ...pregled,
            _id:new ObjectID(pregled._id)
        })
        let zm = new ZakazanModel({
            patient:patient,
            pregled:pm,
            timeEnd:timeEnd,
            doctor:doctor,
            timeStart:timeStart,
            _id:new ObjectID()
        })
        let om = new ObavestenjeModel({
            receiver:req.body.patient,
            read:false,
            text:'Pregled: '+pm.name+' kod doktora: '+doctor+" je za 24h.",
            type:'24h',
            datetime:timeStart,
            _id:new ObjectID()
        })
        om.save({},()=>{

        })
        zm.save({},(err,r)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
}