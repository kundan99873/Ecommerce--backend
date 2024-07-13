import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import connection from "./config/dbconn.js";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import orderRouter from "./router/orderRouter.js";
import bannerRouter from "./router/bannerRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import cartRouter from "./router/cartRouter.js";
import addressRouter from "./router/addressRouter.js";
import paymentRouter from "./router/paymentRouter.js";
import wishlistRouter from "./router/wishlistRouter.js";
import errorMiddleware from "./middleware/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "https://ecommerce-chi-henna-19.vercel.app",
    credentials: true,
  })
);
app.use(morgan("tiny"));

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});



app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Backend Page</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #f0f0f0;
              }
              .container {
                  text-align: center;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Backend Page</h1>
              <p>Your landing page is ready!</p>
          </div>
      </body>
      </html>
  `);
});

connection();

app.listen(3000, () => {
  console.log("connected to backend successfully...");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/banner", bannerRouter);
app.use("/category", categoryRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);
app.use("/payment", paymentRouter);

app.all("*", (req, res) => {
  return res.status(404).send("OOPS!!! 404 Page Not Found");
});

app.use(errorMiddleware);
