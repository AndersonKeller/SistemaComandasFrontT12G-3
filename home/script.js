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
    
    perfil.addEventListener("click", () => {
        botaoSair.classList.toggle("botao-sair")
    })
    
    botaoSair.addEventListener("click", () => {
        window.location.href = "/telaLogin/index.html"
    })
    
    usuarios.addEventListener("click", () => {
        window.location.href = "/usuarios/index.html"
    })

