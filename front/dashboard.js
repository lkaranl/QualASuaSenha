// Verificar autenticação ao carregar
window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Token inválido');
        }
        
        const data = await response.json();
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const hashValidacao = localStorage.getItem('hashValidacao');
        
        document.getElementById('conteudo').innerHTML = `
            <div style="text-align: center;">
                <h2>Bem-vindo, ${usuario.nome}!</h2>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p style="color: #667eea; margin-top: 20px;">Você está autenticado! 🎉</p>
                <div style="margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 8px; font-family: monospace; font-size: 12px; word-break: break-all;">
                    <strong>🔐 Prova de Autenticação:</strong><br>
                    ${hashValidacao || 'Hash não disponível'}
                </div>
            </div>
        `;
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('hashValidacao');
        window.location.href = 'index.html';
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('hashValidacao');
    window.location.href = 'index.html';
}
