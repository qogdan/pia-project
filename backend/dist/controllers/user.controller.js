"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const request_1 = __importDefault(require("../models/request"));
const zakazan_1 = __importDefault(require("../models/zakazan"));
const mongodb_1 = require("mongodb");
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.loginManager = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': 'manager' }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getUser = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getAllUsers = (req, res) => {
            request_1.default.find({ 'reqType': 'register', 'status': { $in: ['accepted', 'rejected'] } }, (err, rq) => {
                if (err)
                    console.log(err);
                else
                    res.json(rq);
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: 'Ok delete' });
            });
        };
        this.getAllPatients = (req, res) => {
            user_1.default.find({ 'type': { $in: ['patient', null] } }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.updateUserData = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let email = req.body.email;
            let phone = req.body.phone;
            user_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname, 'address': address, 'email': email, 'contact': phone } }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok update' });
            });
        };
        this.updateUserPassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok update' });
            });
        };
        this.otkaziPregled = (req, res) => {
            let id = req.body.id;
            zakazan_1.default.deleteOne({ '_id': id }, (err, ress) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: 'ok' });
            });
        };
        this.deleteUserPhoto = (req, res) => {
            let username = req.body.username;
            user_1.default.updateOne({ 'username': username }, { $set: { 'avatar': null } }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok update' });
            });
        };
        this.addUserDefaultAvatar = (req, res) => {
            let userm = new user_1.default({
                username: req.body.username,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                contact: req.body.phone,
                type: 'patient',
                email: req.body.email,
                avatar: null
            });
            let rm = new request_1.default({
                user: userm,
                pregled: null,
                reqType: 'register',
                status: null,
                _id: new mongodb_1.ObjectId()
            });
            rm.save((err, resp) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.addDoctorDefaultAvatar = (req, res) => {
            let userm = new user_1.default({
                username: req.body.username,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                contact: req.body.phone,
                email: req.body.email,
                licence: req.body.licence,
                type: 'doctor',
                spec: req.body.spec,
                branch: req.body.branch,
                avatar: null
            });
            userm.save((err, resp) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map