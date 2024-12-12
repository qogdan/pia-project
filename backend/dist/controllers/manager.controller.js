"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerController = void 0;
const user_1 = __importDefault(require("../models/user"));
const pregled_1 = __importDefault(require("../models/pregled"));
const zakazan_1 = __importDefault(require("../models/zakazan"));
const request_1 = __importDefault(require("../models/request"));
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
const mongodb_1 = require("mongodb");
class ManagerController {
    constructor() {
        this.getRequests = (req, res) => {
            let type = req.body.type;
            console.log(type);
            request_1.default.find({ 'reqType': type }, (err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json(reqs);
            });
        };
        this.addUser = (req, res) => {
            let user = req.body.user;
            let um = new user_1.default(Object.assign({}, user));
            console.log(um);
            um.save((err, resp) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.addPregled = (req, res) => {
            let pr = req.body.pregled;
            let n = req.body.pregled.spec;
            let pregled = new pregled_1.default(Object.assign(Object.assign({}, pr), { _id: new mongodb_1.ObjectId() }));
            specijalizacija_1.default.updateOne({ 'name': n }, { '$push': { 'pregledi': pregled } }, (err, resp) => {
            });
            pregled.save((err, resp) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllSpec = (req, res) => {
            specijalizacija_1.default.find((err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json(reqs);
            });
        };
        this.addSpec = (req, res) => {
            let name = req.body.spec;
            const spec = new specijalizacija_1.default({
                name: name,
                _id: new mongodb_1.ObjectId(),
                pregledi: []
            });
            spec.save((err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: 'ok' });
            });
        };
        this.updateRequestStatus = (req, res) => {
            let id = new mongodb_1.ObjectId(req.body.id);
            let status = req.body.status;
            request_1.default.updateOne({ '_id': id }, { '$set': { 'status': status } }, (err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "ok update" });
            });
        };
        this.updatePregled = (req, res) => {
            let id = new mongodb_1.ObjectId(req.body.id);
            console.log(req.body);
            let duration = req.body.duration;
            let price = req.body.price;
            let spec = req.body.spec;
            zakazan_1.default.updateMany({ 'pregled._id': id }, { '$set': { 'pregled.duration': duration, 'pregled.price': price } }, (err, reqs) => {
            });
            pregled_1.default.updateOne({ '_id': id }, { '$set': { 'duration': duration, 'price': price } }, (err, reqs) => {
            });
            specijalizacija_1.default.updateOne({ 'name': spec, 'pregledi._id': id }, { '$set': { 'pregledi.$.duration': duration, 'pregledi.$.price': price } }, (err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "ok update" });
            });
        };
        this.deletePregled = (req, res) => {
            let id = new mongodb_1.ObjectId(req.body.id);
            let spec = req.body.spec;
            pregled_1.default.deleteOne({ '_id': id }, (err, reqs) => {
            });
            specijalizacija_1.default.updateOne({ 'name': spec }, { '$pull': { 'pregledi': { '_id': id } } }, (err, reqs) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: "ok update" });
            });
        };
    }
}
exports.ManagerController = ManagerController;
//# sourceMappingURL=manager.controller.js.map