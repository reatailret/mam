"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var b_1 = require("./b");
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.b = function () {
        console.log("B CALL");
        return new b_1.b();
    };
    return a;
}());
exports.a = a;
var ai = new a();
ai.b();
