import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Add this import
import path from "path";
import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cartRoutes.route.js";
import couponsRoutes from "./routes/coupons.route.js";
import PaymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 300; // Fixed typo in PORT
const __dirname = path.resolve();
// Configure CORSP
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development URL
      "https://e-commerce-api-theta-bice.vercel.app", // Vercel deployment URL
      // Add any additional URLs if needed
    ],
    credentials: true, // This is crucial for handling cookies
  })
);

// middleware
// app.use(express.json({ limit: "1mb" }));
// allows you to parse the body of the request

app.use(cookieParser());

// authorization
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/coupons", couponsRoutes);
app.use("/payments", PaymentRoutes);
app.use("/analytics", analyticsRoutes);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
