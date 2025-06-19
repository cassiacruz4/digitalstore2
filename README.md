# 🛍️ Digital Store — Sistema de Gestão de Estoque e Cadastro de Clientes

Este projeto é um **sistema web completo** desenvolvido como parte do trabalho final do curso **GT01**, com o objetivo de automatizar a gestão de **estoque de sapatos**, **cadastro de clientes** e **controle de pedidos**.  

Ele combina:
- **Backend** em **Node.js** com **Express** e **MySQL**
- **Frontend** em **React** com rotas protegidas
- Autenticação de **funcionários**
- Proteção de páginas por login
- Cadastro e listagem de clientes
- Funcionalidades de adicionar, editar e excluir itens do estoque de sapatos

---

## 🚀 **Funcionalidades**

✅ **Login de Funcionários:**  
Acesso restrito para manipular dados sensíveis.  

✅ **Proteção de Rotas:**  
Somente usuários autenticados podem acessar:
- Cadastro de Clientes
- Listagem de Clientes
- Estoque de Sapatos
- Controle de Pedidos
- Pagamento

✅ **Cadastro de Clientes:**  
Funcionários podem registrar novos clientes para a loja.  

✅ **Listagem e Exclusão de Clientes:**  
Visualização de todos os clientes cadastrados e opção de excluir registros.

✅ **Gerenciamento de Estoque:**  
CRUD de sapatos (cadastrar, editar, excluir) com filtros por marca, tamanho, cor e preço.

✅ **Carrinho de Compras:**  
Simulação de carrinho com contador de itens.

✅ **Logout:**  
Botão para o funcionário encerrar a sessão com segurança.

---

## ⚙️ **Tecnologias Utilizadas**

- **Frontend:** React, React Router, Bootstrap
- **Backend:** Node.js, Express
- **Banco de Dados:** MySQL
- **Gerenciamento de Estado:** Context API para o carrinho
- **Gerenciamento de Rotas Privadas:** React Router + LocalStorage

---

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/cassiacruz4/digitalstore2.git
cd digitalstore2

✨ Desenvolvido por
Ana Cássia Cruz Araújo, João Victor e Guilher como Trabalho Final do Projeto Geração Tech 2025.1


