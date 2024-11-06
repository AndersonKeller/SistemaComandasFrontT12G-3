import { baseUrl } from "../configApi.js";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const botaoVoltar = document.getElementById("voltar");
botaoVoltar.addEventListener("click", () => {
    window.location.href = "/home/index.html";
});

// Função para formar os pedidos que vão para a cozinha
export async function formarPedidos() {
    // Requisição para buscar os pedidos que vão para cozinha
    const resposta = await fetch(`${baseUrl}/PedidoCozinhas`, {
        headers: headers
    });

    // Convertendo a resposta para JSON
    const PedidoCozinhas = await resposta.json();
    const items = document.getElementById("pendentes");
    console.log(PedidoCozinhas,"pedidos cozinha");
   
    let aux =[]
   
    PedidoCozinhas.forEach((pedido)=>{
        const findAux = aux.findIndex((item)=>item.mesa === pedido.numeroMesa)
        if(findAux == -1){
            aux.push({id:pedido.id,nomeCliente:pedido.nomeCliente, mesa:pedido.numeroMesa,pedidos:[pedido]})
        }else{
            console.log(findAux,aux[findAux])

            aux[findAux].pedidos.push(pedido)
        }
        // console.log(pedido,"pedido")
    })
    console.log(aux,"ordem",PedidoCozinhas)

    aux.forEach((item) => {
        console.log(item,"item aki")
        items.insertAdjacentHTML("beforeend", `
            <li class="modalPedido pedido" id=${item.id}>
                
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
        item.pedidos.forEach((pedido)=>{
            console.log(pedido,"pedido")
            const li = document.getElementById(item.id)
            li.insertAdjacentHTML("beforeend",`
                
                <p> Produto: ${pedido.titulo}</p>
         `)
        })
    });

    // Adicionar evento a cada item criado dinamicamente
    document.querySelectorAll(".modalPedido").forEach((modalPedidoElement, index) => {
        modalPedidoElement.addEventListener("click", () => {
            console.log(items, "item",modalPedidoElement);
            const body = document.querySelector("body");
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalNovoCardapio">
                        <form id="formItemCardapio">
                            <button type="button" class="sairDoCriarItem">X</button>
                            <h1>Detalhes do Pedido</h1>
                            <p>Mesa: ${PedidoCozinhas[index].numeroMesa}</p>
                            <p>Cliente: ${PedidoCozinhas[index].nomeCliente}</p>
                            <p>Item: ${PedidoCozinhas[index].titulo}</p>
                            <button type="button" id="btnAvancar">Avançar Pedido</button>
                        </form>
                    </div>
                </div>
            `);
            
            const btnSairModalEditar = document.querySelector(".sairDoCriarItem");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });

            const btnAvancar = document.getElementById("btnAvancar")
            btnAvancar.addEventListener("click", async() => {
                console.log(modalPedidoElement.id,"id")
                const res = await fetch((`${baseUrl}/PedidoCozinhas/${id}`, {
                    headers: headers
                    ,method:"put"
                    ,body: JSON.stringify({
                        id: modalPedidoElement.id
                        
                    })
                }))
            }
            )
        });
    });
}

// Chama a função
formarPedidos();
