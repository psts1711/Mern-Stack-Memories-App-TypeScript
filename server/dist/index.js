"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const posts_1 = require("./routes/posts");
const users_1 = require("./routes/users");
const dotenv = require("dotenv");
// initialize
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// database connection
//const DB_URL = "mongodb+srv://adminuser:12345@cluster0.0guwh.mongodb.net/test?retryWrites=true&w=majority";
//const LOCALDB_URL = "mongodb://localhost:27017/MemoriesApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.LOCALDB_URL, { useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.log(`Server running on port ${error.message}`));
mongoose.set('useFindAndModify', false);
// Routes
app.use('/posts', posts_1.default);
app.use('/user', users_1.default);
app.get('/', (req, res) => {
    res.send('Api is running');
});
