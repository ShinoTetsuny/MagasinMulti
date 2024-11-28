const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));
app.use('/product', require('./routes/product'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
