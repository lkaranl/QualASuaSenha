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
        
        document.getElementById('conteudo').innerHTML = `
            <div style="text-align: center;">
                <h2>Bem-vindo, ${usuario.nome}!</h2>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p style="color: #667eea; margin-top: 20px;">Você está autenticado! 🎉</p>
            </div>
        `;
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}
