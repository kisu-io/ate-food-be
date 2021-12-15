import express, { Request, Response, NextFunction } from "express";
import {
  GetFoodAvailability,
  GetQuickBite,
  GetTopRestaurants,
  RestaurantById,
  SearchFoods,
} from "../controllers";

const router = express.Router();

router.get("/:pincode", GetFoodAvailability);
router.get("/top-restaurants/:pincode", GetTopRestaurants);
router.get("/quick-bite/:pincode", GetQuickBite);
router.get("/search/:pincode", SearchFoods);
router.get("/restaurant/:id", RestaurantById);

export { router as ShoppingRoute };
