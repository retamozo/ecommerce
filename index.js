const express = require('express');
const router = require('./routes');
const cors = require("cors");
const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares');
const expressDebug = require("express-debug")

const app = express();
const port = process.env.PORT || 3000;
// package.json dev
// I can't run both web server and the debugger on the same port. They are separate servers
// it looks like the debugger is a server built in into the nodejs runtime
// cross-env NODE_OPTIONS='--inspect'
const whitelist = ["http://localhost:3000", "http://127.0.0.1:9229", "http://127.0.0.1:5500"];

const corsConfig = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin)) {
      cb(null, true)
    }
  }
}
app.use(cors(corsConfig))
app.use(express.json());
router(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(expressDebug)

app.listen(port, () => {
  console.log('Mi port' + port);
});
