// ============================================
// CONSTANTES DE VALIDAÇÃO
// ============================================

const REQUISITOS = {
    TAMANHO_MINIMO: 5,
    POSICAO_BANDEIRA: 4, // índice da quinta posição
    PI_DIGITOS: '314',
    ANO_BRASIL: '2006',
    CODIGO_BRASIL: '+55',
    NOME_CRIADOR: 'Karan',
    NOME_CRIADOR_LOWER: 'karan',
    COR_CORRETA: 'verde',
    EQUACAO_RESPOSTA: '2ou3',
    PORTA_HTTPS: '443',
    EMOJI_PROIBIDO: '🖕',
    BANDEIRA_PAISES_BAIXOS: '🇳🇱'
};

const MENSAGENS = {
    SENHA_OBRIGATORIA: 'Senha é obrigatória',
    TAMANHO_MINIMO: 'Senha deve ter pelo menos 5 caracteres',
    PRECISA_NUMERO: 'Senha deve conter pelo menos 1 número',
    PRECISA_LETRA: 'Senha deve conter pelo menos 1 letra',
    PRECISA_MAIUSCULA: 'Senha deve conter pelo menos 1 letra maiúscula',
    PRECISA_ESPECIAL: 'Senha deve conter pelo menos 1 caractere especial',
    PRECISA_EMOJI: 'Senha deve conter pelo menos 1 emoji',
    EMOJI_PROIBIDO: 'Não pode ter o dedo do meio, seu sem educação',
    PRECISA_EMOJI_CIMA: 'Senha deve conter um emoji apontando para cima',
    PRECISA_DIA_ROMANO: 'Senha deve conter o dia de hoje em romano',
    PRECISA_PI: 'Senha deve conter os primeiros números do PI',
    PRECISA_ANO: 'Senha deve conter o ano que o Brasil ganhou o penta',
    PRECISA_BANDEIRA: 'Senha deve conter a bandeira dos Países Baixos 🇳🇱',
    PRECISA_CODIGO_BRASIL: 'Senha deve conter o código de telefone do Brasil',
    PRECISA_VOGAIS: 'Senha deve conter todas as vogais maiúsculas (A, E, I, O, U)',
    BANDEIRA_POSICAO: 'A bandeira dos Países Baixos deve estar na quinta posição',
    PRECISA_FEITICO: 'Senha deve conter um feitiço do Harry Potter (Observe se está escrito com letra maiúscula as inicias)',
    PRECISA_TAMANHO_NA_SENHA: 'Senha deve conter o número atual de caracteres',
    PRECISA_CHROME: 'Senha deve conter a versão do seu Chrome',
    NOME_MAIUSCULA: 'Nome próprio é com letra maiúscula, manézão',
    PRECISA_NOME_CRIADOR: 'Nome do criador do site',
    PRECISA_COR: `Entre 'vermelho', 'azul' e 'verde', a cor correta é aquela cujo nome aparece exatamente duas vezes nesta frase, enquanto os demais aparecem uma vez cada: vermelho, azul, verde, verde.`,
    PRECISA_EQUACAO: 'x2−5x+6=0',
    PRECISA_PORTA: 'Porta padrão do HTTPS?'
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2600}-\u{2604}\u{260E}\u{2611}\u{2614}-\u{2615}\u{2618}\u{261D}\u{2620}\u{2622}-\u{2623}\u{2626}\u{262A}\u{262E}-\u{262F}\u{2638}-\u{263A}\u{2640}\u{2642}\u{2648}-\u{2653}\u{2660}\u{2663}\u{2665}-\u{2666}\u{2668}\u{267B}\u{267E}-\u{267F}\u{2692}-\u{2697}\u{2699}\u{269B}-\u{269C}\u{26A0}-\u{26A1}\u{26A7}\u{26AA}-\u{26AB}\u{26B0}-\u{26B1}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26C8}\u{26CE}-\u{26CF}\u{26D1}\u{26D3}-\u{26D4}\u{26E9}-\u{26EA}\u{26F0}-\u{26F5}\u{26F7}-\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]/u;

const EMOJIS_PARA_CIMA = ['☝', '👆', '⬆', '↑'];

const VOGAIS_MAIUSCULAS = ['A', 'E', 'I', 'O', 'U'];

const FEITICOS_HARRY_POTTER = [
    'Expelliarmus', 'Expecto Patronum', 'Lumos', 'Alohomora', 'Avada Kedavra', 
    'Wingardium Leviosa', 'Accio', 'Stupefy', 'Obliviate', 'Crucio', 'Imperio', 
    'Protego', 'Riddikulus', 'Nox', 'Petrificus Totalus', 'Finite Incantatem', 
    'Sectumsempra', 'Levicorpus', 'Aguamenti', 'Incendio', 'Episkey', 'Reparo', 
    'Silencio', 'Confundo', 'Reducto', 'Diffindo', 'Bombarda', 'Confringo', 
    'Geminio', 'Descendo', 'Ascendio', 'Aparecium', 'Colloportus', 'Expulso', 
    'Impedimenta', 'Engorgio', 'Reducio', 'Mobilicorpus', 'Piertotum Locomotor', 
    'Homenum Revelio', 'Salvio Hexia', 'Cave Inimicum', 'Muffliato', 'Langlock', 
    'Liberacorpus', 'Tergeo', 'Defodio', 'Deprimo', 'Carpe Retractum', 'Relashio', 
    'Obscuro', 'Anapneo', 'Rennervate', 'Vulnera Sanentur'
];

