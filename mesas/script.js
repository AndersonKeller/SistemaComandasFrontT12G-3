import { baseUrl } from "../configApi.js"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function carregarMesas() {
    try {
        const response = await fetch(`${baseUrl}/Mesas`);
        const mesas = await response.json();
        localStorage.setItem('mesas', JSON.stringify(mesas));
        renderizarMesas(mesas);
    } catch (error) {
        console.error('Erro ao carregar mesas:', error);
    }
}

function renderizarMesas(mesas) {
    const grid = document.querySelector('#mesas-grid');
    grid.innerHTML = '';
    
    mesas.forEach(mesa => {
        const card = document.createElement('div');
        card.className = 'mesa-card';
        card.insertAdjacentHTML("beforeend", `
            <div id=${mesa.id} class="mesa-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="black">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
            </div>
            <div class="mesa-name">Mesa ${mesa.numeroMesa}</div>
            <div class="mesa-status">Status: ${mesa.situacaoMesa}</div>
        `);
        
        grid.appendChild(card);
        const cardMesa = document.getElementById(mesa.id)

        cardMesa.addEventListener('click', () => {mostrarModal(mesa)});
    });
}

function mostrarModal(mesa) {
    document.body.insertAdjacentHTML("beforeend",`
        <div id="mesaModal" class="modal">
            <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Informações da Mesa</h2>
            <div class="form-group">
                <label>Número:${mesa.numeroMesa}</label>
            </div>
            <div class="form-group">
                <label>Capacidade</label>
                <input type="text" id="mesaCapacidade" readonly>
            </div>
            <div class="form-group">
                <label>Status:</label>
                <input type="text" id="mesaStatus" readonly>
            </div>
            <div>
                <button class="btnExcluirMesa">Excluir Mesa</button>
            </div>
            </div>
        </div>
    `)
    
    const modal = document.getElementById('mesaModal');
    document.getElementById('mesaCapacidade').value = mesa.capacidade;
    document.getElementById('mesaStatus').value = mesa.status;
    modal.style.display = 'block';

    const btnmodal = document.querySelector(".close-btn")
    btnmodal.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.remove()
    })

    const botaoRemover = document.querySelector(".btnExcluirMesa")
    botaoRemover.addEventListener("click", () => {
        excluirMesa(mesa.id)
        const modal = document.querySelector("#mesaModal")
        modal.remove()
        setTimeout(() => {
            location.reload()
        }, 1000)
    })
}

// Iniciar aplicação
carregarMesas();

// Botao de voltar
const botaoDeVoltar = document.querySelector(".back-button")
botaoDeVoltar.addEventListener('click', () => {
    window.location.href = "../home/index.html"
});

// Botão Adicionar Mesa
const btnAddMesa = document.querySelector(".addMesa")
btnAddMesa.addEventListener("click", () => {
    modalNovaMesa()
})

function modalNovaMesa(){
    const body = document.querySelector("body")
    body.insertAdjacentHTML("beforeend", `    
    <div id="mesaModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Cadastro Nova Mesa</h2>
            <form id="formNovaMesa">
            <div class="form-group">
                <label>Número:</label>
                <input type="number" id="mesaNumero" required>
            </div>
            <div class="form-group">
                <label>Capacidade:</label>
                <input type="number" id="mesaCapacidade" required>
            </div>
            <div class="form-group">
                <label>Status:</label>
                <select id="mesaStatus" required>
                    <option value="Disponível">Disponível</option>
                    <option value="Ocupada">Ocupada</option>
                    <option value="Reservada">Reservada</option>
                </select>
            </div>
            <div class="button-container">
                <button type="submit" class="submit-btn">Cadastrar</button>
            </div>
            </form>
        </div>
    </div>
    `)

    const botaoAdicionarMesa = document.querySelector("#formNovaMesa")
    botaoAdicionarMesa.addEventListener("submit", (e) => {
        e.preventDefault()
        verificaNovaMesa()
        const modal = document.querySelector(".modal")
        modal.remove()
        setTimeout(() => {
            location.reload()
        }, 1000)
    })

    const btnmodal = document.querySelector(".close-btn")
    btnmodal.addEventListener("click", () => {
        const modal = document.querySelector(".modal")
        modal.remove()
    })
}

function verificaNovaMesa(){
  
    const capacidade = document.getElementById("mesaCapacidade");
    const status = document.getElementById("mesaStatus");

  
    let capacidadeMesa = capacidade.value.trim();
    let statusMesa = status.value;

    if ( capacidadeMesa && statusMesa) {
        const novaMesa = {
            capacidade: capacidadeMesa, 
            status: statusMesa
        }

        addMesa(novaMesa)
    }
    else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

async function addMesa(novaMesa) {
    const res = await fetch(`${baseUrl}/Mesas`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(novaMesa)
    })
    console.log(res)
    const resJson = await res.json()
    console.log(resJson)
}

async function excluirMesa(id) {
    const res = await fetch(`${baseUrl}/Mesas/${id}`, {
        method: "DELETE",
        headers: headers
    })
    console.log(res)
}