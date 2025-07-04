const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    console.log(` `);
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;