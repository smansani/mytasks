const mongoose = require('mongoose');
const mongodburl = "mongodb://localhost:27017/my-tasks";

const connectToMongo = () => {
     mongoose.connect(mongodburl).then(()=>{console.log("databse connected successfully")});
};

module.exports = connectToMongo;
