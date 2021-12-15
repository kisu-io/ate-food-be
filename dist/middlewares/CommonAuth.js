"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticate = void 0;
const utilities_1 = require("../utilities");
const Authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield (0, utilities_1.ValidateSignature)(req);
    if (signature) {
        return next();
    }
    else {
        return res.json({ message: "User Not authorized" });
    }
});
exports.Authenticate = Authenticate;
//# sourceMappingURL=CommonAuth.js.map