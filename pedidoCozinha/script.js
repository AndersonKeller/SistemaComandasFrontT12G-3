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
    
    items.insertAdjacentHTML("beforeend",`
           <h2>Pendentes</h2>
        `)
    aux.forEach((item) => {
        items.insertAdjacentHTML("beforeend", `
          
            <li class="modalPedido modal1 pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

    // Adicionar evento a cada item criado dinamicamente
    document.querySelectorAll(".modal1").forEach((modalPedidoElement, index) => {
        modalPedidoElement.addEventListener("click", () => {
            console.log("click de abertura do modal",modalPedidoElement, "click 1")
            const body = document.querySelector("body");
            console.log(aux[index],"pedido cozinha no index")
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalNovoCardapio">
                        <form id="formItemCardapio" class="formItemCardapio">
                            <button type="button" class="sairDoPedido">X</button>
                            <h1 class="tituloModal">Detalhes do Pedido</h1>
                            <p>Mesa: ${PedidoCozinhas[index]?.numeroMesa ?? ""}</p>
                            <p>Cliente: ${PedidoCozinhas[index]?.nomeCliente ?? ""}</p>
                            
                            <!-- Contêiner para itens do pedido -->
                            <div id="pedidoItensContainer"></div>
                            <button type="button" id="btnAvancar" class="btnAvancar">Avançar Pedido</button>
                        </form>
                    </div>
                </div>
            `);

            // Seleciona o contêiner onde os itens do pedido serão adicionados
            const pedidoItensContainer = document.getElementById("pedidoItensContainer");
            

            // confere se o array não está vazio
            // if (aux[index] && aux[index].pedidos) {
            //     aux[index].pedidos.forEach((pedido) => {
            //         pedidoItensContainer.insertAdjacentHTML("beforeend", `
            //             <p>Item: ${pedido.titulo}</p>
            //         `);
            //     });
            // } else {
            //     console.error(`Pedido não encontrado para o índice: ${index}`, aux);
            // }
            console.log(aux[index], "ordem");
            // Adiciona cada item do pedido ao contêiner
            if(aux[index] && aux[index].pedidos){
            aux[index].pedidos.forEach((pedido) => {
                pedidoItensContainer.insertAdjacentHTML("beforeend", `
                    <p>Item: ${pedido.titulo}</p>
                `);
            });
            }

            // Botão para fechar o modal
            const btnSairModalEditar = document.querySelector(".sairDoPedido");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });

            // Botão para avançar o pedidoc
            
            const btnAvancar = document.getElementById("btnAvancar");
            btnAvancar.addEventListener("click", async () => {
                for(let pedido of aux[index].pedidos){
                const res = await fetch(`${baseUrl}/PedidoCozinhas/${pedido.id}`, {
                    headers: headers,
                    method: "PUT",
                    body: JSON.stringify({
                        novoStatusId: 2
                    })
                });
                if (res.ok) {
                    const modal = document.querySelector(".wapper");
                    if(modal){

                        modal.remove();
                    }
                } else {
                    alert("Erro ao avançar o pedido.");
                }
                formarPendentes();
                formarAndamento();
            }
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
            <li class="modalPedido modal2 pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

        // Adicionar evento a cada item criado dinamicamente
        document.querySelectorAll(".modal2").forEach((modalPedidoElement, index) => {
            modalPedidoElement.addEventListener("click", () => {
                const body = document.querySelector("body");
                console.log("click 2")
                body.insertAdjacentHTML("beforeend", `
                    <div class="wapper">
                        <div class="modalNovoCardapio">
                            <form id="formItemCardapio" class="formItemCardapio">
                                <button type="button" class="sairDoPedido">X</button>
                                <h1 class="tituloModal">Detalhes do Pedido</h1>
                                <p>Mesa: ${PedidoCozinhas[index]?.numeroMesa ?? ""}</p>
                                <p>Cliente: ${PedidoCozinhas[index]?.nomeCliente ?? ""}</p>
                                <!-- Contêiner para itens do pedido -->
                                <div id="pedidoItensContainer"></div>
    
                                <button type="button" id="btnAvancar" class="btnAvancar">Concluir Pedido</button>
                            </form>
                        </div>
                    </div>
                `);
    
                // Seleciona o contêiner onde os itens do pedido serão adicionados
                const pedidoItensContainer = document.getElementById("pedidoItensContainer");
    
                // Adiciona cada item do pedido ao contêiner
                if(aux[index]  && aux[index].pedidos){
                    aux[index].pedidos.forEach((pedido) => {
                        pedidoItensContainer.insertAdjacentHTML("beforeend", `
                            <p>Item: ${pedido.titulo}</p>
                        `);
                    });
                }
    
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
            <li class="modalPedido modal3 pedido" id="${item.id}">
                <p>Mesa: ${item.mesa} <br> Cliente: ${item.nomeCliente}</p>
            </li>
        `);
    });

    // Adicionar evento a cada item criado dinamicamente
    document.querySelectorAll(".modal3").forEach((modalPedidoElement) => {
        const pedidoId = modalPedidoElement.id; // Obtém o ID do pedido diretamente
    
        modalPedidoElement.addEventListener("click", () => {
            console.log("click 3");
            const body = document.querySelector("body");
            const pedidoSelecionado = aux.find((item) => item.id === parseInt(pedidoId)); // Busca o pedido correto
    
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalNovoCardapio">
                        <form id="formItemCardapio" class="formItemCardapio">
                            <button type="button" class="sairDoPedido">X</button>
                            <h1 class="tituloModal">Detalhes do Pedido</h1>
                            <p>Mesa: ${pedidoSelecionado?.mesa ?? ""}</p>
                            <p>Cliente: ${pedidoSelecionado?.nomeCliente ?? ""}</p>
                            <!-- Contêiner para itens do pedido -->
                            <div id="pedidoItensContainer"></div>
                        </form>
                    </div>
                </div>
            `);
    
            // Seleciona o contêiner onde os itens do pedido serão adicionados
            const pedidoItensContainer = document.getElementById("pedidoItensContainer");
    
            // Adiciona cada item do pedido ao contêiner
            if (pedidoSelecionado && pedidoSelecionado.pedidos) {
                pedidoSelecionado.pedidos.forEach((pedido) => {
                    pedidoItensContainer.insertAdjacentHTML("beforeend", `
                        <p>Item: ${pedido.titulo}</p>
                    `);
                });
            }
    
            // Botão para fechar o modal
            const btnSairModalEditar = document.querySelector(".sairDoPedido");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });
        });
    });

}
// Chama as funções
formarPendentes();
formarAndamento();
formarConcluido(); 