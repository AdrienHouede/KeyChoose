const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { createUser, findUserByEmail } = require("../models/User");

const findUserByEmailAsync = (email) =>
  new Promise((resolve, reject) => {
    findUserByEmail(email, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

const createUserAsync = (email, hash) =>
  new Promise((resolve, reject) => {
    createUser(email, hash, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const register = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;
    if (!email || !password || !roleId) {
      return res.status(400).json({ error: "Champs requis manquants : email, mot de passe et rôle" });
    }

    const existing = await findUserByEmailAsync(email);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    const hash = await bcrypt.hash(password, 10);
    const result = await createUserAsync(email, hash);

    if (result.affectedRows !== 1) {
      return res.status(500).json({ error: "Échec de la création de l’utilisateur" });
    }

    return res.status(201).json({ message: "Utilisateur enregistré avec succès", id: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email déjà présent en base", details: err.message });
    }
    return res.status(500).json({ error: "Erreur serveur lors de l’inscription", details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Champs requis manquants : email et mot de passe" });
    }

    const results = await findUserByEmailAsync(email);
    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.role_Id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ message: "Authentification réussie", token, expiresIn: 7 * 24 * 3600 });
  } catch (err) {
    return res.status(500).json({ error: "Erreur serveur lors de la connexion", details: err.message });
  }
};

module.exports = { register, login };