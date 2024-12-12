import express from 'express'
import UserModel from '../models/user'
import RequestModel from '../models/request'
import ZakazanModel from '../models/zakazan'
import { ObjectId } from 'mongodb';
export class UserController{

    login = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username':username,'password':password},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
            
        })
        
    }

    loginManager = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username':username,'password':password,'type':'manager'},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
            
        })
        
    }
    getUser = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.findOne({'username':username},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
            
        })
        
    }
    getAllUsers = (req:express.Request, res: express.Response)=>{
        RequestModel.find({'reqType':'register','status':{$in:['accepted','rejected']}},(err,rq)=>{
            if(err) console.log(err);
            else res.json(rq);
        })
        
    }
    deleteUser = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;

        UserModel.deleteOne({'username':username},(err,user)=>{
            if(err) console.log(err);
            else res.json({message:'Ok delete'})
            
        })
        
    }
    getAllPatients = (req:express.Request, res: express.Response)=>{
        UserModel.find({'type':{$in:['patient',null]}},(err,user)=>{
            if(err) console.log(err);
            else res.json(user);
            
        })
        
    }

    updateUserData = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let address=req.body.address;
        let email=req.body.email;
        let phone=req.body.phone;
        
        UserModel.updateOne({'username':username},{$set:{'firstname':firstname,'lastname':lastname,'address':address,'email':email,'contact':phone}},(err,r)=>{
            if(err) console.log(err)
            else res.json({'message':'ok update'})
        })
    }
    updateUserPassword = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        
        UserModel.updateOne({'username':username},{$set:{'password':password}},(err,r)=>{
            if(err) console.log(err)
            else res.json({'message':'ok update'})
        })
    }
    otkaziPregled = (req:express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        
        ZakazanModel.deleteOne({'_id':id},(err,ress)=>{
            if(err) console.log(err)
            else res.json({message:'ok'})
        })
    }
    deleteUserPhoto = (req:express.Request, res: express.Response)=>{
        let username = req.body.username;
        
        UserModel.updateOne({'username':username},{$set:{'avatar':null}},(err,r)=>{
            if(err) console.log(err)
            else res.json({'message':'ok update'})
        })
    }

    addUserDefaultAvatar = (req:express.Request, res: express.Response)=>{
        let userm = new UserModel({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            contact: req.body.phone,
            type:'patient',
            email: req.body.email,
            avatar: null
        })
        let rm = new RequestModel({
            user:userm,
            pregled:null,
            reqType: 'register',
            status:null,
            _id:new ObjectId()
        });
        rm.save((err,resp)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }
    addDoctorDefaultAvatar = (req:express.Request, res: express.Response)=>{
        let userm = new UserModel({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            contact: req.body.phone,
            email: req.body.email,
            licence:req.body.licence,
            type:'doctor',
            spec:req.body.spec,
            branch:req.body.branch,
            avatar: null
        })
        
        userm.save((err,resp)=>{
            if(err)
                res.status(400).json({"message":"error"})
            else res.json({"message":"ok"})
        })
    }

    
}