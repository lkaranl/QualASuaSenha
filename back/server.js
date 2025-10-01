const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');
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

// Validação de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação de nome
function validarNome(nome) {
    return nome && nome.trim().length >= 3;
}

// Converter número para romano
function converterParaRomano(num) {
    const valores = [
        { valor: 10, romano: 'X' },
        { valor: 9, romano: 'IX' },
        { valor: 5, romano: 'V' },
        { valor: 4, romano: 'IV' },
        { valor: 1, romano: 'I' }
    ];
    
    let resultado = '';
    for (let i = 0; i < valores.length; i++) {
        while (num >= valores[i].valor) {
            resultado += valores[i].romano;
            num -= valores[i].valor;
        }
    }
    return resultado;
}

// Validação de senha
function validarSenha(senha, chromeVersion) {
    if (!senha) {
        return { valido: false, mensagem: 'Senha é obrigatória' };
    }
    
    if (senha.length < 5) {
        return { valido: false, mensagem: `Senha deve ter pelo menos 5 caracteres`};
    }
    
    if (!/\d/.test(senha)) {
        return { valido: false, mensagem: 'Senha deve conter pelo menos 1 número' };
    }
    
    // Regex para detectar emojis
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2600}-\u{2604}\u{260E}\u{2611}\u{2614}-\u{2615}\u{2618}\u{261D}\u{2620}\u{2622}-\u{2623}\u{2626}\u{262A}\u{262E}-\u{262F}\u{2638}-\u{263A}\u{2640}\u{2642}\u{2648}-\u{2653}\u{2660}\u{2663}\u{2665}-\u{2666}\u{2668}\u{267B}\u{267E}-\u{267F}\u{2692}-\u{2697}\u{2699}\u{269B}-\u{269C}\u{26A0}-\u{26A1}\u{26A7}\u{26AA}-\u{26AB}\u{26B0}-\u{26B1}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26C8}\u{26CE}-\u{26CF}\u{26D1}\u{26D3}-\u{26D4}\u{26E9}-\u{26EA}\u{26F0}-\u{26F5}\u{26F7}-\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]/u;
    
    if (!emojiRegex.test(senha)) {
        return { valido: false, mensagem: 'Senha deve conter pelo menos 1 emoji' };
    }
    
    // Validar dia em romano
    const hoje = new Date();
    const dia = hoje.getDate();
    const diaRomano = converterParaRomano(dia);
    
    if (!senha.includes(diaRomano)) {
        return { valido: false, mensagem: `Senha deve conter o dia de hoje em romano: ${diaRomano}` };
    }
    
    // Validar primeiros números do PI
    if (!senha.includes('314')) {
        return { valido: false, mensagem: 'Senha deve conter os primeiros números do PI' };
    }
    
    // Validar se não tem dedo do meio
    if (senha.includes('🖕')) {
        return { valido: false, mensagem: 'Não pode ter o dedo do meio, seu sem educação' };
    }
    
    // Validar emoji apontando para cima
    const emojisParaCima = ['☝', '👆', '⬆', '↑'];
    const temEmojiParaCima = emojisParaCima.some(emoji => senha.includes(emoji));
    
    if (!temEmojiParaCima) {
        return { valido: false, mensagem: 'Senha deve conter um emoji apontando para cima' };
    }
    
    // Validar ano do hexa (Brasil ainda não ganhou, então aceita 2002 - penta)
    if (!senha.includes('2006')) {
        return { valido: false, mensagem: 'Senha deve conter o ano que o Brasil ganhou o penta' };
    }
    
    // Validar bandeira dos Países Baixos
    if (!senha.includes('🇳🇱')) {
        return { valido: false, mensagem: 'Senha deve conter a bandeira dos Países Baixos' };
    }
    
    // Validar todas as vogais maiúsculas
    const vogaisMaiusculas = ['A', 'E', 'I', 'O', 'U'];
    const vogaisFaltando = vogaisMaiusculas.filter(vogal => !senha.includes(vogal));
    
    if (vogaisFaltando.length > 0) {
        return { valido: false, mensagem: `Senha deve conter todas as vogais maiúsculas (A, E, I, O, U)` };
    }
    
    // Validar código do telefone do Brasil
    if (!senha.includes('+55')) {
        return { valido: false, mensagem: 'Senha deve conter o código de telefone do Brasil' };
    }
    
    // Validar bandeira dos Países Baixos na quinta posição (índice 4)
    const senhaArray = [...senha];
    if (senhaArray[4] !== '🇳' || senhaArray[5] !== '🇱') {
        return { valido: false, mensagem: 'A bandeira dos Países Baixos deve estar na quinta posição' };
    }
    
    // Validar feitiço do Harry Potter
    const feiticos = ['Expelliarmus', 'Expecto Patronum', 'Lumos', 'Alohomora', 'Avada Kedavra', 'Wingardium Leviosa', 'Accio', 'Stupefy', 'Obliviate', 'Crucio', 'Imperio', 'Protego', 'Riddikulus', 'Nox', 'Petrificus Totalus', 'Finite Incantatem', 'Sectumsempra', 'Levicorpus', 'Aguamenti', 'Incendio', 'Episkey', 'Reparo', 'Silencio', 'Confundo', 'Reducto', 'Diffindo', 'Bombarda', 'Confringo', 'Geminio', 'Descendo', 'Ascendio', 'Aparecium', 'Colloportus', 'Expulso', 'Impedimenta', 'Engorgio', 'Reducio', 'Mobilicorpus', 'Piertotum Locomotor', 'Homenum Revelio', 'Salvio Hexia', 'Cave Inimicum', 'Muffliato', 'Langlock', 'Liberacorpus', 'Tergeo', 'Defodio', 'Deprimo', 'Carpe Retractum', 'Relashio', 'Obscuro', 'Anapneo', 'Rennervate', 'Vulnera Sanentur'];
    const temFeitico = feiticos.some(feitico => senha.includes(feitico));
    
    if (!temFeitico) {
        return { valido: false, mensagem: 'Senha deve conter um feitiço do Harry Potter' };
    }
    
    // Validar número de caracteres (contando emojis compostos como 1)
    const segmenter = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' });
    const tamanhoSenha = [...segmenter.segment(senha)].length.toString();
    if (!senha.includes(tamanhoSenha)) {
        return { valido: false, mensagem: `Senha deve conter o número atual de caracteres: ${tamanhoSenha}` };
    }
    
    // Validar versão do Chrome
    if (chromeVersion && !senha.includes(chromeVersion)) {
        return { valido: false, mensagem: `Senha deve conter a versão do Chrome` };
    }
    
    // Validar nome do criador
    if (senha.includes('karan')) {
        return { valido: false, mensagem: 'Nome próprio é com letra maiúscula' };
    }

    if (!senha.includes('Karan')) {
        return { valido: false, mensagem: 'Nome do criador do site' };
    }

    if (!senha.includes('verde')) {
        return { valido: false, mensagem: `Entre ‘vermelho’, ‘azul’ e ‘verde’, a cor correta é aquela cujo nome aparece exatamente duas vezes nesta frase, enquanto os demais aparecem uma vez cada: vermelho, azul, verde, verde.` };
    }
   
    if (!senha.includes('2ou3')) {
        return { valido: false, mensagem: 'x2−5x+6=0' };
    }

    
    if (!senha.includes('443')) {
        return { valido: false, mensagem: 'Porta padrão do HTTPS?' };
    }
    
    
    return { valido: true };
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
    
    // Pegar versão do Chrome
    const userAgent = req.headers['user-agent'] || '';
    const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
    
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
