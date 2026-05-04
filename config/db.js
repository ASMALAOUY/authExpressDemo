const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Mongoose v9+ : plus besoin des options dépréciées
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;