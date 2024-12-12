import express from 'express'
import userModel from '../models/user'
import reqModel from '../models/request'
import { UserController } from '../controllers/user.controller';
import { DoctorController } from '../controllers/doctor.controller';
import { ManagerController } from '../controllers/manager.controller';

const managerRouter = express.Router();

managerRouter.route('/getRequests').post(
    (req,res)=> new ManagerController().getRequests(req,res)
)
managerRouter.route('/getAllSpec').get(
    (req,res)=> new ManagerController().getAllSpec(req,res)
)
managerRouter.route('/addSpec').post(
    (req,res)=> new ManagerController().addSpec(req,res)
)
managerRouter.route('/deletePregled').post(
    (req,res)=> new ManagerController().deletePregled(req,res)
)
managerRouter.route('/addUser').post(
    (req,res)=> new ManagerController().addUser(req,res)
)
managerRouter.route('/addPregled').post(
    (req,res)=> new ManagerController().addPregled(req,res)
)
managerRouter.route('/updatePregled').post(
    (req,res)=> new ManagerController().updatePregled(req,res)
)
managerRouter.route('/updateRequestStatus').post(
    (req,res)=> new ManagerController().updateRequestStatus(req,res)
)

export default managerRouter;