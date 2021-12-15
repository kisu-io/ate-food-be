import express, { Request, Response, NextFunction } from "express";
// import {
//   AddToCart,
//   CreateOrder,
//   CreatePayment,
//   CustomerLogin,
//   CustomerSignUp,
//   CustomerVerify,
//   DeleteCart,
//   EditCustomerProfile,
//   GetCart,
//   GetCustomerProfile,
//   GetOrderById,
//   GetOrders,
//   RequestOtp,
//   VerifyOffer,
// } from "../controllers";
import {
  CustomerSignUp,
  CustomerVerify,
  CustomerLogin,
  RequestOtp,
  GetCustomerProfile,
  EditCustomerProfile,
} from "../controllers";
import { Authenticate } from "../middlewares";
import { Offer } from "../models/Offer";

const router = express.Router();

router.post("/signup", CustomerSignUp);

router.post("/login", CustomerLogin);

router.use(Authenticate);

router.put("/verify", CustomerVerify);

router.get("/otp", RequestOtp);

router.get("/profile", GetCustomerProfile);
router.put("/profile", EditCustomerProfile);

// router.post("/cart", AddToCart);
// router.get("/cart", GetCart);
// router.delete("/cart", DeleteCart);

// router.get("/offer/verify/:id", VerifyOffer);

// router.post("/create-payment", CreatePayment);

// router.post("/create-order", CreateOrder);
// router.get("/orders", GetOrders);
// router.get("/order/:id", GetOrderById);

export { router as CustomerRoute };
