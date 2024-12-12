"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const user_1 = __importDefault(require("../models/user"));
const pregled_1 = __importDefault(require("../models/pregled"));
const zakazan_1 = __importDefault(require("../models/zakazan"));
const izvestaj_1 = __importDefault(require("../models/izvestaj"));
const request_1 = __importDefault(require("../models/request"));
const obavestenje_1 = __importDefault(require("../models/obavestenje"));
const bson_1 = require("bson");
class DoctorController {
    constructor() {
        this.getAllDoctors = (req, res) => {
            user_1.default.find({ 'type': 'doctor' }, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.getDoctorsWithUsernames = (req, res) => {
            let uns = req.body.docs;
            user_1.default.find({ 'username': { $in: uns } }, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.updateDoctorData = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let address = req.body.address;
            let phone = req.body.phone;
            let licence = req.body.licence;
            let spec = req.body.spec;
            let branch = req.body.branch;
            let email = req.body.email;
            user_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'email': email, 'branch': branch, 'lastname': lastname, 'address': address, 'spec': spec, 'licence': licence, 'contact': phone } }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok update' });
            });
        };
        this.updateDocPregled = (req, res) => {
            let doctor = req.body.doctor;
            let pregledi = req.body.pregledi;
            let spec = req.body.spec;
            console.log(req.body);
            pregled_1.default.updateMany({ 'spec': spec }, { $pull: { 'doctors': doctor } }, (err, resp) => {
            });
            pregled_1.default.updateMany({ 'spec': spec, 'name': { $in: pregledi } }, { $push: { 'doctors': doctor } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json([{ message: 'ok' }]);
            });
        };
        this.posaljiZahtevPregled = (req, res) => {
            let us = req.body.pregled;
            let u = new pregled_1.default(Object.assign({}, us));
            let zm = new request_1.default({
                reqType: 'pregled',
                status: null,
                user: null,
                pregled: u,
                _id: new bson_1.ObjectID()
            });
            console.log(zm);
            zm.save((err, resp) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.searchDoctors = (req, res) => {
            let fn = req.body.firstname;
            let ln = req.body.lastname;
            let sp = req.body.spec;
            let br = req.body.branch;
            user_1.default.find({ 'type': 'doctor', 'firstname': { $regex: fn, $options: 'i' }, 'lastname': { $regex: ln, $options: 'i' }, 'spec': { $regex: sp, $options: 'i' }, 'branch': { $regex: br, $options: 'i' } }, (err, doctors) => {
                if (err)
                    console.log(err);
                else
                    res.json(doctors);
            });
        };
        this.getPregledi = (req, res) => {
            let doc = req.body.doctor;
            pregled_1.default.find({ 'doctors': doc }, (err, pregledi) => {
                if (err)
                    console.log(err);
                else
                    res.json(pregledi);
            });
        };
        this.getIzvestajiPatient = (req, res) => {
            let pat = req.body.patient;
            console.log(pat);
            izvestaj_1.default.find({ 'zakazani.patient': pat }, (err, pregledi) => {
                if (err)
                    console.log(err);
                else
                    res.json(pregledi);
            });
        };
        this.getSviIzvestaji = (req, res) => {
            let doc = req.body.doctor;
            izvestaj_1.default.find({ 'zakazani.doctor': doc }, (err, zak) => {
                if (err)
                    console.log(err);
                else
                    res.json(zak);
            });
        };
        this.getPreglediPatient = (req, res) => {
            let pat = req.body.patient;
            zakazan_1.default.find({ 'patient': pat }, (err, zak) => {
                if (err)
                    console.log(err);
                else
                    res.json(zak);
            });
        };
        this.getPrethodniPregledi = (req, res) => {
            let doc = req.body.doctor;
            let datetime = req.body.datetime;
            console.log(req.body);
            zakazan_1.default.find({ 'doctor': doc, 'timeStart': { $lte: datetime } }, (err, zak) => {
                if (err)
                    console.log(err);
                else
                    res.json(zak);
            });
        };
        this.getNextTriPregleda = (req, res) => {
            let doctor = req.body.doctor;
            let datetime = req.body.datetime;
            zakazan_1.default.find({ 'doctor': doctor, 'timeStart': { $gt: datetime } }).sort({ 'timeStart': 1 }).limit(3)
                .then((documents) => {
                res.status(200).json({
                    nextThree: documents
                });
            });
        };
        this.getPreglediSpec = (req, res) => {
            let spec = req.body.spec;
            pregled_1.default.find({ 'spec': spec }, (err, zak) => {
                console.log(zak);
                if (err)
                    console.log(err);
                else
                    res.json(zak);
            });
        };
        this.getZauzetiLekar = (req, res) => {
            let doc = req.body.doctor;
            let ts = req.body.timeStart;
            let te = req.body.timeEnd;
            zakazan_1.default.findOne({ 'doctor': doc, "$or": [{ 'timeStart': { $lte: ts }, 'timeEnd': { $gt: ts } }, { 'timeStart': { $lte: ts }, 'timeEnd': { $gte: te } }, { 'timeStart': { $gte: ts }, 'timeEnd': { $lte: te } }, { 'timeStart': { $lt: te }, 'timeEnd': { $gte: te } }] }, (err, zak) => {
                if (err)
                    console.log(err);
                else
                    res.json(zak);
            });
        };
        this.getObavestenja = (req, res) => {
            let username = req.body.username;
            obavestenje_1.default.find({ 'receiver': username }, (err, ob) => {
                if (err)
                    console.log(err);
                else
                    res.json(ob);
            });
        };
        this.updateObavestenje = (req, res) => {
            let id = new bson_1.ObjectID(req.body.id);
            obavestenje_1.default.updateOne({ '_id': id }, { $set: { 'read': true } }, (err, ob) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: 'Ok' });
            });
        };
        this.otkaziPregled = (req, res) => {
            let id = req.body.id;
            let om = new obavestenje_1.default({
                receiver: id.patient,
                read: false,
                text: "Pregled: " + id.pregled.name + " kod doktora: " + id.doctor + " je otkazan.",
                datetime: id.timeStart,
                type: 'otkazan',
                _id: new bson_1.ObjectID()
            });
            om.save(() => {
            });
            zakazan_1.default.deleteOne({ '_id': id._id }, (err, ress) => {
                if (err)
                    console.log(err);
                else
                    res.json({ message: 'ok' });
            });
        };
        this.addIzvestaj = (req, res) => {
            console.log(req.body);
            let prem = new pregled_1.default(Object.assign(Object.assign({}, req.body.zakazan.pregled), { _id: new bson_1.ObjectID(req.body.zakazan.pregled._id) }));
            let zakm = new zakazan_1.default(Object.assign(Object.assign({}, req.body.zakazan), { pregled: prem, _id: new bson_1.ObjectID(req.body.zakazan._id) }));
            let zm = new izvestaj_1.default({
                zakazani: zakm,
                razlog: req.body.razlog,
                dijagnoza: req.body.dijagnoza,
                terapija: req.body.terapija,
                kontrola: req.body.kontrola
            });
            zakazan_1.default.deleteOne({ '_id': zakm._id }, () => {
            });
            zm.save({}, (err, r) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.zakaziPregled = (req, res) => {
            let patient = req.body.patient;
            let pregled = req.body.pregled;
            let doctor = req.body.doctor;
            let timeEnd = req.body.timeEnd;
            let timeStart = req.body.timeStart;
            let pm = new pregled_1.default(Object.assign(Object.assign({}, pregled), { _id: new bson_1.ObjectID(pregled._id) }));
            let zm = new zakazan_1.default({
                patient: patient,
                pregled: pm,
                timeEnd: timeEnd,
                doctor: doctor,
                timeStart: timeStart,
                _id: new bson_1.ObjectID()
            });
            let om = new obavestenje_1.default({
                receiver: req.body.patient,
                read: false,
                text: 'Pregled: ' + pm.name + ' kod doktora: ' + doctor + " je za 24h.",
                type: '24h',
                datetime: timeStart,
                _id: new bson_1.ObjectID()
            });
            om.save({}, () => {
            });
            zm.save({}, (err, r) => {
                if (err)
                    res.status(400).json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctor.controller.js.map