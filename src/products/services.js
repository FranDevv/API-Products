//? ObjectID para converir los string en dicho obj
const { ObjectId } = require("mongodb");

//? Modulo de DB
const { Database } = require("../database/index");

//? Modulo de Utils
const { ProductsUtils } = require("./utils");

//? Colleccion a la cual pedir los documents (MONGODB)
const COLLECTION = "products";

// getAll
const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

// getById
const getById = async (id) => {
  const collection = await Database(COLLECTION);

  //MongoDB al buscar por ID busca por ObjectId, un objeto, por lo que hay que convertir el string
  return await collection.findOne({ _id: ObjectId(id) });
};

// create
const createProduct = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product);
};

// update
const updateProduct = async (id, updateProduct) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: {
      ...updateProduct,
    },
  };

  let result = await collection.updateOne(filter, updateDoc);
  return result;
};

// delete
const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: ObjectId(id) };

  return await collection.deleteOne(filter);
};

// generateExcelReport
const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  createProduct,
  generateReport,
  updateProduct,
  deleteProduct,
};
