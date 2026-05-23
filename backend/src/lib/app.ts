import errorMiddleWare from "@/middlewares/error";
import eventRoutes from "@/routes/event-route";
import eventVendorRoutes from "@/routes/event-vendor-route";
import globalVendorRoutes from "@/routes/global-vendor-route";
import paymentRoutes from "@/routes/payment-route";
import statsRoutes from "@/routes/stats-route";
import taskRoutes from "@/routes/task-route";
import userRoutes from "@/routes/user-route";
import env from "@/utils/env";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: [env.FRONTEND_URL, "http://localhost:3001"], credentials: true }));

app.use(clerkMiddleware({ clockSkewInMs: 60000 }));

app.get("/", (_, res) => res.json({ status: "OK", service: "Evently Backend" }));
app.get("/health", (_, res) => {
    console.log("LOGGING FOR DEBUGGING:");
    console.log("Is DATABASE_URL present?:", process.env["DATABASE_URL"]);
    console.log("Is FRONTEND_URL present?:", process.env["FRONTEND_URL"]);

    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/event-vendors", eventVendorRoutes);
app.use("/api/global-vendors", globalVendorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/stats", statsRoutes);

app.use(errorMiddleWare);

export default app;
