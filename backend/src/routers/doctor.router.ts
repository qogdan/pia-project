import express from 'express'
import { DoctorController } from '../controllers/doctor.controller';

const docRouter = express.Router();

docRouter.route('/getAllDoctors').get(
    (req,res)=> new DoctorController().getAllDoctors(req, res)
)
docRouter.route('/getDoctorsWithUsernames').post(
    (req,res)=> new DoctorController().getDoctorsWithUsernames(req, res)
)

docRouter.route('/searchDoctors').post(
    (req,res)=> new DoctorController().searchDoctors(req,res)
)
docRouter.route('/updateDoctorData').post(
    (req,res)=> new DoctorController().updateDoctorData(req,res)
)
docRouter.route('/updateDocPregled').post(
    (req,res)=> new DoctorController().updateDocPregled(req,res)
)

docRouter.route('/getPregledi').post(
    (req,res)=> new DoctorController().getPregledi(req,res)
)
docRouter.route('/addIzvestaj').post(
    (req,res)=> new DoctorController().addIzvestaj(req,res)
)
docRouter.route('/getSviIzvestaji').post(
    (req,res)=> new DoctorController().getSviIzvestaji(req,res)
)
docRouter.route('/getPrethodniPregledi').post(
    (req,res)=> new DoctorController().getPrethodniPregledi(req,res)
)
docRouter.route('/posaljiZahtevPregled').post(
    (req,res)=> new DoctorController().posaljiZahtevPregled(req,res)
)
docRouter.route('/getNextTriPregleda').post(
    (req,res)=> new DoctorController().getNextTriPregleda(req,res)
)
docRouter.route('/getIzvestajiPatient').post(
    (req,res)=> new DoctorController().getIzvestajiPatient(req,res)
)
docRouter.route('/getObavestenja').post(
    (req,res)=> new DoctorController().getObavestenja(req,res)
)
docRouter.route('/updateObavestenje').post(
    (req,res)=> new DoctorController().updateObavestenje(req,res)
)
docRouter.route('/getPreglediSpec').post(
    (req,res)=> new DoctorController().getPreglediSpec(req,res)
)
docRouter.route('/getPreglediPatient').post(
    (req,res)=> new DoctorController().getPreglediPatient(req,res)
)

docRouter.route('/zakaziPregled').post(
    (req,res)=> new DoctorController().zakaziPregled(req,res)
)
docRouter.route('/otkaziPregled').post(
    (req,res)=> new DoctorController().otkaziPregled(req,res)
)

docRouter.route('/getZauzetiLekar').post(
    (req,res)=> new DoctorController().getZauzetiLekar(req,res)
)

export default docRouter;