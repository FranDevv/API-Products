const express = require("express");
const { SalesController } = require("./controller");

const router = express.Router();

module.exports.SalesAPI = (app) => {
  router
    // getSales
    .get("/", SalesController.getSales)
    // getSale
    .get("/:id", SalesController.getSale)
    //createSale
    .post("/", SalesController.createSale)
    // updateSale
    .put("/:id", SalesController.updateSale)
    // deleteSale
    .delete("/:id", SalesController.deleteSale);

  app.use("/api/sales", router);
};
