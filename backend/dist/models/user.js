"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
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
exports.default = mongoose_1.default.model('UserModel', User, 'users');
//# sourceMappingURL=user.js.map