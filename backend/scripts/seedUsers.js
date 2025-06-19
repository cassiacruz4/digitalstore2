const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { connectDB, closeDB, db } = require('../config/database');
const { User } = db;

// Carrega variáveis de ambiente
dotenv.config();

// Usuários de teste
const testUsers = [
  {
    name: 'Administrador',
    email: 'admin@digitalstore.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456',
    role: 'user'
  },
  {
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: '123456',
    role: 'user'
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro@email.com',
    password: '123456',
    role: 'user'
  }
];

async function seedUsers() {
  try {
    // Conecta ao MySQL
    const isConnected = await connectDB();
    if (!isConnected) {
      console.error('❌ Falha ao conectar com o banco de dados');
      return;
    }

    // Remove todos os usuários existentes
    await User.destroy({ where: {}, truncate: true });
    console.log('🗑️  Usuários existentes removidos');

    // Cria novos usuários com senha criptografada
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await User.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });
      console.log(`👤 Usuário criado: ${userData.name} (${userData.email})`);
    }

    console.log('\n🎉 Usuários de teste criados com sucesso!');
    console.log('\n📝 Credenciais para teste:');
    console.log('==========================================');
    testUsers.forEach(user => {
      console.log(`📧 Email: ${user.email}`);
      console.log(`🔑 Senha: ${user.password}`);
      console.log(`👑 Função: ${user.role}`);
      console.log('------------------------------------------');
    });

  } catch (error) {
    console.error('❌ Erro ao criar usuários:', error);
  } finally {
    // Fecha a conexão
    await closeDB();
    console.log('✅ Conexão com MySQL fechada');
    process.exit(0);
  }
}

// Executa o script
seedUsers();
