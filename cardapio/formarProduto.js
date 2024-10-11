import {baseUrl} from "../configApi.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function formarProduto(seletor){
    const cardapio = await fetch(`${baseUrl}/CardapioItems`,{
        headers:headers
    })
    const ItensCardapio = await cardapio.json()
    const items = document.querySelector(seletor)
    console.log(ItensCardapio,"response await")
    console.log(ItensCardapio)

    ItensCardapio.forEach(async(item,index)=>{
        items.insertAdjacentHTML("beforeend",`
         
           
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                <button class="editar-item" id=${item.id}>Editar</button>
                <button class="editar-item">Editar</button>

            </li>
           
        
            `)}
        )
    }


        const botaoVoltar = document.querySelector(".back")
        if(botaoVoltar){
                botaoVoltar.addEventListener("click", ()=> {
                 window.location.href ="/home/index.html"}
    )

        }
     
export function criarProduto(){
        const body = document.querySelector("body")

        body.insertAdjacentHTML("beforeend", `
            <div class="wapper">
                <div class="modal">
                    <form id="formItemCardapio">
                       <button class="sairDoCriarItem">X</button>
                        <label>Nome</label>
                        <input type="text">
                        <label>Preço</label>
                        <input type="number">
                        <label>Descrição</label>
                        <input type="text" id="descricaoProduto">
                    </form>
                </div>
                    `
        )    


    }

   


