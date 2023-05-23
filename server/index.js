import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import http from "http";
import mongoose from "mongoose";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error({ err });
    process.exit(1);
  });
