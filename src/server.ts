import config from "@config";
import cors, { CorsOptions } from "cors";
import express from "express";
import expressDebug from "express-debug";
import {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormError,
} from "@middlewares/error.handler";
import apiRouter from "@api-router";

const app = express();
const PORT = config.port;
// package.json dev
// I can't run both web server and the debugger on the same port. They are separate servers
// it looks like the debugger is a server built in into the nodejs runtime
// cross-env NODE_OPTIONS='--inspect'
const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:9229",
  "http://127.0.0.1:5500",
  "https://my-very-first-server-production.up.railway.app/",
];

const corsConfig: CorsOptions = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin as string)) {
      cb(null, true);
    }
  },
};

// app.use(cors(corsConfig)); FIX THIS. Cors is blocking every connection even though whitelist is up
app.use(express.json());
apiRouter(app);

//Error handling
app.use(logErrors);
app.use(ormError)
app.use(boomErrorHandler);
app.use(errorHandler);

// logging
app.use(expressDebug);

app.listen(PORT);

app.on("error", () => {
});
