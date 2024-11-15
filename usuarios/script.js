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

        cardUser.addEventListener('click', () => {mostrarModal(usuario)});
    });
}

function mostrarModal(usuario) {
    console.log(usuario,"usuario")
    document.body.insertAdjacentHTML("beforeend",`
        <div id="userModal" class="modal">
            <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Informações do Usuário</h2>
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" id="userNome" readonly>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="text" id="userEmail" readonly>
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" id="userSenha" readonly>
            </div>
        </div>
        </div>
        `)
    const modal = document.getElementById('userModal');
    document.getElementById('userNome').value = usuario.nome;
    document.getElementById('userEmail').value = usuario.email;
    document.getElementById('userSenha').value = usuario.senha;
    modal.style.display = 'block';

    const btnmodal = document.querySelector(".close-btn") //btn sair do ADICIONAR Usuario
btnmodal.addEventListener("click", () => {
        console.log("click")
        const modal = document.querySelector(".modal")
        modal .remove()
    })
    
}


// Iniciar aplicação
carregarUsuarios();

//Botao de voltar
const botaoDeVoltar = document.querySelector(".back-button")
botaoDeVoltar.addEventListener('click', () => {
 window.location.href = "../home/index.html"
   
});


const btnAddUsuario = document.querySelector(".addUsuario")
btnAddUsuario.addEventListener("click", () => {
    modalNovoUsuario()

})


function modalNovoUsuario(){
    const body = document.querySelector("body")
     body.insertAdjacentHTML("beforeend", `    
    <div id="userModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Cadastro Novo Usuario</h2>
            <form id="formNovoUsuario">
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" id="userNome">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="text" id="userEmail">
            </div>
            <div class="form-group">
                <label>Senha:</label>
                <input type="password" id="userSenha">
               <div class="button-container">
            <button type="submit" class="submit-btn">Cadastrar</button>
            </form>
        </div>
            </div>
        </div>
    </div>
        `
        
  
)
const botaoAdicionarUsuario = document.querySelector("#formNovoUsuario")
botaoAdicionarUsuario.addEventListener("submit", (e)=>{
    e.preventDefault()
    verificaNovoUsuario()
})

const btnmodal = document.querySelector(".close-btn") //btn sair do ADICIONAR Usuario
btnmodal.addEventListener("click", () => {
        console.log("click")
        const modal = document.querySelector(".modal")
        modal .remove()
    })


}




function verificaNovoUsuario(){
    console.log("entrou no verifica")
    const nome =  document.getElementById("userNome");
    const email =  document.getElementById("userEmail");
    const senha =  document.getElementById("userSenha");

    const nomeUsuario = nome.value.trim(); //trim retira os espacos no inicio e final do input
    const emailUsuario = email.value.trim(); //trim retira os espacos no inicio e final do input
    const senhaUsuario = senha.value

    if (nomeUsuario && (senhaUsuario) && emailUsuario) {
        const novoUsuario = {nome: nomeUsuario, email: emailUsuario, senha: senhaUsuario}

        addUsuario(novoUsuario)
        nomeUsuario.value = '';
        emailUsuario.value = '';
        senhaUsuario.value = '';
    }
    else {
        alert('Por favor, insira um nome, um preço e uma descrição válidos.');
    }
}




async function addUsuario(novoUsuario) { //funcao que add o novo usuario (POST)
    const res = await fetch(`${baseUrl}/Usuarios`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(novoUsuario)
    })
    console.log(res)
    const resJson = await res.json()
    console.log(resJson)
}
