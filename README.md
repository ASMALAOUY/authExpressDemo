# 🔐 Auth Express Demo

Projet d'authentification complet avec **Node.js**, **Express**, **MongoDB**, utilisant deux approches : **Sessions** et **JWT (JSON Web Tokens)**.

---

## 📋 Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Lancer le serveur](#lancer-le-serveur)
- [API Routes](#api-routes)
- [Tests avec Postman](#tests-avec-postman)
- [Sécurité](#sécurité)

---
## demo dans Postman
###  /register-session
<img width="898" height="840" alt="image" src="https://github.com/user-attachments/assets/be327d79-d925-4865-bb13-53333c0efb87" />
###  /login-session
<img width="885" height="880" alt="image" src="https://github.com/user-attachments/assets/5d51c3f4-f3dc-477e-90f5-d831cacd2b0d" />
###  /register-jwt
<img width="892" height="820" alt="image" src="https://github.com/user-attachments/assets/74940b67-9a11-4d9a-8e32-641b414348f7" />
###   /login-jwt
<img width="942" height="920" alt="image" src="https://github.com/user-attachments/assets/8edaa970-6f2b-443f-81ff-a7e8c1a4ee65" />
###   /profile-jwt
<img width="924" height="927" alt="image" src="https://github.com/user-attachments/assets/4f5144e3-737b-4399-99d1-8981f550d542" />
###  /logout-jwt

<img width="880" height="951" alt="image" src="https://github.com/user-attachments/assets/ffb4e505-e676-4e7a-b728-77118563e48a" />


## 🛠 Technologies utilisées

| Technologie | Version | Rôle |
|-------------|---------|------|
| Node.js | 14+ | Runtime JavaScript |
| Express | 4.x | Framework web |
| MongoDB | 7.x | Base de données |
| Mongoose | 9.x | ODM MongoDB |
| bcrypt | 6.x | Hachage des mots de passe |
| express-session | 1.x | Gestion des sessions |
| jsonwebtoken | 9.x | Génération des JWT |
| helmet | 8.x | Sécurité des en-têtes HTTP |
| express-rate-limit | 8.x | Protection contre la force brute |

---

## ✅ Prérequis

- [Node.js](https://nodejs.org/) v14 ou supérieur
- [MongoDB](https://www.mongodb.com/) installé et en cours d'exécution
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 📦 Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/auth-express-demo.git
cd auth-express-demo

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth_demo
NODE_ENV=development
SESSION_SECRET=votre_secret_de_session_tres_securise
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRY=15m
REFRESH_TOKEN_SECRET=votre_secret_refresh_token_tres_securise
REFRESH_TOKEN_EXPIRY=7d
```

> ⚠️ **Important :** Ne commitez jamais votre fichier `.env`. Il est déjà ajouté au `.gitignore`.

---

## 📁 Structure du projet

```
auth-express-demo/
├── config/
│   └── db.js                 # Connexion MongoDB
├── controllers/
│   └── authController.js     # Logique Session + JWT
├── middlewares/
│   ├── auth.js               # Protection des routes
│   └── errorHandler.js       # Gestion des erreurs
├── models/
│   └── User.js               # Modèle utilisateur + bcrypt
├── routes/
│   └── authRoutes.js         # Définition des routes
├── utils/
│   └── tokenUtils.js         # Génération/vérification JWT
├── .env                      # Variables d'environnement (non commité)
├── .env.example              # Modèle des variables d'environnement
├── .gitignore
├── package.json
├── README.md
└── server.js                 # Point d'entrée du serveur
```

---

## 🚀 Lancer le serveur

```bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
```

Le serveur démarre sur : `http://localhost:3000`

---

## 🛣 API Routes

### 🔵 Authentification par Session

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|--------------|
| POST | `/api/auth/register-session` | Inscription | ❌ |
| POST | `/api/auth/login-session` | Connexion | ❌ |
| GET | `/api/auth/logout-session` | Déconnexion | ✅ |
| GET | `/api/auth/profile-session` | Profil utilisateur | ✅ |
| GET | `/api/auth/admin-only` | Route admin | ✅ Admin |

### 🟢 Authentification par JWT

| Méthode | Route | Description | Auth requise |
|---------|-------|-------------|--------------|
| POST | `/api/auth/register-jwt` | Inscription | ❌ |
| POST | `/api/auth/login-jwt` | Connexion | ❌ |
| GET | `/api/auth/logout-jwt` | Déconnexion | ❌ |
| GET | `/api/auth/refresh-token` | Rafraîchir le token | ❌ |
| GET | `/api/auth/profile-jwt` | Profil utilisateur | ✅ Bearer Token |
| GET | `/api/auth/admin-only-jwt` | Route admin | ✅ Admin |

---

## 🧪 Tests avec Postman

### 1️⃣ Inscription (Session)

```http
POST http://localhost:3000/api/auth/register-session
Content-Type: application/json

{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}
```

**Réponse attendue :**
```json
{
    "success": true,
    "message": "Inscription réussie",
    "data": {
        "username": "testuser",
        "email": "test@example.com",
        "role": "user"
    }
}
```

---

### 2️⃣ Connexion (JWT)

```http
POST http://localhost:3000/api/auth/login-jwt
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "password123"
}
```

**Réponse attendue :**
```json
{
    "success": true,
    "message": "Connexion réussie",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "data": { ... }
}
```

---

### 3️⃣ Accès au profil (JWT)

```http
GET http://localhost:3000/api/auth/profile-jwt
Authorization: Bearer <votre_access_token>
```

---

### 4️⃣ Rafraîchir le token

```http
GET http://localhost:3000/api/auth/refresh-token
```
> Le refresh token est envoyé automatiquement via cookie HTTP-only.

---

## 🔒 Sécurité

Ce projet implémente plusieurs couches de sécurité :

- **bcrypt** — Hachage des mots de passe avec un facteur de coût de 12
- **helmet** — Sécurisation des en-têtes HTTP
- **express-mongo-sanitize** — Protection contre l'injection NoSQL
- **xss-clean** — Protection contre les attaques XSS
- **express-rate-limit** — Limitation à 5 tentatives de connexion toutes les 15 minutes
- **HTTP-only cookies** — Le refresh token est inaccessible via JavaScript
- **JWT à courte durée** — Access token expirant en 15 minutes

---

## 👤 Auteur

Projet réalisé dans le cadre d'un TP sur l'authentification avec Node.js et Express.

---

## 📄 Licence

[MIT](LICENSE)
