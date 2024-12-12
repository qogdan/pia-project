"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
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
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
    type: {
        type: String
    },
    licence: {
        type: String
    },
    branch: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RequestModel', Request, 'requests');
//# sourceMappingURL=requests.js.map