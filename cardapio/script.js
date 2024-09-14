const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarProduto(){
    const cardapio = await fetch("https://localhost:7204/api/CardapioItems",{
        headers:headers,
    })

    const ItensCardapio = await cardapio.json()
    const main = document.querySelector("main")
    console.log(ItensCardapio,"response await")
    console.log(ItensCardapio)
    ItensCardapio.results.forEach(async(item,index)=>{
        main.insertAdjacentHTML("beforeend",`
            <li >
            `)}
        )


    }
formarProduto()