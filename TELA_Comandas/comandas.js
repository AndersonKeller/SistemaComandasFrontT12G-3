const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

async function formarComanda(){
    const comanda = await fetch("https://localhost:7125/api/Comandas",{
        headers:headers,
    })

    const Comandas = await comanda.json()
    const Ordem = document.querySelector(".orders")

    console.log(Comandas)

    Comandas.forEach(async(item,index)=>{
        Ordem.insertAdjacentHTML("beforeend",`
            
        <div class="order"><p><span>${item.id}</span><span>MESA ${item.numeroMesa}</span></p><span>${item.nomeCliente}</span></div>`)
        
    });
}


formarComanda()