const VALORES_ROMANOS = [
    { valor: 30, romano: 'XXX' },
    { valor: 20, romano: 'XX' },
    { valor: 10, romano: 'X' },
    { valor: 9, romano: 'IX' },
    { valor: 5, romano: 'V' },
    { valor: 4, romano: 'IV' },
    { valor: 1, romano: 'I' }
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function validarEmail(email) {
    return EMAIL_REGEX.test(email);
}

function validarNome(nome) {
    return nome && nome.trim().length >= 3;
}

function converterParaRomano(num) {
    let resultado = '';
    for (let i = 0; i < VALORES_ROMANOS.length; i++) {
        while (num >= VALORES_ROMANOS[i].valor) {
            resultado += VALORES_ROMANOS[i].romano;
            num -= VALORES_ROMANOS[i].valor;
        }
    }
    return resultado;
}

function obterDiaRomanoHoje() {
    return converterParaRomano(new Date().getDate());
}

function validarPosicaoBandeira(senha) {
    const senhaArray = [...senha];
    return senhaArray[REQUISITOS.POSICAO_BANDEIRA] === '🇳' && 
           senhaArray[REQUISITOS.POSICAO_BANDEIRA + 1] === '🇱';
}

function calcularTamanhoSenha(senha) {
    const segmenter = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' });
    return [...segmenter.segment(senha)].length.toString();
}

function validarVogaisMaiusculas(senha) {
    const vogaisFaltando = VOGAIS_MAIUSCULAS.filter(vogal => !senha.includes(vogal));
    return vogaisFaltando.length === 0;
}

// ============================================
// VALIDAÇÃO DE SENHA
// ============================================

function validarSenha(senha, chromeVersion) {
    // Validações básicas
    if (!senha) {
        return { valido: false, mensagem: MENSAGENS.SENHA_OBRIGATORIA };
    }
    
    if (senha.length < REQUISITOS.TAMANHO_MINIMO) {
        return { valido: false, mensagem: MENSAGENS.TAMANHO_MINIMO };
    }
    
    if (!/\d/.test(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_NUMERO };
    }
    
    if (!/[a-z]/.test(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_LETRA };
    }
    
    if (!/[A-Z]/.test(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_MAIUSCULA };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_ESPECIAL };
    }
    
    // Validações de emojis
    if (!EMOJI_REGEX.test(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_EMOJI };
    }
    
    if (!EMOJIS_PARA_CIMA.some(emoji => senha.includes(emoji))) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_EMOJI_CIMA };
    }

    if (senha.includes(REQUISITOS.EMOJI_PROIBIDO)) {
        return { valido: false, mensagem: MENSAGENS.EMOJI_PROIBIDO };
    }
    
    // Validações de conteúdo específico
    const diaRomano = obterDiaRomanoHoje();
    if (!senha.includes(diaRomano)) {
        return { valido: false, mensagem: `${MENSAGENS.PRECISA_DIA_ROMANO}: ${diaRomano}` };
    }
    
    if (!senha.includes(REQUISITOS.PI_DIGITOS)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_PI };
    }
    
    if (!senha.includes(REQUISITOS.ANO_BRASIL)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_ANO };
    }
    
    if (!senha.includes(REQUISITOS.BANDEIRA_PAISES_BAIXOS)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_BANDEIRA };
    }
    
    if (!senha.includes(REQUISITOS.CODIGO_BRASIL)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_CODIGO_BRASIL };
    }
    
    // Validações de vogais
    if (!validarVogaisMaiusculas(senha)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_VOGAIS };
    }
    
    // Validação de posição da bandeira
    if (!validarPosicaoBandeira(senha)) {
        return { valido: false, mensagem: MENSAGENS.BANDEIRA_POSICAO };
    }
    
    // Validação de feitiço
    if (!FEITICOS_HARRY_POTTER.some(feitico => senha.includes(feitico))) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_FEITICO };
    }
    
    // Validação de tamanho
    const tamanhoSenha = calcularTamanhoSenha(senha);
    if (!senha.includes(tamanhoSenha)) {
        return { valido: false, mensagem: `${MENSAGENS.PRECISA_TAMANHO_NA_SENHA}` };
        //return { valido: false, mensagem: `${MENSAGENS.PRECISA_TAMANHO_NA_SENHA}: ${tamanhoSenha}` };
    }
    
    // Validação de Chrome
    if (chromeVersion && !senha.includes(chromeVersion)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_CHROME };
    }
    
    // Validações extras
    if (senha.includes(REQUISITOS.NOME_CRIADOR_LOWER)) {
        return { valido: false, mensagem: MENSAGENS.NOME_MAIUSCULA };
    }
    
    if (!senha.includes(REQUISITOS.NOME_CRIADOR)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_NOME_CRIADOR };
    }
    
    if (!senha.includes(REQUISITOS.COR_CORRETA)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_COR };
    }
   
    if (!senha.includes(REQUISITOS.EQUACAO_RESPOSTA)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_EQUACAO };
    }
    
    if (!senha.includes(REQUISITOS.PORTA_HTTPS)) {
        return { valido: false, mensagem: MENSAGENS.PRECISA_PORTA };
    }
    
    return { valido: true };
}

module.exports = {
    validarEmail,
    validarNome,
    converterParaRomano,
    validarSenha
};


