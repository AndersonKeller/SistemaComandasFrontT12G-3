const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarFilaPedidos(element,statusId){
    const comanda = await fetch(`https://localhost:7168/api/PedidoCozinhas?situacaoId=${statusId}`,{
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

const botaoVoltar = document.getElementById("botao-voltar")
botaoVoltar.addEventListener("click", () => {
    window.location.href ="/home/index.html"
})


formarFilaPedidos(".div-pendentes",1)
formarFilaPedidos(".div-emAndamento",2)
formarFilaPedidos(".div-concluido",3)   
