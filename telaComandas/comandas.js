import {formarProduto} from "../cardapio/formarProduto.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarComanda(){
    const comanda = await fetch("https://localhost:7125/api/Comandas",{
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
            <button class="abrirCardapio" type="">Abrir cardápio</button>
                <form id="novaComanda"> 
                    <button class="close-btn">x</button>
                    <input id="input_criar_comanda" type="number">
                    <label>Mesa</label>
                    <input id="input_criar_comanda" type="text">
                    <label>Nome</label>
                    <button>Salvar comanda</button>

                </form>
                <div class="items_comanda"></div><div>  
            <button class="action-btn">Finalizar comanda 
                <span style="transform: none;">✔️</span>
            </button>
        </div>
            </div>
        </div>`)
        const BtnAbrirCardapio = document.querySelector(".abrirCardapio")
        if(BtnAbrirCardapio){
            BtnAbrirCardapio.addEventListener("click", ()=> {
            criarCardapio()
        }
        )}
}

async function criarCardapio(){
    const modal = document.querySelector(".items_comanda")
    console.log("criarComanda vai")
    modal.insertAdjacentHTML("beforeend",`

        <div class="items"></div>
        `)
        await formarProduto(".items")
       const btnsAdd = document.querySelectorAll(".add-item")
       console.log(btnsAdd)

       btnsAdd.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            inserirItemComanda(btn.id)
        })
       })
    }
async function inserirItemComanda(id){
    const res = await fetch(`https://localhost:7125/api/CardapioItems/${id}`,{
        headers: headers
    })
    const resJson = await res.json()
    console.log(resJson)
    const items_comanda = document.querySelector(".items_comanda")
    items_comanda.insertAdjacentHTML(`beforeend`,`
        <div>
        <li>${resJson.titulo}${resJson.preco}</li>
        </div>
        `)
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


