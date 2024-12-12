"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("../controllers/doctor.controller");
const docRouter = express_1.default.Router();
docRouter.route('/getAllDoctors').get((req, res) => new doctor_controller_1.DoctorController().getAllDoctors(req, res));
docRouter.route('/getDoctorsWithUsernames').post((req, res) => new doctor_controller_1.DoctorController().getDoctorsWithUsernames(req, res));
docRouter.route('/searchDoctors').post((req, res) => new doctor_controller_1.DoctorController().searchDoctors(req, res));
docRouter.route('/updateDoctorData').post((req, res) => new doctor_controller_1.DoctorController().updateDoctorData(req, res));
docRouter.route('/updateDocPregled').post((req, res) => new doctor_controller_1.DoctorController().updateDocPregled(req, res));
docRouter.route('/getPregledi').post((req, res) => new doctor_controller_1.DoctorController().getPregledi(req, res));
docRouter.route('/addIzvestaj').post((req, res) => new doctor_controller_1.DoctorController().addIzvestaj(req, res));
docRouter.route('/getSviIzvestaji').post((req, res) => new doctor_controller_1.DoctorController().getSviIzvestaji(req, res));
docRouter.route('/getPrethodniPregledi').post((req, res) => new doctor_controller_1.DoctorController().getPrethodniPregledi(req, res));
docRouter.route('/posaljiZahtevPregled').post((req, res) => new doctor_controller_1.DoctorController().posaljiZahtevPregled(req, res));
docRouter.route('/getNextTriPregleda').post((req, res) => new doctor_controller_1.DoctorController().getNextTriPregleda(req, res));
docRouter.route('/getIzvestajiPatient').post((req, res) => new doctor_controller_1.DoctorController().getIzvestajiPatient(req, res));
docRouter.route('/getObavestenja').post((req, res) => new doctor_controller_1.DoctorController().getObavestenja(req, res));
docRouter.route('/updateObavestenje').post((req, res) => new doctor_controller_1.DoctorController().updateObavestenje(req, res));
docRouter.route('/getPreglediSpec').post((req, res) => new doctor_controller_1.DoctorController().getPreglediSpec(req, res));
docRouter.route('/getPreglediPatient').post((req, res) => new doctor_controller_1.DoctorController().getPreglediPatient(req, res));
docRouter.route('/zakaziPregled').post((req, res) => new doctor_controller_1.DoctorController().zakaziPregled(req, res));
docRouter.route('/otkaziPregled').post((req, res) => new doctor_controller_1.DoctorController().otkaziPregled(req, res));
docRouter.route('/getZauzetiLekar').post((req, res) => new doctor_controller_1.DoctorController().getZauzetiLekar(req, res));
exports.default = docRouter;
//# sourceMappingURL=doctor.router.js.map