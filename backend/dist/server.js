"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const doctor_router_1 = __importDefault(require("./routers/doctor.router"));
const manager_router_1 = __importDefault(require("./routers/manager.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/Ordinacija');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('opened db connection');
});
const router = express_1.default.Router();
const path = require("path");
router.use('/users', user_router_1.default);
router.use('/doctors', doctor_router_1.default);
router.use('/managers', manager_router_1.default);
router.use('/src/uploads', express_1.default.static(path.join('./src/uploads')));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map