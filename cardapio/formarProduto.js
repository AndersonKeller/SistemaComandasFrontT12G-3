import {baseUrl} from "../portasApi.js"


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
    console.log(ItensCardapio,"response await")
    console.log(ItensCardapio)

    ItensCardapio.forEach(async(item,index)=>{
        items.insertAdjacentHTML("beforeend",`
         
           
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                <button class="editar-item">Editar</button>
            </li>
           
        
            `)}
        )
    }


        const botaoVoltar = document.querySelector(".back")
        if(botaoVoltar){
                botaoVoltar.addEventListener("click", ()=> {
                 window.location.href ="/home/index.html"}
    )

        }
        
     
export function criarProduto(){
    const nameInput = document.getElementById('addItemInput');
    const priceInput = document.getElementById('addItemPrice');
    const descriptionInput = document.getElementById('addItemDescription');

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const description = descriptionInput.value.trim();

    if (name && !isNaN(price) && description) {
        const newItem = { titulo: name, preco: price, descricao: description, possuiPreparo:false }
        items.push(newItem);
    

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
}


    const body = document.querySelector("body")

        body.insertAdjacentHTML("beforeend", `
            <div class="wapper">
                <div class="modalNovoCardapio">
                    <form id="formItemCardapio">
                       <button class="sairDoCriarItem">X</button>
                        <label>Nome</label>
                        <input type="text" class="nameInput">
                        <label>Preço</label>
                        <input type="number" class="nameInput">
                        <label>Descrição</label>
                        <input type="text" class="descriptionInput">
                    </form>
                </div>
                    `
        )    
    
    const btnmodal=document.querySelector(".sairDoCriarItem")
btnmodal.addEventListener("click",()=>{
    const modal = document.querySelector(".wapper")
    modal.remove()
})
    

   


