import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import dishRouter from "./routes/dishRouter.js";
import promotionRouter from "./routes/promoRouter.js";
import leaderRouter from "./routes/leaderRouter.js";

const app = express();
dotenv.config({ path: ".env.local" });
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});

app.use("/dishes", dishRouter);
app.use("/promotions", promotionRouter);
app.use("/leaders", leaderRouter);
