"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const manager_controller_1 = require("../controllers/manager.controller");
const managerRouter = express_1.default.Router();
managerRouter.route('/getRequests').post((req, res) => new manager_controller_1.ManagerController().getRequests(req, res));
managerRouter.route('/getAllSpec').get((req, res) => new manager_controller_1.ManagerController().getAllSpec(req, res));
managerRouter.route('/addSpec').post((req, res) => new manager_controller_1.ManagerController().addSpec(req, res));
managerRouter.route('/deletePregled').post((req, res) => new manager_controller_1.ManagerController().deletePregled(req, res));
managerRouter.route('/addUser').post((req, res) => new manager_controller_1.ManagerController().addUser(req, res));
managerRouter.route('/addPregled').post((req, res) => new manager_controller_1.ManagerController().addPregled(req, res));
managerRouter.route('/updatePregled').post((req, res) => new manager_controller_1.ManagerController().updatePregled(req, res));
managerRouter.route('/updateRequestStatus').post((req, res) => new manager_controller_1.ManagerController().updateRequestStatus(req, res));
exports.default = managerRouter;
//# sourceMappingURL=manager.router.js.map