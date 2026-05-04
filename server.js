const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion MongoDB
connectDB();

// Sécurité
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Limiteur de tentatives de connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: 'Trop de tentatives. Réessayez dans 15 minutes'
  }
});
app.use('/api/auth/login-session', loginLimiter);
app.use('/api/auth/login-jwt', loginLimiter);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions (sans Redis - stockage en mémoire pour développement)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // false en développement (pas de HTTPS)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
  }
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Route de base
app.get('/', (req, res) => {
  res.send('API d\'authentification fonctionne ✅');
});

// Gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en cours d'exécution sur le port ${PORT}`);
});