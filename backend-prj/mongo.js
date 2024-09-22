const mongoose = require('mongoose');
const mongodburl = "mongodb+srv://smansani:smansani@cluster0.d5o2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = () => {
     mongoose.connect(mongodburl).then(()=>{console.log("databse connected successfully")});
};

module.exports = connectToMongo;
