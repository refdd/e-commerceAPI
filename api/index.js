import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import productsRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cartRoutes.route.js";
import couponsRoutes from "./routes/coupons.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = 3000; // Fixed PORT value
const __dirname = path.resolve();

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-api-theta-bice.vercel.app",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Needed for Vercel deployment
