import { formarProduto } from "../cardapio/formarProduto.js";
import { baseUrl } from "../configApi.js";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

let listitems = []; // Armazena IDs dos itens selecionados

// Primeiro, vamos adicionar o evento de clique nas comandas
async function formarComanda() {
  const comanda = await fetch(`${baseUrl}/Comandas`, {
    headers: headers,
  });

  const Comandas = await comanda.json();
  const Ordem = document.querySelector(".orders");

  console.log(Comandas);
  const btnCriar = document.querySelector("#criar");
  btnCriar.addEventListener("click", criarComanda);

  Ordem.innerHTML = ''; // Limpa as comandas existentes
  
  Comandas.forEach(async (item) => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order';
    orderDiv.innerHTML = `
      <p>
        <span>${item.id}</span>
        <span>MESA ${item.numeroMesa}</span>
      </p>
      <span>${item.nomeCliente}</span>
    `;
    
    // Adiciona evento de clique para editar
    orderDiv.addEventListener('click', () => editarComanda(item));
    
    Ordem.appendChild(orderDiv);
  });
}

async function editarComanda(comanda) {
  const criar = document.querySelector("body");
  listitems = []; // Limpa a lista atual de items

  criar.insertAdjacentHTML(
    "beforeend",
    `
        <div class="wapper">
            <div class="modal">
                <form id="editarComanda"> 
                    <button type="button" class="close-btn">x</button>
                    <input id="input_mesa_comanda" type="number" value="${comanda.numeroMesa}">
                    <label>Mesa:</label>
                    
                    <input id="input_nome_comanda" type="text" value="${comanda.nomeCliente}">
                    <label>Nome:</label>
                    <input type="hidden" id="comanda_id" value="${comanda.id}">
                </form>
                <div class="items_comanda"></div>
                <div class="botoes_comanda">
                  <button class="abrirCardapio" type="button">Abrir Cardápio</button>
                  <button class="salvar-btn">Atualizar comanda 
                      <span style="transform: none;">✔️</span>
                  </button>
                </div>
            </div>
        </div>
    `
  );

  // Carrega os itens da comanda
  const items_comanda = document.querySelector(".items_comanda");
  for (let itemId of comanda.cardapioItems) {
    const res = await fetch(`${baseUrl}/CardapioItems/${itemId}`, {
      headers: headers,
    });
    const item = await res.json();
    
    listitems.push(`${itemId}e`); // Mantém o formato original dos IDs
    
    items_comanda.insertAdjacentHTML(
      'beforeend',
      `
        <div class="item item-${itemId}e">
            <li>${item.titulo} - R$${item.preco} 
            <span class="quantidade">1</span>x
            <button class="remover-item" data-id="${itemId}e">❌</button></li>
        </div>
      `
    );
  }

  // Adiciona os event listeners
  const botaoVoltar = document.querySelector(".close-btn");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
      const modal = document.querySelector(".wapper");
      modal.remove();
    });
  }

  const BtnAbrirCardapio = document.querySelector(".abrirCardapio");
  if (BtnAbrirCardapio) {
    BtnAbrirCardapio.addEventListener("click", toggleCardapio);
  }

  // Adiciona event listener para remover itens
  document.querySelectorAll('.remover-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      removerUnidadeItemComanda(id);
    });
  });

  const btnSalvar = document.querySelector(".salvar-btn");
  btnSalvar.addEventListener("click", atualizarComanda);
}

async function atualizarComanda() {
  const inputNomeCliente = document.getElementById("input_nome_comanda");
  const inputNumeroMesa = document.getElementById("input_mesa_comanda");
  const comandaId = document.getElementById("comanda_id");

  const nome = inputNomeCliente.value;
  const mesa = parseFloat(inputNumeroMesa.value);
  const id = comandaId.value;

  if (!nome || isNaN(mesa)) {
    alert("Preencha o nome do cliente e o número da mesa corretamente.");
    return;
  }

  const body = {
    numeroMesa: mesa,
    nomeCliente: nome,
    cardapioItems: listitems.map((item) => parseInt(item.split("e")[0])),
  };

  console.log("Atualizando comanda:", body);

  try {
    const atualizarRes = await fetch(`${baseUrl}/Comandas/${id}`, {
      headers: headers,
      body: JSON.stringify(body),
      method: "PUT",
    });

    if (!atualizarRes.ok) {
      throw new Error("Erro ao atualizar a comanda no banco.");
    }

    const atualizarJson = await atualizarRes.json();
    console.log("Resposta do servidor:", atualizarJson);
    
    const modal = document.querySelector(".wapper");
    modal.remove();
    
    // Atualiza a lista de comandas
    formarComanda();
    
    alert("Comanda atualizada com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar comanda:", error);
    alert("Erro ao atualizar a comanda");
  }
}

