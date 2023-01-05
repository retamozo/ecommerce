const productRouter = require("./products")
const categoriesRouter = require("./categories")
const express = require("express")

const routerApi = (app) => {
  const router = express.Router()
  app.get("/", (req, res) => res.send("aloha"))
  app.use("/api/v1", router)
  router.use("/products", productRouter)
  router.use("/categories", categoriesRouter)
}

module.exports = routerApi
