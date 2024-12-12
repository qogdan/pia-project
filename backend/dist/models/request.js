"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Request = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    reqType: {
        type: String
    },
    status: {
        type: String
    },
    user: {
        type: Object
    },
    pregled: {
        type: Object
    }
});
exports.default = mongoose_1.default.model('RequestModel', Request, 'requests');
//# sourceMappingURL=request.js.map