import { baseUrl } from "../configApi.js"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
/**
 * parametro é um seletor html para montar os itens
 * @params {seleter html}
 */
export async function formarProduto(seletor,isclick) {
    const cardapio = await fetch(`${baseUrl}/CardapioItems`, {
        headers: headers
        
    })
    console.log(cardapio)
    const ItensCardapio = await cardapio.json()
    localStorage.setItem("cardapio",JSON.stringify(ItensCardapio))
    const items = document.querySelector(seletor)
    items.innerHTML = ""
    
    console.log(ItensCardapio, "response await")
    console.log(ItensCardapio)
    const input = document.querySelector(".inputPesquisa")
    if(input){
        input.addEventListener("input",(e)=>{
        pesquisaItens(e.target.value)
    })}
   
    renderizaLista(seletor,ItensCardapio,isclick)
}

function pesquisaItens(text){ //funcao que faz o  filtro de pesquisa

    const listaInicial = JSON.parse(localStorage.getItem("cardapio")) // pego os produtos do local storage

    const listaFiltrada = listaInicial.filter((produto)=>{
        console.log(produto,"produto")
        return  produto.titulo.toLowerCase().includes(text.toLowerCase())||
        produto.descricao.toLowerCase().includes(text.toLowerCase())

        
    })
    console.log(listaFiltrada,"lista filtrada")
    renderizaLista("#items",listaFiltrada)
}
function renderizaLista(seletor,lista=[],isclick=false){ // funcao que renderiza os itens
    // lista.forEach(())
    const items = document.querySelector(seletor)
    items.innerHTML = ""
    lista.forEach(async (item, index) => {
        items.insertAdjacentHTML("beforeend", `
         
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                ${!isclick ? 
                    `<button class="editar-item" id=${item.id}>Excluir</button>
                <button class="editar-item add-item" id="${item.id}edit">Editar</button>`
                    : `
                    <button class="editar-item add-item" id="${item.id}edit">Adicionar</button>`
                }
            </li>
            `)

        const btnEditar = document.getElementById(`${item.id}edit`) //btn editar item
       if(!isclick){
           btnEditar.addEventListener("click", () => {
               console.log(item, "item")
               const body = document.querySelector("body")
               body.insertAdjacentHTML("beforeend", `
           <div class="wapper">
               <div class="modalNovoCardapio">
                   <form id="formItemCardapio">
                       <h1>Editar Item</h1>
                       <button type="button" class="sairDoCriarItem">X</button>
                       <label>Nome</label>
                       <input type="text" value='${item.titulo}' id="addItemInput"/>
                       <label>Preço</label>
                       <input type="number" value='${item.preco}' id="addItemPrice"/>
                       <label>Descrição</label>
                       <input type="text" value='${item.descricao}' id="descriptionInput"/>
                       <button type="submit">Salvar</button>
                   </form>
               </div>
                   `)
   
               const btnSairModalEditar = document.querySelector(".sairDoCriarItem")
               btnSairModalEditar.addEventListener("click", () => {
                   const modal = document.querySelector(".wapper")
                   modal.remove()
               })
            
               const form = document.querySelector("form")
               form.addEventListener("submit", (e) => {
                   e.preventDefault()
   
                   const tituloProduto = document.getElementById("addItemInput")
   
                   const precoProduto = document.getElementById("addItemPrice")
   
                   const descricaoProduto = document.getElementById("descriptionInput")
   
                   const obj = { id: item.id, titulo: tituloProduto.value, preco: precoProduto.value, descricao: descricaoProduto.value }
                   EditarProdutoCardapio(obj)
               })

           })
       }
        const btnExcluir = document.getElementById(item.id) //abr o modal que exclui item do cardapio
        if(btnExcluir){
            btnExcluir.addEventListener("click", () => {
                const body = document.querySelector("body")
    
                body.insertAdjacentHTML("beforeend", `
                    <div class="wapper">
                        <div class="modalRemoverItem">
                            <button type="button" class="sairDoCriarItem">X</button>
                            <p>deseja remover este item?</p>
                            <button class="removerItem_sim">sim</button>
                            <button class="removerItem_nao">não</button>
                    </div>`)
    
                const btnSairModalEditar = document.querySelector(".sairDoCriarItem") //sair do modal editar item
                btnSairModalEditar.addEventListener("click", () => {
                    const modal = document.querySelector(".wapper")
                    modal.remove()
                })
    
                const btnNaoDesejoExcluir = document.querySelector(".removerItem_nao") //btn nao desejo excluir item
                btnNaoDesejoExcluir.addEventListener("click", () => {
                    const modal = document.querySelector(".wapper")
                    modal.remove()
                })
    
                const botaoRemover = document.querySelector(".removerItem_sim") //botao remover item do cardapio
                botaoRemover.addEventListener("click", () => {
                    excluirCardapioItemApi(item.id)
                    const modal = document.querySelector(".wapper")
                    modal.remove()
    
                })
            })
        }
    }
    )
}


