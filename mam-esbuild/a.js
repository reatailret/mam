"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var b_1 = require("./b");
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.test = function (s) {
        if (s instanceof b_1.b) {
            console.log(111);
        }
    };
    return a;
}());
exports.a = a;