formarComanda();

async function criarComanda() {
  const criar = document.querySelector("body");
  console.log("criarComanda");

  criar.insertAdjacentHTML(
    "beforeend",
    `
        <div class="wapper">
            <div class="modal">
                <form id="novaComanda"> 
                    <button type="button" class="close-btn">x</button>
                    <input id="input_mesa_comanda" type="number">
                    <label>Mesa:</label>
                    
                    <input id="input_nome_comanda" type="text">
                    <label>Nome:</label>
                </form>
                <div class="items_comanda"></div>
                <div class="botoes_comanda">
                  <button class="abrirCardapio" type="button">Abrir Cardápio</button>
                  <button class="salvar-btn">Finalizar comanda 
                      <span style="transform: none;">✔️</span>
                  </button>
                </div>
            </div>
        </div>
    `
  );
  
  const botaoVoltar = document.querySelector(".close-btn");
  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
      const modal = document.querySelector(".wapper");
      modal.remove();
    });
  }

  const BtnAbrirCardapio = document.querySelector(".abrirCardapio");
  if (BtnAbrirCardapio) {
    BtnAbrirCardapio.addEventListener("click", toggleCardapio);
  }

  const btnSalvar = document.querySelector(".salvar-btn");
  btnSalvar.addEventListener("click", salvarComanda);
}

async function toggleCardapio(isckick) {
  const BtnAbrirCardapio = document.querySelector(".abrirCardapio");
  const modal = document.querySelector(".wapper");
  const existingCardapio = modal.querySelector(".items");

  if (existingCardapio) {
    // Fecha o cardápio se já estiver aberto
    existingCardapio.remove();
    BtnAbrirCardapio.textContent = "Abrir Cardápio";
  } else {
    // Abre o cardápio se ainda não estiver aberto
    console.log("criarCardapio");
    modal.insertAdjacentHTML("afterbegin", `<div class="items"></div>`);
    await formarProduto(".items", true, isckick);
    

    // Atualiza o texto do botão
    BtnAbrirCardapio.textContent = "Fechar Cardápio";

    // Adiciona eventos aos botões de adicionar item
    const btnsAdd = document.querySelectorAll(".add-item");
    console.log(btnsAdd);
    btnsAdd.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("Adicionar item");
        inserirItemComanda(btn.id);
      });
    });
  }
}






async function inserirItemComanda(id) {
  const res = await fetch(`${baseUrl}/CardapioItems/${id.split("e")[0]}`, {
    headers: headers,
  });
  const resJson = await res.json();
  console.log(resJson);

  const items_comanda = document.querySelector(".items_comanda");
  let itemExistente = items_comanda.querySelector(`.item-${id}`);
  listitems.push(id);

  if (itemExistente) {
    let quantidadeSpan = itemExistente.querySelector(".quantidade");  
    let quantidadeAtual = parseInt(quantidadeSpan.textContent);
    quantidadeSpan.textContent = quantidadeAtual + 1;

    // Atualizar quantidade no banco (PUT)
    // await atualizarQuantidadeItemComanda(id, quantidadeAtual + 1);
  } else {
    // Caso o item não exista, adiciona no DOM e na API (POST)
    items_comanda.insertAdjacentHTML(
      `beforeend`,
      `
        <div class="item item-${id}">
            <li>${resJson.titulo} - R$${resJson.preco} 
            <span class="quantidade">1</span>x
            <button class="remover-item" data-id="${id}">❌</button></li>
        </div>
      `
    );

    document.querySelector(`.item-${id} .remover-item`).addEventListener("click", () => {
      removerUnidadeItemComanda(id);
    });

    // Envia o item ao banco como nova entrada (POST)
    // await adicionarItemComanda(id, 1);
  }
}