const botaoVoltar = document.querySelector(".back") //botao de voltar do cardapio, volta pra home
if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
        window.location.href = "/home/index.html"
    }
    )
}


const btnCriarProduto = document.querySelector(".add") //btn que chama a funcao de criar produto
btnCriarProduto.addEventListener("click", () => {
    criarProduto
})

export function criarProduto() {
    const body = document.querySelector("body")

    body.insertAdjacentHTML("beforeend", `
        <div class="wapper">
            <div class="modalNovoCardapio">
                <form id="formItemCardapio">
                    <h1>Adicionar Novo Item</h1>
                    <button type="button" class="sairDoCriarItem">X</button>
                    <label>Nome</label>
                        <input type="text" id="addItemInput"/>
                    <label>Preço</label>
                        <input type="number" step=".01" id="addItemPrice"/>
                    <label>Descrição</label>
                        <input type="text" id="descriptionInput"/>
                    <label>Possui Preparo</label>
                <div class="possuiPreparoDiv">
                    <label class="switch">
                        <input type="checkbox" value="true" id="PossuiPreparo">
                    <div class="slider"></div>
                    <div class="slider-card">
                    <div class="slider-card-face slider-card-front"></div>
                    <div class="slider-card-face slider-card-back"></div>
                    </div>
                    </label>
                </div>
                    <button type="submit">Salvar</button>
                </form>
        </div>
                `
    )
    const formNovoProduto = document.querySelector("#formItemCardapio") //form do ADICIONAR (ele que tem o click do botao salvar item)
    formNovoProduto.addEventListener("submit", (e) => {
        console.log("submit")
        e.preventDefault()
        verificarNovoProduto() //esta funcao chama a funcao que faz o POST


    })

    const btnmodal = document.querySelector(".sairDoCriarItem") //btn sair do ADICIONAR item
    btnmodal.addEventListener("click", () => {
        console.log("click")
        const modal = document.querySelector(".wapper")
        modal.remove()
    })
}

function verificarNovoProduto() { //funcao que verifica se os campos estao validos para adicionar o novo item
    const nameInput = document.getElementById('addItemInput');
    const priceInput = document.getElementById('addItemPrice');
    const descriptionInput = document.getElementById('descriptionInput');
    const possuiPreparoInput = document.getElementById('PossuiPreparo');
    
    const name = nameInput.value.trim(); //trim retira os espacos no inicio e final do input
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim(); //trim retira os espacos no inicio e final do input

    if (name && !isNaN(price) && description) {
        const newItem = { titulo: name, preco: price, descricao: description, possuiPreparo: possuiPreparoInput.checked }

        addCardapioItemApi(newItem)
        nameInput.value = '';
        priceInput.value = '';
        descriptionInput.value = '';
    }
    else {
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", `
            <div class="wapperErro">
                <div class="modalErroDePermissao">
                    <button class="fecharModalPermissao" id="fecharModalPermissao">X</button>
                    <h2>Erro!</h1>
                    <h2>Preencha todos os campos corretamente</h2>
                </div>
            </div>
            `);

        const btnSairModalEditar = document.getElementById("fecharModalPermissao");
        btnSairModalEditar.addEventListener("click", () => {
            const modal = document.querySelector(".wapperErro");
            modal.remove();
        });
    
      
    }
}

async function addCardapioItemApi(item) { //funcao que add o novo item no cardapio (POST)
    const res = await fetch(`${baseUrl}/CardapioItems`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(item)
    })
    console.log(res)
    const resJson = await res.json()
    console.log(resJson)
    const modal = document.querySelector(".wapper")
    modal.remove()
    formarProduto("#items")
}

async function excluirCardapioItemApi(id) { //funcao que exclui item do cardapio (DELETE)
    const res = await fetch(`${baseUrl}/CardapioItems/${id}`, {
        method: "DELETE",
        headers: headers

    })
    console.log(res)
    formarProduto("#items")

}

async function EditarProdutoCardapio(item) { // funcao que edita item (PUT)
    const res = await fetch(`${baseUrl}/CardapioItems/${item.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(item)
    })
    console.log(res)
    // const resJson = await res.json()
    const modal = document.querySelector(".wapper")
    modal.remove()
    formarProduto("#items")
}