document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const messageDiv = document.getElementById('message');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Mostrar loading
    loadingOverlay.classList.add('show');
    messageDiv.textContent = '';
    
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const data = await response.json();
        console.log(data);
        
        // Esconder loading
        loadingOverlay.classList.remove('show');
        
        if (response.ok) {
            messageDiv.className = 'message success';
            
            let tempoRestante = 3;
            messageDiv.innerHTML = `
                ${data.message}<br>
                <strong>Copie sua senha agora!</strong><br>
                Redirecionando em ${tempoRestante} segundos...
            `;
            
            const intervalo = setInterval(() => {
                tempoRestante--;
                if (tempoRestante > 0) {
                    messageDiv.innerHTML = `
                        ${data.message}<br>
                        <strong>Copie sua senha agora!</strong><br>
                        Redirecionando em ${tempoRestante} segundos...
                    `;
                } else {
                    clearInterval(intervalo);
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            messageDiv.className = 'message error';
            messageDiv.textContent = data.message;
        }
    } catch (error) {
        // Esconder loading em caso de erro
        loadingOverlay.classList.remove('show');
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Erro ao conectar com o servidor';
    }
});
