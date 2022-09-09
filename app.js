const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000;
const route = require('./routes');

app.use(cors());

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/barang', route.barangRouter);
app.use('/api/user',route.userRouter);

app.use('/api/incoming',route.incomingRouter);
app.use('/api/outgoing',route.outgoingRouter);

app.use('/api/transaction', route.transactionRouter);

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));