import { formarProduto } from "../cardapio/formarProduto.js";
import { baseUrl } from "../configApi.js";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

let listitems = []; // Armazena IDs dos itens selecionados

async function formarComanda() {
  const comanda = await fetch(`${baseUrl}/Comandas`, {
    headers: headers,
  });

  const Comandas = await comanda.json();
  const Ordem = document.querySelector(".orders");

  console.log(Comandas);
  const btnCriar = document.querySelector("#criar");
  btnCriar.addEventListener("click", criarComanda);

  Comandas.forEach(async (item) => {
    Ordem.insertAdjacentHTML(
      "beforeend",
      `
        <div class="order"><p><span>${item.id}</span><span>MESA ${item.numeroMesa}</span></p><span>${item.nomeCliente}</span></div>`
    );
  });
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
                <button class="abrirCardapio" type="">Abrir cardápio</button>
                <form id="novaComanda"> 
                    <button type="button" class="close-btn">x</button>
                    <input id="input_mesa_comanda" type="number">
                    <label>Mesa</label>
                    
                    <input id="input_nome_comanda" type="text">
                    <label>Nome</label>
                </form>
                <div class="items_comanda"></div>
                <button class="salvar-btn">Finalizar comanda 
                    <span style="transform: none;">✔️</span>
                </button>
            </div>
        </div>
    `
  );
  const botaoVoltar = document.querySelector(".close-btn");
if (botaoVoltar) {
  botaoVoltar.addEventListener("click", () => {
    const modal = document.querySelector(".wapper")
    modal.remove()
    // window.location.href = "/telaComandas/index.html";
  });
}

  const BtnAbrirCardapio = document.querySelector(".abrirCardapio");
  if (BtnAbrirCardapio) {
    BtnAbrirCardapio.addEventListener("click", criarCardapio);
  }

  // Evento para salvar a comanda
  const btnSalvar = document.querySelector(".salvar-btn");
  btnSalvar.addEventListener("click", salvarComanda);
}

async function criarCardapio() {
  const modal = document.querySelector(".items_comanda");
  console.log("criarCardapio");
  modal.insertAdjacentHTML("beforeend", `<div class="items"></div>`);
  await formarProduto(".items");

  const btnsAdd = document.querySelectorAll(".add-item");
  console.log(btnsAdd);

  btnsAdd.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Adicionar item");
      inserirItemComanda(btn.id);
    });
  });
}

async function inserirItemComanda(id) {
  const res = await fetch(`${baseUrl}/CardapioItems/${id}`, {
    headers: headers,
  });
  const resJson = await res.json();
  console.log(resJson);

  const items_comanda = document.querySelector(".items_comanda");

  // Verifica se o item já foi adicionado
  let itemExistente = items_comanda.querySelector(`.item-${id}`);

  listitems.push(id); // Adiciona o ID do item à lista de itens

  if (itemExistente) {
    // Se o item já existe, aumenta a quantidade
    let quantidadeSpan = itemExistente.querySelector(".quantidade");
    let quantidadeAtual = parseInt(quantidadeSpan.textContent);
    quantidadeSpan.textContent = quantidadeAtual + 1;
  } else {
    // Caso o item ainda não exista, adiciona um novo
    items_comanda.insertAdjacentHTML(
      `beforeend`,
      `
            <div class="item item-${id}">
                <li>${resJson.titulo} - R$${resJson.preco} 
                <span class="quantidade">1</span>x</li>
            </div>
        `
    );
  }
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
    cardapioItems: listitems, // Envia a lista de IDs dos itens
  };

  console.log("Salvando comanda:", body);

  const salvarRes = await fetch(`${baseUrl}/Comandas`, {
    headers: headers,
    body: JSON.stringify(body),
    method: "POST",
  });

  const salvarJson = await salvarRes.json();
  console.log("Resposta do servidor:", salvarJson);

  // Exibir a nova comanda na lista de comandas
  const Ordem = document.querySelector(".orders");
  Ordem.insertAdjacentHTML(
    "beforeend",
    `
      <div class="order"><p><span>${salvarJson.id}</span><span>MESA ${mesa}</span></p><span>${nome}</span></div>
    `
  );

  // Após salvar, você pode redirecionar ou limpar o formulário
  alert("Comanda salva com sucesso!");
  inputNomeCliente.value = '';
  inputNumeroMesa.value = '';
  listitems = []; // Limpa a lista de itens
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
