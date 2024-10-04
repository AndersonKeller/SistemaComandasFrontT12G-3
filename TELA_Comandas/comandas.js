import {formarProduto} from "../cardapio/formarProduto.js"
import {baseUrl} from "../portasApi.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarComanda(){
    const comanda = await fetch(`${baseUrl}/Comandas`,{
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
                    <button class="close-btn">x</button>
                    <input id="input_criar_comanda" type="number">
                    <label>Mesa</label>
                    <input id="input_criar_comanda" type="text">
                    <label>Nome</label>
                </form>
                
            <ul id="cardapio" class="menu">
            </ul>    <button class="action-btn">Finalizar comanda 
                <span style="transform: none;">📌</span>
                </button> 
            </div>
        </div>`)

        formarProduto("#cardapio")
}


const botaoVoltar = document.querySelector(".close-btn")
if(botaoVoltar){
        botaoVoltar.addEventListener("click", ()=> {
         window.location.href ="/home/index.html"}
)}

const botaoVoltarTelaComanda = document.querySelector(".close-btn_tela_comanda")
if(botaoVoltarTelaComanda){
    botaoVoltarTelaComanda.addEventListener("click", ()=> {
         window.location.href ="/home/index.html"}

)

}


