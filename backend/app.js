const express = require("express");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api", stockRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;
