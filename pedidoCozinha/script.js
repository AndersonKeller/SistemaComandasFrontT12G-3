import {baseUrl} from "../portasApi.js"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

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

formarFilaPedidos(".div-pendentes",1)
formarFilaPedidos(".div-emAndamento",2)
formarFilaPedidos(".div-concluido",3)   
