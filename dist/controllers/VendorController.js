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
exports.GetFoods = exports.AddFood = exports.UpdateVendorService = exports.UpdateVendorCoverImage = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VendorLogin = void 0;
const _1 = require(".");
const models_1 = require("../models");
const utilities_1 = require("../utilities");
const VendorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield (0, _1.FindVendor)("", email);
    if (existingUser !== null) {
        const validation = yield (0, utilities_1.ValidatePassword)(password, existingUser.password, existingUser.salt);
        if (validation) {
            const signature = yield (0, utilities_1.GenerateSignature)({
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name,
            });
            return res.json(signature);
        }
    }
    return res.json({ message: "Login credential is not valid" });
});
exports.VendorLogin = VendorLogin;
const GetVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVendor = yield (0, _1.FindVendor)(user._id);
        return res.json(existingVendor);
    }
    return res.json({ message: "Vendor Information Not Found" });
});
exports.GetVendorProfile = GetVendorProfile;
const UpdateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { foodType, name, address, phone } = req.body;
    if (user) {
        const existingVendor = yield (0, _1.FindVendor)(user._id);
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodType;
            const saveResult = yield existingVendor.save();
            return res.json(saveResult);
        }
    }
    return res.json({ message: "Unable to Update vendor profile " });
});
exports.UpdateVendorProfile = UpdateVendorProfile;
const UpdateVendorCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vendor = yield (0, _1.FindVendor)(user._id);
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            vendor.coverImages.push(...images);
            const saveResult = yield vendor.save();
            return res.json(saveResult);
        }
    }
    return res.json({ message: "Unable to Update vendor picture " });
});
exports.UpdateVendorCoverImage = UpdateVendorCoverImage;
const UpdateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVendor = yield (0, _1.FindVendor)(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
            const saveResult = yield existingVendor.save();
            return res.json(saveResult);
        }
    }
    return res.json({ message: "Unable to Update vendor service " });
});
exports.UpdateVendorService = UpdateVendorService;
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { name, description, category, foodType, readyTime, price } = req.body;
    if (user) {
        const vendor = yield (0, _1.FindVendor)(user._id);
        if (vendor !== null) {
            const files = req.files;
            const images = files.map((file) => file.filename);
            const food = yield models_1.Food.create({
                vendorId: vendor._id,
                name: name,
                description: description,
                category: category,
                price: price,
                rating: 0,
                readyTime: readyTime,
                foodType: foodType,
                images: images,
            });
            vendor.foods.push(food);
            const result = yield vendor.save();
            return res.json(result);
        }
    }
    return res.json({ message: "Unable to Update vendor profile " });
});
exports.AddFood = AddFood;
const GetFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vendorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({ message: "Foods not found!" });
});
exports.GetFoods = GetFoods;
//# sourceMappingURL=VendorController.js.map