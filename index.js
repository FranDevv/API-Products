const express = require('express');
const debug = require('debug')('app:main');

/* PORT */
const { Config } = require('./src/config/index');
/* Modulo de productos */
const { ProductsAPI } = require('./src/products/index');
const { SalesAPI } = require('./src/sales/index');
const { UsersAPI } = require('./src/users/index');
const { IndexAPI, NotFoundAPI } = require('./src/index')

const app = express();

// ?decirle que use json es para que en la peticion al servidor se pueda enviar json, y solo va a permitir las peticiones que tengan un body de tipo json
app.use(express.json());

//modulos
IndexAPI(app);
ProductsAPI(app);
SalesAPI(app);
UsersAPI(app);
NotFoundAPI(app);


// ?App escucha en el puerto [Config.port] las peticiones.
app.listen(Config.port, () => {
    debug(`Server listen on port ${Config.port}`);
});