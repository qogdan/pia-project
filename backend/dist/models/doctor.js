"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Doctor = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    spec: {
        type: String
    },
    avatar: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Doctor', Doctor, 'doctors');
//# sourceMappingURL=doctor.js.map