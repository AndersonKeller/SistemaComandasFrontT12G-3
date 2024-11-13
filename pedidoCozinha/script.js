import { baseUrl } from "../configApi.js";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


const botaoVoltar = document.getElementById("voltar");
botaoVoltar.addEventListener("click", () => {
    window.location.href = "/home/index.html";
});

// Requisição para buscar os pedidos que vão para a cozinha (Pendentes)
export async function formarPendentes() {

    const resposta = await fetch(`${baseUrl}/PedidoCozinhas?situacaoId=1`, {
        headers: headers
    });

    // Convertendo a resposta para JSON
    const PedidoCozinhas = await resposta.json();
    const items = document.getElementById("pendentes");
    items.innerHTML =""
    console.log(PedidoCozinhas, "pedidos cozinha");

    
    let aux = [];
    PedidoCozinhas.forEach((pedido) => {
        const findAux = aux.findIndex((item) => item.mesa === pedido.numeroMesa);
        if (findAux == -1) {
            aux.push({
                id: pedido.id,
                nomeCliente: pedido.nomeCliente,
                mesa: pedido.numeroMesa,
                pedidos: [pedido]
            });
        } else {
            aux[findAux].pedidos.push(pedido);
        }
    });
    console.log(aux, "ordem", PedidoCozinhas);
    items.insertAdjacentHTML("beforeend",`
           <h2>Pendentes</h2>
        `)
    aux.forEach((item) => {
        items.insertAdjacentHTML("beforeend", `
          
            <li class="modalPedido pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

    // Adicionar evento a cada item criado dinamicamente
    document.querySelectorAll(".modalPedido").forEach((modalPedidoElement, index) => {
        modalPedidoElement.addEventListener("click", () => {
            const body = document.querySelector("body");
            console.log(aux[index],"pedido cozinha no index")
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalNovoCardapio">
                        <form id="formItemCardapio" class="formItemCardapio">
                            <button type="button" class="sairDoPedido">X</button>
                            <h1 class="tituloModal">Detalhes do Pedido</h1>
                            <p>Mesa: ${PedidoCozinhas[index].numeroMesa??""}</p>
                            <p>Cliente: ${PedidoCozinhas[index].nomeCliente??""}</p>
                            
                            <!-- Contêiner para itens do pedido -->
                            <div id="pedidoItensContainer"></div>

                            <button type="button" id="btnAvancar" class="btnAvancar">Avançar Pedido</button>
                        </form>
                    </div>
                </div>
            `);

            // Seleciona o contêiner onde os itens do pedido serão adicionados
            const pedidoItensContainer = document.getElementById("pedidoItensContainer");

            // Adiciona cada item do pedido ao contêiner
            aux[index].pedidos.forEach((pedido) => {
                pedidoItensContainer.insertAdjacentHTML("beforeend", `
                    <p>Item: ${pedido.titulo}</p>
                `);
            });

            // Botão para fechar o modal
            const btnSairModalEditar = document.querySelector(".sairDoPedido");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });

            // Botão para avançar o pedidoc
            console.log(PedidoCozinhas[index],"id aki pedidos")
            const btnAvancar = document.getElementById("btnAvancar");
            btnAvancar.addEventListener("click", async () => {
                const res = await fetch(`${baseUrl}/PedidoCozinhas/${modalPedidoElement.id}`, {
                    headers: headers,
                    method: "PUT",
                    body: JSON.stringify({
                        novoStatusId: 2
                    })
                });
                if (res.ok) {
                    const modal = document.querySelector(".wapper");
                    modal.remove();
                } else {
                    alert("Erro ao avançar o pedido.");
                }
                formarPendentes();
                formarAndamento();
                formarConcluido();
            });
        });
    });
    
}

