const express = require("express");
const router = express.Router();

const { UsersController } = require("./controller");

module.exports.UsersAPI = (app) => {
  router
    // getUsers
    .get("/", UsersController.getUsers)
    // getUser
    .get("/:id", UsersController.getUser)
    // createUser
    .post("/", UsersController.createUser)
    // updateUser
    .put("/:id", UsersController.updateUser)
    // deleteUser
    .delete("/:id", UsersController.deleteUser);

  app.use("/api/users", router);
};
