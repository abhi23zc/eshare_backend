require('dotenv').config();
const mongoose = require('mongoose')

const URI = process.env.MONGO_CONNECT_URI;

const connect = async () => {
    try {
      const conn = await mongoose.connect(URI, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      
    }
  }

module.exports = connect;