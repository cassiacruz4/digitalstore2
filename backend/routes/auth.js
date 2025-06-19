const express = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');
const { User } = db;
const router = express.Router();

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email e senha são obrigatórios' 
      });
    }

    // Busca o usuário no banco de dados
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ 
        message: 'Credenciais inválidas' 
      });
    }

    // Verifica a senha
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        message: 'Credenciais inválidas' 
      });
    }

    // Atualiza último login
    await user.updateLastLogin();

    // Gera o token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Retorna o token e dados do usuário (sem a senha)
    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota para validar token
router.get('/validate', authenticateToken, async (req, res) => {
  try {
    // Se chegou até aqui, o token é válido
    const user = await User.findByPk(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'Usuário não encontrado' 
      });
    }

    res.json({
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Erro na validação do token:', error);
    res.status(500).json({ 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota para registro de usuário (opcional)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Verifica se o usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        message: 'Usuário já existe com este email' 
      });
    }

    // Cria o novo usuário (senha será criptografada automaticamente pelo hook)
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password
    });

    // Gera o token JWT
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    
    // Tratamento específico para erros de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({ 
        message: messages.join(', ')
      });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ 
        message: 'Este email já está em uso'
      });
    }
    
    res.status(500).json({ 
      message: 'Erro interno do servidor' 
    });
  }
});

// Rota para logout (opcional - principalmente para invalidar token no cliente)
router.post('/logout', authenticateToken, (req, res) => {
  // Em uma implementação mais robusta, você poderia adicionar o token a uma blacklist
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;