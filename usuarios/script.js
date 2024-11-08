import { baseUrl } from "../configApi.js"
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


        
async function carregarUsuarios() {
    console.log('logison')
    try {
        const response = await fetch(`${baseUrl}/Usuarios`);
        const usuarios = await response.json();
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderizarUsuarios(usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

function renderizarUsuarios(usuarios) {
    const grid = document.querySelector('#users-grid');
    grid.innerHTML = '';
    const body = document.querySelector("body")
    
    usuarios.forEach(usuario => {
    const card = document.createElement('div');
    card.className = 'user-card';
        card.insertAdjacentHTML("beforeend", `
            <div id=${usuario.id} class="user-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <div class="user-name">${usuario.nome}</div>
          
        `);
        
        grid.appendChild(card);
        const cardUser = document.getElementById(usuario.id)

        cardUser.addEventListener('click', () => mostrarModal(usuario));
    });
}

function mostrarModal(usuario) {
    console.log(usuario,"usuario")
    const modal = document.getElementById('userModal');
    document.getElementById('userNome').value = usuario.nome;
    document.getElementById('userEmail').value = usuario.email;
    document.getElementById('userSenha').value = usuario.senha;
    modal.style.display = 'block';
}
// Fechar modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('userModal').style.display = 'none';
});

// Iniciar aplicação
carregarUsuarios();