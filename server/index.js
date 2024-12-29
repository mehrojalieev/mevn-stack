const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4545

function TestFn(req, res) {
            return res.send("Hello World")
}

app.use("/api/test",  TestFn)

app.listen(PORT, () => console.log('Server started on port: ' + PORT))
