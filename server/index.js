const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require('./swagger');

const app = express();

app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 4545

const connectDB = async () => {
    try {
            await mongoose.connect(process.env.MONGODB_CONNECT_URL, {
                useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            }),
            console.log('MongoDB connected !');
            
    } 
    catch (error) {
        console.error('Mongo connection error:', error);
            process.exit(1)
    }   
}

connectDB();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error !!!:'));
db.once('open', () => console.log('Connected to MongoDB !'));


app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.use("/api/product",  require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.listen(PORT, () => console.log('Server started on port: ' + PORT))
