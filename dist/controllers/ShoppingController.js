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
exports.RestaurantById = exports.SearchFoods = exports.GetQuickBite = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
// import { Offer } from "../models/Offer";
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
        .sort([["rating", "descending"]])
        .populate("foods");
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "data Not found!" });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
        .sort([["rating", "descending"]])
        .limit(10);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "data Not found!" });
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetQuickBite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: true })
        .sort([["rating", "descending"]])
        .populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map((vendor) => {
            const foods = vendor.foods;
            foodResult.push(...foods.filter((food) => food.readyTime <= 30));
        });
        return res.status(200).json(foodResult);
    }
    return res.status(404).json({ msg: "data Not found!" });
});
exports.GetQuickBite = GetQuickBite;
const SearchFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vendor.find({ pincode: pincode, serviceAvailable: true }).populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map((item) => foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }
    return res.status(404).json({ msg: "data Not found!" });
});
exports.SearchFoods = SearchFoods;
const RestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vendor.findById(id).populate("foods");
    if (result) {
        return res.status(200).json(result);
    }
    return res.status(404).json({ msg: "data Not found!" });
});
exports.RestaurantById = RestaurantById;
// export const GetAvailableOffers = async (req: Request, res: Response, next: NextFunction) => {
//   const pincode = req.params.pincode;
//   const offers = await Offer.find({ pincode: pincode, isActive: true });
//   if (offers) {
//     return res.status(200).json(offers);
//   }
//   return res.json({ message: "Offers not Found!" });
// };
//# sourceMappingURL=ShoppingController.js.map