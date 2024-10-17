import {baseUrl} from "../configApi.js"


const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export async function formarProduto(seletor){
    const cardapio = await fetch(`${baseUrl}/CardapioItems`,{
        headers:headers
    })
    const ItensCardapio = await cardapio.json()
    const items = document.querySelector(seletor)
    items.innerHTML = ""
    console.log(ItensCardapio,"response await")
    console.log(ItensCardapio)

    ItensCardapio.forEach(async(item,index)=>{
        items.insertAdjacentHTML("beforeend",`
         
           
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                <button class="editar-item" id=${item.id}>Editar</button>
                <button class="editar-item" id=${item.id}>Editar</button>

            </li>
           
        
            `)
        
            const btnEditar = document.getElementById(item.id)
            btnEditar.addEventListener("click", ()=>{
                const body = document.querySelector("body")

        body.insertAdjacentHTML("beforeend", `
            <div class="wapper">
                <div class="modalNovoCardapio">
                    <button type="button" class="sairDoCriarItem">X</button>
                    <p>deseja remover este item?</p>
                    <button class="removerItem">sim</button>
            </div>`)  
            

            const btnSairModalEditar =  document.querySelector(".sairDoCriarItem")
            btnSairModalEditar.addEventListener("click", ()=>{
                const modal = document.querySelector(".wapper")
                modal.remove()
            })

            const botaoRemover = document.querySelector(".removerItem")
            botaoRemover.addEventListener("click", ()=>{
                excluirCardapioItemApi(item.id)
                const modal = document.querySelector(".wapper")
                modal.remove()
            
            })

            })
        }
        )

    }


        const botaoVoltar = document.querySelector(".back")
        if(botaoVoltar){
                botaoVoltar.addEventListener("click", ()=> {
                 window.location.href ="/home/index.html"}
    )
        }
        
     
const btnCriarProduto = document.querySelector(".add")
btnCriarProduto.addEventListener("click", ()=> {
    criarProduto
})




export function criarProduto(){
    const body = document.querySelector("body")

    body.insertAdjacentHTML("beforeend", `
        <div class="wapper">
            <div class="modalNovoCardapio">
                <form id="formItemCardapio">
                <h1>Adicionar Novo Item</h1>
                   <button type="button" class="sairDoCriarItem">X</button>
                    <label>Nome</label>
                    <input type="text" id="addItemInput"/>
                    <label>Preço</label>
                    <input type="number" id="addItemPrice"/>
                    <label>Descrição</label>
                    <input type="text" id="descriptionInput"/>
                    <button type="submit">Salvar</button>
                </form>
            </div>
                `
    )   
    const formNovoProduto = document.querySelector("#formItemCardapio")
    formNovoProduto.addEventListener("submit",(e)=>{
        console.log("submit")
        e.preventDefault()
        verificarNovoProduto()
       

    })
  

    const btnmodal=document.querySelector(".sairDoCriarItem")
    btnmodal.addEventListener("click",()=>{
        console.log("click")
    const modal = document.querySelector(".wapper")
    modal.remove()
})
}

function verificarNovoProduto(){
    const nameInput = document.getElementById('addItemInput');
    const priceInput = document.getElementById('addItemPrice');
    const descriptionInput = document.getElementById('descriptionInput');
    console.log(nameInput)
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();

    if (name && !isNaN(price) && description) {
        const newItem = { titulo: name, preco: price, descricao: description, possuiPreparo:false }
       
    

    addCardapioItemApi(newItem)
    nameInput.value = '';
    priceInput.value = '';
    descriptionInput.value = '';
   
    //loadItems();
} 
    else {
        alert('Por favor, insira um nome, um preço e uma descrição válidos.');
    }
}

async function addCardapioItemApi(item){
    const res = await fetch(`${baseUrl}/CardapioItems`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(item)
    })
    console.log(res)
    const resJson = await res.json()
    console.log(resJson)
    const modal = document.querySelector(".wapper")
    modal.remove()
    formarProduto("#items")
}

async function excluirCardapioItemApi(id){
    const res = await fetch(`${baseUrl}/CardapioItems/${id}`,{
        method:"DELETE",
        headers:headers
       
    })
    console.log(res)
    formarProduto("#items")
   
}







async function EditarProdutoCardapio(id){
    const res = await fetch(`${baseUrl}/CardapioItems`,{
        method:"PUT",
        headers:headers,
        body:JSON.stringify(item)
    })
    const resJson = await res.json()
    const modal = document.querySelector(".wapper")
    modal.remove()
    formarProduto("#items")
}


  
    
  
    

   


