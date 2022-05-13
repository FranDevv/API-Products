const createError = require("http-errors");
/* Capa servicios */
const { ProductsService } = require("./services");
/* Debug */
const debug = require("debug")("app:module-products-controller");
/* Respuestas estandar */
const { Response } = require("../common/response");

// En el controlador es donde se manejan los errores mediante bloques try-catch
module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.succes(res, 200, "Products List 📋", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      // Asi se consigue los parametros del req
      const {
        params: { id },
      } = req;
      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `📦 Product: ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.createProduct(body);
        Response.succes(res, 201, "✅ Product add!", body);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      const product = ProductsService.getById(id);

      if (!body || Object.keys(body).length === 0 || !product) {
        Response.error(res, new createError.BadRequest());
      } else {
        await ProductsService.updateProduct(id, body);
        Response.succes(res, 201, `Product updated 🔁`);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  // delete

  deleteProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let result = await ProductsService.deleteProduct(id);
      if (result.deletedCount === 1) {
        Response.succes(res, 200, `🚮 Product deleted!`);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
    // update
  },
};
