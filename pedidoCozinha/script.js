// importando meu ID pessoal da api
import { baseUrl } from "../configApi.js"

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
const botaoVoltar = document.getElementById("voltar")
botaoVoltar.addEventListener("click", () => {
    window.location.href ="/home/index.html"
})


// Função para formar os pedidos que vão para a cozinha
export async function formarPedidos() 
{
        
        // Requisição para buscar os pedidos que vão para cozinha
        const resposta = await fetch(`${baseUrl}/PedidoCozinhas`, {
            headers: headers
        })
        // Convertendo a resposta para JSON
        const PedidoCozinhas = await resposta.json()
        const items = document.getElementById("pendentes")
        console.log(PedidoCozinhas)
        PedidoCozinhas.forEach(async (item, index) => {
            items.insertAdjacentHTML("beforeend", `
                <li id="modalPedido">
                    <p class="pedido">Mesa: ${item.numeroMesa} <br> Cliente: ${item.nomeCliente}</p>
                </li>
                `)
        })

        const modalPedido = document.getElementById("modalPedido")
        modalPedido.addEventListener("click", () => {
            console.log(items, "item")
            const body = document.querySelector("body")

            body.insertAdjacentHTML("beforeend", `
                    <div class="wapper">
                        <div modal="modalNovoCardapio">
                            <form id="formItemCardapio">
                                <h1>teste</h1>
                            </form>
                        </div>
                    </div>
                
                `)
        })

}

// Chama a função 
formarPedidos()
