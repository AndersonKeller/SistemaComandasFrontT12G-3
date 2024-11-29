// criação das constantes que recebem os elementos do HTML através de um ID
const comandas = document.getElementById("comandas")
const usuarios = document.getElementById("usuarios")
const pedidoCozinha = document.getElementById("pedidoCozinha")
const cardapio = document.getElementById("cardapio")
const mesas = document.getElementById("mesas")
const perfil = document.getElementById("perfil")
const botaoSair = document.getElementById("botao-sair")

// puxando do local store
const user = localStorage.getItem("adminusuario")


// comandos para adicionar eventos de click, aonde ao clicar, uma ação acontecerá

    comandas.addEventListener("click", () => {
        window.location.href ="/telaComandas/index.html"
    })
    
    pedidoCozinha.addEventListener("click", () => {
        window.location.href ="/pedidoCozinha/index.html"
    })
    
    cardapio.addEventListener("click", () => {
        window.location.href = "/cardapio/index.html"
    })
    
    mesas.addEventListener("click", () => {    
        window.location.href = "/mesas/index.html"
    })
    
    usuarios.addEventListener("click", () => {
        const usuarioSalvo = localStorage.getItem("usuario");
        if(usuarioSalvo === "admin@admin.com"){
            window.location.href = "/usuarios/index.html"
        }
        else{
            const body = document.querySelector("body");
            body.insertAdjacentHTML("beforeend", `
                <div class="wapper">
                    <div class="modalErroDePermissao">
                        <button class="fecharModalPermissao" id="fecharModalPermissao">X</button>
                        <h1>Erro!</h1>
                        <h2>Permissão negada</h2>
                    </div>
                </div>
                `);

            const btnSairModalEditar = document.getElementById("fecharModalPermissao");
            btnSairModalEditar.addEventListener("click", () => {
                const modal = document.querySelector(".wapper");
                modal.remove();
            });
        }
    })

    botaoSair.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "/telaLogin/index.html"
    })
        

    
