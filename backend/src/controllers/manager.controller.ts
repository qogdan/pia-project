import express from 'express'
import UserModel from '../models/user'
import PregledModel from '../models/pregled'
import ZakazanModel from '../models/zakazan'
import IzvestajModel from '../models/izvestaj'
import RequestModel from '../models/request'
import SpecModel from '../models/specijalizacija'
import izvestaj from '../models/izvestaj'
import { ObjectId } from 'mongodb'

export class ManagerController{
    getRequests = ( req:express.Request, res: express.Response)=>{
        let type = req.body.type;
        console.log(type)
        RequestModel.find({'reqType':type},(err,reqs)=>{
            if(err)console.log(err)
            else res.json(reqs)
        })
    }
    addUser = ( req:express.Request, res: express.Response)=>{
        let user = req.body.user
        let um = new UserModel({
            ...user
        });
        console.log(um)
        um.save((err,resp)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
    addPregled = ( req:express.Request, res: express.Response)=>{
        let pr = req.body.pregled
        let n = req.body.pregled.spec
        let pregled = new PregledModel({
            ...pr,
            _id:new ObjectId()
        });
        SpecModel.updateOne({'name':n},{'$push':{'pregledi':pregled}},(err,resp)=>{

        })
        pregled.save((err,resp)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
    getAllSpec= ( req:express.Request, res: express.Response)=>{
        SpecModel.find((err,reqs)=>{
            if(err)console.log(err)
            else res.json(reqs)
        })
    }
    addSpec= ( req:express.Request, res: express.Response)=>{
        let name = req.body.spec
        const spec = new SpecModel({
            name:name,
            _id:new ObjectId(),
            pregledi:[]
        })
        spec.save((err,reqs)=>{
            if(err)console.log(err)
            else res.json({message:'ok'})
        })
    }
    updateRequestStatus = ( req:express.Request, res: express.Response)=>{
        let id = new ObjectId( req.body.id);
        let status  = req.body.status;
        RequestModel.updateOne({'_id':id},{'$set':{'status':status}},(err,reqs)=>{
            if(err)console.log(err)
            else res.json({message:"ok update"})
        })
    }
    updatePregled = ( req:express.Request, res: express.Response)=>{
        let id = new ObjectId(req.body.id)
        console.log(req.body)
        let duration = req.body.duration
        let price = req.body.price
        let spec =req.body.spec
        ZakazanModel.updateMany({'pregled._id':id},{'$set':{'pregled.duration':duration,'pregled.price':price}},(err,reqs)=>{
        
        })
        PregledModel.updateOne({'_id':id},{'$set':{'duration':duration,'price':price}},(err,reqs)=>{
        
        })
        SpecModel.updateOne({'name':spec,'pregledi._id':id},{'$set':{'pregledi.$.duration':duration,'pregledi.$.price':price}},(err,reqs)=>{
            if(err)console.log(err)
            else res.json({message:"ok update"})
        })
    }
    deletePregled = ( req:express.Request, res: express.Response)=>{
        let id = new ObjectId(req.body.id)
        let spec = req.body.spec
        PregledModel.deleteOne({'_id':id},(err,reqs)=>{
        
        })
        SpecModel.updateOne({'name':spec},{'$pull':{'pregledi':{'_id':id}}},(err,reqs)=>{
            if(err)console.log(err)
            else res.json({message:"ok update"})
        })
    }
}