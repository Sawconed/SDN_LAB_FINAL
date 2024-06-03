const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");
const promotionRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");
const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: ".env.local" });
app.use(bodyParser.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });

    app.use("/dishes", dishRouter);
    app.use("/promotions", promotionRouter);
    app.use("/leaders", leaderRouter);
  })
  .catch((error) => {
    console.log(error);
  });