// Função para formar os pedidos que vão para a cozinha (Em andamento)
export async function formarAndamento(params) {
    const resposta = await fetch(`${baseUrl}/PedidoCozinhas?situacaoId=2`, {
        headers: headers
    });
    const PedidoCozinhas = await resposta.json();
    const items = document.getElementById("andamento");
    items.innerHTML =""
    console.log(PedidoCozinhas, "pedidos cozinha");

    let aux = [];
    PedidoCozinhas.forEach((pedido) => {
        const findAux = aux.findIndex((item) => item.mesa === pedido.numeroMesa);
        if (findAux == -1) {
            aux.push({
                id: pedido.id,
                nomeCliente: pedido.nomeCliente,
                mesa: pedido.numeroMesa,
                pedidos: [pedido]
            });
        } else {
            aux[findAux].pedidos.push(pedido);
        }
    });
    console.log(aux, "ordem", PedidoCozinhas);
    items.insertAdjacentHTML("beforeend",`
        <h2>Em Andamento</h2>
     `)

    aux.forEach((item) => {
        items.insertAdjacentHTML("beforeend", `
            <li class="modalPedido pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

        // Adicionar evento a cada item criado dinamicamente
        document.querySelectorAll(".modalPedido").forEach((modalPedidoElement, index) => {
            modalPedidoElement.addEventListener("click", () => {
                const body = document.querySelector("body");
                console.log(aux[index],"peddo no index")
                body.insertAdjacentHTML("beforeend", `
                    <div class="wapper">
                        <div class="modalNovoCardapio">
                            <form id="formItemCardapio" class="formItemCardapio">
                                <button type="button" class="sairDoPedido">X</button>
                                <h1 class="tituloModal">Detalhes do Pedido</h1>
                                <p>Mesa: ${PedidoCozinhas[index].numeroMesa??""}</p>
                                <p>Cliente: ${PedidoCozinhas[index].nomeCliente??""}</p>
                                
                                <!-- Contêiner para itens do pedido -->
                                <div id="pedidoItensContainer"></div>
    
                                <button type="button" id="btnAvancar" class="btnAvancar">Avançar Pedido</button>
                            </form>
                        </div>
                    </div>
                `);
    
                // Seleciona o contêiner onde os itens do pedido serão adicionados
                const pedidoItensContainer = document.getElementById("pedidoItensContainer");
    
                // Adiciona cada item do pedido ao contêiner
                aux[index].pedidos.forEach((pedido) => {
                    pedidoItensContainer.insertAdjacentHTML("beforeend", `
                        <p>Item: ${pedido.titulo}</p>
                    `);
                });
    
                // Botão para fechar o modal
                const btnSairModalEditar = document.querySelector(".sairDoPedido");
                btnSairModalEditar.addEventListener("click", () => {
                    const modal = document.querySelector(".wapper");
                    modal.remove();
                });
    
                // Botão para avançar o pedido
                console.log(aux[index],"id pedidos aki")
                const btnAvancar = document.getElementById("btnAvancar");
                btnAvancar.addEventListener("click",  async() => {
                    for(let pedido of aux[index].pedidos){
                        const res = await fetch(`${baseUrl}/PedidoCozinhas/${pedido.id}`, {
                            headers: headers,
                            method: "PUT",
                            body: JSON.stringify({
                                novoStatusId: 3
                            })
                        });
                        if (res.ok) {
                            const modal = document.querySelector(".wapper");
                            console.log(modal,"modal judas")
                            if(modal){

                                modal.remove();
                            }
                        } else {
                            alert("Erro ao avançar o pedido.");
                        }
                    }
                  
                    formarPendentes();
                    formarAndamento();
                    formarConcluido();
             
                });
            });
        });
}

// Requisição para buscar os pedidos que vão para a cozinha (Concluidos)
export async function formarConcluido() {

    const resposta = await fetch(`${baseUrl}/PedidoCozinhas?situacaoId=3`, {
        headers: headers
    });

    // Convertendo a resposta para JSON
    const PedidoCozinhas = await resposta.json();
    const items = document.getElementById("concluidos");
    items.innerHTML= ""
    console.log(PedidoCozinhas, "pedidos cozinha");

    let aux = [];
    PedidoCozinhas.forEach((pedido) => {
        const findAux = aux.findIndex((item) => item.mesa === pedido.numeroMesa);
        if (findAux == -1) {
            aux.push({
                id: pedido.id,
                nomeCliente: pedido.nomeCliente,
                mesa: pedido.numeroMesa,
                pedidos: [pedido]
            });
        } else {
            aux[findAux].pedidos.push(pedido);
        }
    });
    console.log(aux, "ordem", PedidoCozinhas);
    items.insertAdjacentHTML("beforeend",`
        <h2>Concluídos</h2>
     `)

    aux.forEach((item) => {
        items.insertAdjacentHTML("beforeend", `
            <li class="modalPedido pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

    // Adicionar evento a cada item criado dinamicamente
    document.querySelectorAll(".modalPedido").forEach((modalPedidoElement, index) => {
        modalPedidoElement.addEventListener("click", () => {
            const body = document.querySelector("body");
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalNovoCardapio">
                        <form id="formItemCardapio" class="formItemCardapio">
                            <button type="button" class="sairDoPedido">X</button>
                            <h1 class="tituloModal">Detalhes do Pedido</h1>
                            <p>Mesa: ${PedidoCozinhas[index].numeroMesa??""}</p>
                            <p>Cliente: ${PedidoCozinhas[index].nomeCliente??""}</p>
                            
                            <!-- Contêiner para itens do pedido -->
                            <div id="pedidoItensContainer"></div>

                            <button type="button" id="btnAvancar" class="btnAvancar">Avançar Pedido</button>
                        </form>
                    </div>
                </div>
            `);

            // Seleciona o contêiner onde os itens do pedido serão adicionados
            const pedidoItensContainer = document.getElementById("pedidoItensContainer");

            // Adiciona cada item do pedido ao contêiner
            aux[index].pedidos.forEach((pedido) => {
                pedidoItensContainer.insertAdjacentHTML("beforeend", `
                    <p>Item: ${pedido.titulo}</p>
                `);
            });

            // Botão para fechar o modal
            const btnSairModalEditar = document.querySelector(".sairDoPedido");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });
    
        })
    })

}
// Chama as funções
formarPendentes();
formarAndamento();
formarConcluido(); 