async function removerUnidadeItemComanda(id) {
  const itemElement = document.querySelector(`.item-${id}`);
  let quantidadeSpan = itemElement.querySelector(".quantidade");
  let quantidadeAtual = parseInt(quantidadeSpan.textContent);

  if (quantidadeAtual > 1) {
    quantidadeSpan.textContent = quantidadeAtual - 1;
    await atualizarQuantidadeItemComanda(id, quantidadeAtual - 1); // Atualiza a quantidade no banco (PUT)
  } else {
    itemElement.remove();
    listitems = listitems.filter(itemId => itemId !== id);
    await deletarItemComanda(id); // Remove o item do banco (DELETE)
  }
}

async function adicionarItemComanda(id, quantidade) {
  const body = {
    idProduto: id.split("e")[0],
    quantidade: quantidade,
    cardapioItems: []
  };

  await fetch(`${baseUrl}/Comandas`, {
    headers: headers,
    body: JSON.stringify(body),
    method: "POST",
  });
}

async function atualizarQuantidadeItemComanda(id, quantidade) {
  const body = {
    idProduto: id.split("e")[0],
    quantidade: quantidade,
  };

  await fetch(`${baseUrl}/Comandas/${id.split("e")[0]}`, {
    headers: headers,
    body: JSON.stringify(body),
    method: "PUT",
  });
}

async function deletarItemComanda(id) {
  await fetch(`${baseUrl}/Comandas/${id.split("e")[0]}`, {
    headers: headers,
    method: "DELETE",
  });
}



async function salvarComanda() {
  const inputNomeCliente = document.getElementById("input_nome_comanda");
  const inputNumeroMesa = document.getElementById("input_mesa_comanda");
  

  const nome = inputNomeCliente.value;
  const mesa = parseFloat(inputNumeroMesa.value);

  // Verifica se os dados de nome e mesa foram preenchidos
  if (!nome || isNaN(mesa)) {
    alert("Preencha o nome do cliente e o número da mesa corretamente.");
    return;
  }

  const body = {
    numeroMesa: mesa,
    nomeCliente: nome,
    cardapioItems: listitems.map((item) => parseInt(item.split("e")[0])),
  };

  console.log("Salvando comanda:", body);

  try {
    const salvarRes = await fetch(`${baseUrl}/Comandas`, {
      headers: headers,
      body: JSON.stringify(body),
      method: "POST",
    });

    if (!salvarRes.ok) {
      throw new Error("Erro ao salvar a comanda no banco.");
    }

    const salvarJson = await salvarRes.json();
    console.log("Resposta do servidor:", salvarJson);
    const modal = document.querySelector(".wapper");
    modal.remove();
    formarComanda()
    // // Exibir a nova comanda na lista de comandas
    // const Ordem = document.querySelector(".orders");
    // Ordem.insertAdjacentHTML(
    //   "beforeend",
    //   `
    //     <div class="order"><p><span>${salvarJson.id}</span><span>MESA ${mesa}</span></p><span>${nome}</span></div>
    //   `
    // );

    // // Após salvar, você pode redirecionar ou limpar o formulário
    // alert("Comanda salva com sucesso!");
    // inputNomeCliente.value = '';
    // inputNumeroMesa.value = '';
    // listitems = []; // Limpa a lista de itens
  } catch (error) {
    console.error("Erro ao salvar comanda:", error);
    alert("Erro ao salvar a comanda");
  }
}


const botaoVoltar = document.querySelector(".close-btn");
if (botaoVoltar) {
  botaoVoltar.addEventListener("click", () => {
    window.location.href = "/home/index.html";
  });
}

const botaoVoltarTelaComanda = document.querySelector(".close-btn_tela_comanda");
if (botaoVoltarTelaComanda) {
  botaoVoltarTelaComanda.addEventListener("click", () => {
    window.location.href = "/home/index.html";
  });
}
