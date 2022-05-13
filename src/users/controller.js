const { UserService } = require("./services");
const { Response } = require("../common/response");
const createError = require("http-errors");
const debug = require("debug");
require("debug")("app:module-users-controller");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UserService.getUsers();
      Response.succes(res, 200, "Users List 📋", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getUser: async (req, res) => {
    try {
      let {
        params: { id },
      } = req;

      let user = await UserService.getUser(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.succes(res, 200, `🙎‍♂️ user ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createUser: async (req, res) => {
    try {
      let { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        let user = await UserService.createUser(body);
        Response.succes(res, 200, "✅ User add!", body);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  updateUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      const result = await UserService.updateUser(id, body);

      if(result.modifiedCount === 0) {
        Response.error(res, new createError.NotFound())
      } else {
        Response.succes(res, 200, 'User updated!🔁')
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let result = await UserService.deleteUser(id);
      if (result.deletedCount === 1) {
        Response.succes(res, 200, "🚮 User deleted");
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
