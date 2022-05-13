const { SalesService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");
const debug = require("debug");
const { ObjectId } = require("mongodb");
require("debug")("app:module-sales-controller");

module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getSales();
      if (sales === {}) {
        Response.error(res, new createError.BadRequest());
      } else {
        Response.succes(res, 200, "Sales List 📋", sales);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getSale: async (req, res) => {
    try {
      let {
        params: { id },
      } = req;
      let sale = await SalesService.getSale(id);
      if (!sale) {
        Response.error(res, new createError.NotFound("Sale does'nt exist :("));
      } else {
        Response.succes(res, 200, `🛒 Sale id: ${id}`, sale);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createSale: async (req, res) => {
    let { body } = req;
    let sale = {
      ...body,
      client: ObjectId(body.client),
    };

    try {
      if (!body || Object.keys(body) === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        let result = await SalesService.createSale(sale);
        Response.succes(
          res,
          201,
          "✅ Sale add!",
          `Sale ID = ${result.insertedId}`
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateSale: async (req, res) => {
    try {
      let {
        body,
        params: { id },
      } = req;

      let result = await SalesService.updateSale(id, body);

      if (result.modifiedCount === 0) {
        Response.error(
          res,
          new createError.NotFound(
            "The sale don't exist, please verify the id x("
          )
        );
      } else {
        Response.succes(res, 200, `${result.modifiedCount} Sale(s) updated!🔁`);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  deleteSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let result = await SalesService.deleteSale(id);
      if (result.deletedCount === 1) {
        Response.succes(res, 200, "🚮 Sale(s) deleted!");
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
