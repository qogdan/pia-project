"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Obavestenje = new Schema({
    receiver: {
        type: String
    },
    datetime: {
        type: String
    },
    read: {
        type: Boolean
    },
    text: {
        type: String
    },
    type: {
        type: String
    },
    _id: {
        type: mongodb_1.ObjectId
    }
});
exports.default = mongoose_1.default.model('ObavestenjeModel', Obavestenje, 'obavestenja');
//# sourceMappingURL=obavestenje.js.map