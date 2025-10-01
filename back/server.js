const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
const { validarEmail, validarNome, validarSenha } = require('./validacoes');
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'sua-chave-secreta-super-segura-2024';

// Armazenamento em memória (em produção, use um banco de dados)
const usuarios = [];
const hashsValidos = []; // Armazena hashes gerados com sucesso

// Caminho do arquivo para salvar cadastros
const arquivoCadastros = path.join(__dirname, 'cadastros.txt');

// Função para salvar cadastro em arquivo
function salvarCadastro(nome, email, senha) {
    const dataHora = new Date().toLocaleString('pt-BR');
    const linha = `${dataHora} | Nome: ${nome} | Email: ${email} | Senha: ${senha}\n`;
    
    fs.appendFileSync(arquivoCadastros, linha, 'utf8');
}

// Middleware de autenticação
function autenticar(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}


// Rota de registro
app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Pegar versão do Chrome
    const userAgent = req.headers['user-agent'] || '';
    const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
    
    // Validar nome
    if (!validarNome(nome)) {
        return res.status(400).json({ 
            message: 'Nome deve ter pelo menos 3 caracteres' 
        });
    }
    
    // Validar email
    if (!validarEmail(email)) {
        return res.status(400).json({ 
            message: 'Email inválido' 
        });
    }
    
    // Validar senha
    const validacaoSenha = validarSenha(senha, chromeVersion);
    if (!validacaoSenha.valido) {
        return res.status(400).json({ 
            message: validacaoSenha.mensagem 
        });
    }
    
    // Verificar se email já existe
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ 
            message: 'Email já cadastrado' 
        });
    }
    
    // Cadastrar usuário
    usuarios.push({ nome: nome.trim(), email, senha });
    
    // Salvar cadastro em arquivo
    salvarCadastro(nome.trim(), email, senha);
    
    res.status(201).json({ 
        message: 'Usuário cadastrado com sucesso!' 
    });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Validar email
    if (!validarEmail(email)) {
        return res.status(400).json({ 
            message: 'Email inválido' 
        });
    }
    
    // Validar se senha foi preenchida
    if (!senha) {
        return res.status(400).json({ 
            message: 'Senha é obrigatória' 
        });
    }
    
    // Buscar usuário
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
        return res.status(401).json({ 
            message: 'Email ou senha incorretos' 
        });
    }
    
    // Gerar token JWT
    const token = jwt.sign(
        { email: usuario.email, nome: usuario.nome },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    
    // Gerar hash de validação (impossível de falsificar)
    const timestamp = Date.now();
    const hashValidacao = CryptoJS.SHA256(
        `${usuario.email}:${usuario.nome}:${timestamp}:${JWT_SECRET}`
    ).toString();
    
    // Armazenar hash válido para verificação posterior
    hashsValidos.push({
        hash: hashValidacao,
        email: usuario.email,
        nome: usuario.nome,
        timestamp: timestamp,
        dataHora: new Date(timestamp).toLocaleString('pt-BR')
    });
    
    const mensagemSecreta = `✅ AUTENTICADO - Hash: ${hashValidacao.substring(0, 16)}...${hashValidacao.substring(hashValidacao.length - 16)} | Timestamp: ${timestamp}`;
    
    res.status(200).json({ 
        message: `Bem-vindo, ${usuario.nome}!`,
        token,
        usuario: { nome: usuario.nome, email: usuario.email },
        hashValidacao: mensagemSecreta
    });
});

// Rota protegida - Dashboard
app.get('/dashboard', autenticar, (req, res) => {
    res.status(200).json({
        message: 'Acesso autorizado',
        usuario: req.usuario
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
