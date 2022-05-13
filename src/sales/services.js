const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");

const COLLECTION = "sales";

const getSales = async () => {
  const collection = await Database(COLLECTION);

  return await collection
    .aggregate([
      {
        $lookup: {
          from: "users", //colleccion a unir
          localField: "client", //!nombre del campo de la collecion del metodo aggregate() (i.e sales)
          foreignField: "_id", //!nombre del campo de la colleccion del "from" (i.e users)
          as: "client_info", //nombre como queres que se muestre
        },
      },
    ])
    .toArray();
};

const getSale = async (id) => {
  const collection = await Database(COLLECTION);

  return await collection
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "client",
          foreignField: "_id",
          as: "client_info",
        },
      },
      {
        $match: { _id: ObjectId(id) },
      },
    ])
    .toArray();
};

const createSale = async (sale) => {
  const collection = await Database(COLLECTION);

  return await collection.insertOne(sale);
};

const updateSale = async (id, updateProd) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: {
      ...updateProd,
    },
  };

  return await collection.updateOne(filter, updateDoc);
};

const deleteSale = async (id) => {
  const collection = await Database(COLLECTION);

  const filter = { _id: ObjectId(id) };
  return await collection.deleteOne(filter);
};

module.exports.SalesService = {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
};
