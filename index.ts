import express from "express";
import bodyParser from "body-parser";
import { AdminRoute, VendorRoute } from "./src/routes";
import { MONGO_URI } from "./src/config";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result: any) => {
    console.log("db connect");
  })
  .catch((err: any) => console.log(err));

app.listen(8000, () => {
  console.clear();
  console.log("App listening to the port 8000");
});
