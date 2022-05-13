const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");

const COLLECTION = "users";

const getUsers = async () => {
  const connection = await Database(COLLECTION);

  return await connection.find({}).toArray();
};

const getUser = async (id) => {
  const connection = await Database(COLLECTION);

  return await connection.findOne({ _id: ObjectId(id) });
};

const createUser = async (body) => {
  const connection = await Database(COLLECTION);

  return await connection.insertOne(body);
};

const updateUser = async (id, newBody) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: {
      ...newBody,
    },
  };

  let result = await collection.updateOne(filter, updateDoc);
  return result;
};

const deleteUser = async (id) => {
  const connection = await Database(COLLECTION);

  let filter = { _id: ObjectId(id) };

  return await connection.deleteOne(filter);
};

module.exports.UserService = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
