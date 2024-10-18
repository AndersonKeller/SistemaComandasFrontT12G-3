import {baseUrl} from "../configApi.js"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

// função onde forma a fila de pedidos, fazendo requisão das informações pela API
async function formarFilaPedidos(element,statusId){
    const comanda = await fetch(`${baseUrl}/PedidoCozinhas?situacaoId=${statusId}`,{
        headers:headers,
    })
    console.log(comanda)
   
    const filaPedidos = await comanda.json()
    const divSituacaoPedido = document.querySelector(element)

    
    filaPedidos.forEach(async(item,index)=>{
        divSituacaoPedido.insertAdjacentHTML("beforeend",`
        
            <li>
                <p class="item-name">Mesa: ${item.numeroMesa}</p>
                <p class="item-desc">Cliente: ${item.nomeCliente}</p>
            </li>
            `)}
        )

}

// criação da constante botão voltar, onde busca o ID do HTML
const botaoVoltar = document.getElementById("botao-voltar")

// criação do evento de clique, onde ao clicar volta para a tela home
botaoVoltar.addEventListener("click", () => {
    window.location.href ="/home/index.html"
})

// chamando a função
formarFilaPedidos(".div-pendentes",1)
formarFilaPedidos(".div-emAndamento",2)
formarFilaPedidos(".div-concluido",3)   
