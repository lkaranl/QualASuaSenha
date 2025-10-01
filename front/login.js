document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageDiv = document.getElementById('message');
    
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            messageDiv.className = 'message success';
            messageDiv.textContent = data.message;
            
            // Salvar token, dados do usuário e hash de validação
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            localStorage.setItem('hashValidacao', data.hashValidacao);
            
            // Redirecionar para dashboard após 1 segundo
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message;
        }
    } catch (error) {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Erro ao conectar com o servidor';
    }
});
