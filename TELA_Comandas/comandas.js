import {formarProduto} from "../cardapio/formarProduto.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarComanda(){
    const comanda = await fetch("https://localhost:7204/api/Comandas",{
        headers:headers,
    })

    const Comandas = await comanda.json()
    const Ordem = document.querySelector(".orders")

    console.log(Comandas)
    const btnCriar = document.querySelector("#criar")
    btnCriar.addEventListener("click",criarComanda)

    Comandas.forEach(async(item,index)=>{
        Ordem.insertAdjacentHTML("beforeend",`
            
        <div class="order"><p><span>${item.id}
        </span><span>MESA ${item.numeroMesa}
        </span></p><span>${item.nomeCliente}</span></div>`)
        
    });
}

formarComanda()


async function criarComanda(){
        const criar = document.querySelector("body")
    console.log("criarComanda")
    
    criar.insertAdjacentHTML("beforeend", `
        <div class="wapper">
            <div class="modal">
                <form id="novaComanda">
                    <label>Nome</label>
                    <input type="text">
                    <label>Mesa</label>
                    <input type="number">
                </form>
                
                
            <ul id="cardapio" class="menu">
            </ul>    <button class="action-btn">Finalizar comanda 
                <span style="transform: none;">📌</span>
                </button> 
            </div>
        </div>`)

        formarProduto("#cardapio")
}


