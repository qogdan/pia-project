"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Pregled = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    doctors: {
        type: Array
    },
    spec: {
        type: String
    },
    name: {
        type: String
    },
    duration: {
        type: Number
    },
    price: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('PregledModel', Pregled, 'pregledi');
//# sourceMappingURL=pregled.js.map