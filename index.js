'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', usersRoutes.routes);
app.use('/api', departmentRoutes.routes);
app.use('/api', employeeRoutes.routes);

app.listen(config.port, () => console.log('Server is listening on http://localhost:' + config.port))