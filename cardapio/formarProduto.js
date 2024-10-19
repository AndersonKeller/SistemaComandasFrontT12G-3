import { baseUrl } from "../configApi.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
/**
 * parametro é um seletor html para montar os itens
 * @params {seleter html}
 */
export async function formarProduto(seletor) {
    const cardapio = await fetch(`${baseUrl}/CardapioItems`, {
        headers: headers
    })
    const ItensCardapio = await cardapio.json()
    const items = document.querySelector(seletor)
    items.innerHTML = ""
    console.log(ItensCardapio, "response await")
    console.log(ItensCardapio)

    ItensCardapio.forEach(async (item, index) => {
        items.insertAdjacentHTML("beforeend", `
         
           
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                <button class="editar-item" id=${item.id}>Editar</button>
                <button class="add-item" id="${item.id}edit">Adicionar</button>

            </li>
           
        
            `)

        const btnEditar = document.getElementById(`${item.id}edit`) //btn editar item
        btnEditar.addEventListener("click", () => {
            console.log(item, "item")
            const body = document.querySelector("body")
            body.insertAdjacentHTML("beforeend", `
        <div class="wapper">
            <div class="modalNovoCardapio">
                <form id="formItemCardapio">
                <h1>Editar Item</h1>
                   <button type="button" class="sairDoCriarItem">X</button>
                    <label>Nome</label>
                    <input type="text" value='${item.titulo}' id="addItemInput"/>
                    <label>Preço</label>
                    <input type="number" value='${item.preco}' id="addItemPrice"/>
                    <label>Descrição</label>
                    <input type="text" value='${item.descricao}' id="descriptionInput"/>
                    <button type="submit">Salvar</button>
                </form>
            </div>
                `)

            const btnSairModalEditar = document.querySelector(".sairDoCriarItem")
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper")
                modal.remove()
            })
         
            const form = document.querySelector("form")
            form.addEventListener("submit", (e) => {
                e.preventDefault()

                const tituloProduto = document.getElementById("#addItemInput")

                const precoProduto = document.getElementById("#addItemPrice")

                const descricaoProduto = document.getElementById("#descriptionInput")



                const obj = { id: item.id, titulo: tituloProduto.value, preco: precoProduto.value, descricao: descricaoProduto.value }
                EditarProdutoCardapio(obj)
            })

            // EditarProdutoCardapio(item.id)


        })



        const btnExcluir = document.getElementById(item.id) //abr o modal que exclui item do cardapio
        btnExcluir.addEventListener("click", () => {
            const body = document.querySelector("body")

            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalRemoverItem">
                        <button type="button" class="sairDoCriarItem">X</button>
                        <p>deseja remover este item?</p>
                        <button class="removerItem_sim">sim</button>
                        <button class="removerItem_nao">não</button>
                </div>`)


            const btnSairModalEditar = document.querySelector(".sairDoCriarItem") //sair do modal editar item
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper")
                modal.remove()
            })

            const btnNaoDesejoExcluir = document.querySelector(".removerItem_nao") //btn nao desejo excluir item
            btnNaoDesejoExcluir.addEventListener("click", () => {
                const modal = document.querySelector(".wapper")
                modal.remove()
            })

            const botaoRemover = document.querySelector(".removerItem_sim") //botao remover item do cardapio
            botaoRemover.addEventListener("click", () => {
                excluirCardapioItemApi(item.id)
                const modal = document.querySelector(".wapper")
                modal.remove()

            })

        })
    }
    )

}


const botaoVoltar = document.querySelector(".back") //botao de voltar do cardapio, volta pra home
if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
        window.location.href = "/home/index.html"
    }
    )
}


const btnCriarProduto = document.querySelector(".add") //btn que chama a funcao de criar produto
btnCriarProduto.addEventListener("click", () => {
    criarProduto
})




export function criarProduto() {
    const body = document.querySelector("body")

        body.insertAdjacentHTML("beforeend", `
            <div class="wapper">
                <div class="modal_cardapio">
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

   


