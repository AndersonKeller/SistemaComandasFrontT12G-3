const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarProduto(){
    const cardapio = await fetch("https://localhost:7204/api/CardapioItems",{
        headers:headers,
    })


    const ItensCardapio = await cardapio.json()
    const items = document.querySelector("#items")
    console.log(ItensCardapio,"response await")
    console.log(ItensCardapio)
    ItensCardapio.forEach(async(item,index)=>{
        items.insertAdjacentHTML("beforeend",`
            <li>
             <ul class="menu">
            <li>
                <p class="item-name">${item.titulo}</p>
                <p class="item-desc">${item.descricao}</p>
                <p class="item-price">R$${item.preco}</p>
                <button class="add-item">+</button>
            </li>
           
        </ul>
            `)}
        )


    }
formarProduto()