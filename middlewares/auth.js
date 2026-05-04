const { verifyAccessToken } = require('../utils/tokenUtils');

// ==================== SESSION ====================

exports.isAuthenticatedWithSession = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  res.status(401).json({ success: false, message: 'Veuillez vous connecter' });
};

exports.authorizeWithSession = (roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.userRole) {
      return res.status(401).json({ success: false, message: 'Veuillez vous connecter' });
    }
    if (!roles.includes(req.session.userRole)) {
      return res.status(403).json({ success: false, message: 'Accès interdit' });
    }
    next();
  };
};

// ==================== JWT ====================

exports.isAuthenticatedWithJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token manquant' });
    }
    const token = authHeader.split(' ')[1];
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
};

exports.authorizeWithJWT = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ success: false, message: 'Authentification requise' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Accès interdit' });
    }
    next();
  };
};