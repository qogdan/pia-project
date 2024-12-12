"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Specijalizacija = new Schema({
    _id: {
        type: mongodb_1.ObjectId
    },
    name: {
        type: String
    },
    pregledi: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('SpecModel', Specijalizacija, 'specijalizacije');
//# sourceMappingURL=specijalizacija.js.map