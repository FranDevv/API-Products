// ?Requiero express para acceder al metodo Router()
const express = require("express");

// ?Modulo Controlador
const { ProductsController } = require("./controller");

// ?Router permite manejar las rutas del modulo independientemente de la app
const router = express.Router();

module.exports.ProductsAPI = (app) => {
  router
    /* 
        *poner rutas que piden /:id luego o al ultimo de las que piden un param
        *EJ: /report va primero que /:id 
        !si va primero /:id no se puede acceder a /report porque cree que '/report' es un /:id
    */
    .get("/", ProductsController.getProducts)
    .get("/report", ProductsController.generateReport)
    .get("/:id", ProductsController.getProduct)
    .post("/", ProductsController.createProduct)
    .put("/:id", ProductsController.updateProduct)
    .delete("/:id", ProductsController.deleteProduct);

  // Concatena la ruta y la configura
  app.use("/api/products", router);
};
