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
    console.log(mesas , "console")
    const grid = document.querySelector('#mesas-grid');
    grid.innerHTML = '';
    mesas.forEach(mesa => {
        const card = document.createElement('div');
        card.className = 'mesa-card';
        card.insertAdjacentHTML("beforeend", `
            <div id=${mesa.id} class="mesa-icon">
            <img src="../mesa-de-jantar.png" alt="">
            </div>
            <div class="mesa-name">Mesa ${mesa.numeroMesa}</div>
            <div class="mesa-status">${mesa.situacaoMesa == 0 ? 'Disponível': 'Ocupada' }</div>
        `);
        
        grid.appendChild(card);
        const cardMesa = document.getElementById(mesa.id)

        cardMesa.addEventListener('click', () => {mostrarModal(mesa)});
    });
}

function mostrarModal(mesa) {
    console.log(mesa)
    document.body.insertAdjacentHTML("beforeend",`
        <div id="mesaModal" class="modal">
            <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Informações da Mesa</h2>
            <div class="form-group">
                <label class="numeroMesa">Número: ${mesa.numeroMesa}</label>
            </div>
            <div class="form-group">
                <div class="mesa-status"> Situacao atual: ${mesa.situacaoMesa == 0 ? 'Disponível': 'Ocupada' }</div>
                <select id="mesaStatus" required>
                    <option value="0">Disponível</option>
                    <option value="1">Ocupada</option>
                </select>
            </div>
            <div class="botoesSalvarExcluir">
                <button class="btnExcluirMesa">Excluir Mesa</button>
                <button class="btnSalvarMesa">Salvar Alteração</button>
            </div>
            </div>
        </div>
    `)
    
    const modal = document.getElementById('mesaModal');
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

    const btnSalvarMesa = document.querySelector(".btnSalvarMesa")
    btnSalvarMesa.addEventListener("click", (e) => {
        e.preventDefault()
        const statusMesa = document.getElementById('mesaStatus')
        
        const obj = {id:mesa.id, numeroMesa:mesa.numeroMesa, situacaoMesa: statusMesa.value}

        EditarStatusMesa(obj)
        let modalMesa = document.querySelector("#mesaModal")
        modalMesa.remove()
        setTimeout(() => {
            carregarMesas()
        }, 1500);
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
                <label>Numero:</label>
                <input type="number" id="numeroMesa" required>
            </div>
            <div class="form-group">
                <label>Status:</label>
                <select id="mesaStatus" required>
                    <option value="0">Disponível</option>
                    <option value="1">Ocupada</option>
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
  
    const numeroMesa = document.getElementById("numeroMesa");
    const status = document.getElementById("mesaStatus");

  
 
    let statusMesa = status.value;

    if ( statusMesa && numeroMesa) {
        const novaMesa = {
            numeroMesa:numeroMesa.value,
            situacaoMesa: parseInt(statusMesa)
        }

        addMesa(novaMesa)
    }
    else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

async function addMesa(novaMesa) {
    console.log(novaMesa,"aqui add")

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

async function EditarStatusMesa(mesa) { // funcao que edita a situacao da mesa (ocupada e disponivel) (PUT)
    const res = await fetch(`${baseUrl}/Mesas/${mesa.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(mesa)
    })
    console.log(res)
}