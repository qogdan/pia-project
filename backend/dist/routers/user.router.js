"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const request_1 = __importDefault(require("../models/request"));
const user_controller_1 = require("../controllers/user.controller");
const mongodb_1 = require("mongodb");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userRouter = express_1.default.Router();
const bcrypt = require("bcrypt");
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");
        if (isValid)
            error = null;
        cb(error, "./src/uploads");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
// userRouter.post("/login",(req,res,next)=>{
//     var fetcheduser;
//     console.log(req.body)
//     userModel.findOne({username:req.body.username}).then(user1=>{
//         console.log(user1)
//         if(!user1){
//             return res.status(401).json({
//                 message:"Auth failed"
//             })
//         }
//         fetcheduser = user1;
//         console.log(fetcheduser)
//         return req.body.password==fetcheduser.password
//     }).then(result=>{
//         if(!result){
//             return res.status(401).json({
//                 message:"Auth failed1"
//             })
//         }
//         const token = jwt.sign({username:fetcheduser.username},"pia_2023_kljuc_za_hesiranje",{expiresIn:'1h'});
//         console.log(token)
//         res.status(200).json({
//             user:fetcheduser,
//             token:token
//         })
//     }).catch(err=>{
//         return res.status(401).json({
//             message:"Auth failed2"
//         })
//     })
// })
userRouter.route('/loginManager').post((req, res) => new user_controller_1.UserController().loginManager(req, res));
userRouter.route('/getUser').post((req, res) => new user_controller_1.UserController().getUser(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/getAllPatients').get((req, res) => new user_controller_1.UserController().getAllPatients(req, res));
userRouter.route('/addUserDefaultAvatar').post((req, res) => new user_controller_1.UserController().addUserDefaultAvatar(req, res));
userRouter.route('/addDoctorDefaultAvatar').post((req, res) => new user_controller_1.UserController().addDoctorDefaultAvatar(req, res));
userRouter.route('/updateUserData').post((req, res) => new user_controller_1.UserController().updateUserData(req, res));
userRouter.route('/updateUserPassword').post((req, res) => new user_controller_1.UserController().updateUserPassword(req, res));
userRouter.route('/deleteUserPhoto').post((req, res) => new user_controller_1.UserController().deleteUserPhoto(req, res));
userRouter.route('/otkaziPregled').post((req, res) => new user_controller_1.UserController().otkaziPregled(req, res));
// userRouter.post("/updateUserPhoto", multer({storage:storage}).single("image"),(req,res,next)=>{
//     const url = req.protocol + '://' + req.get("host");
//     let username = req.body.username;
//     let avatar = url + "/src/uploads/" + req.file.filename;
//     userModel.updateOne({'username':username},{$set:{'avatar':avatar}})
// })
userRouter.post("/updateUserPhoto", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let username = req.body.username;
    console.log('op');
    let avatar = url + "/src/uploads/" + req.file.filename;
    console.log(username, avatar);
    user_1.default.updateOne({ 'username': username }, { $set: { 'avatar': avatar } }).then((result => {
        console.log(result);
        res.status(200).json({ message: "update successful" });
    }));
});
userRouter.post("/addUser", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const um = new user_1.default({
        _id: new mongodb_1.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        contact: req.body.phone,
        email: req.body.email,
        type: 'patient',
        avatar: url + "/src/uploads/" + req.file.filename
    });
    let rm = new request_1.default({
        _id: new mongodb_1.ObjectId(),
        status: null,
        user: um,
        pregled: null,
        reqType: 'register'
    });
    rm.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully',
            result: result
        });
    });
});
userRouter.post("/addDoctor", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const rm = new user_1.default({
        _id: new mongodb_1.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        contact: req.body.phone,
        email: req.body.email,
        licence: req.body.licence,
        spec: req.body.spec,
        branch: req.body.branch,
        type: 'doctor',
        avatar: url + "/src/uploads/" + req.file.filename
    });
    rm.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully',
            user: Object.assign({}, rm)
        });
    });
});
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map