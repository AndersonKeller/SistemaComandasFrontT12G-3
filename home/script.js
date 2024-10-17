const comandas = document.getElementById("comandas")
const usuarios = document.getElementById("usuarios")
const pedidoCozinha = document.getElementById("pedidoCozinha")
const cardapio = document.getElementById("cardapio")
const perfil = document.getElementById("perfil")
const botaoSair = document.getElementById("botao-sair")

comandas.addEventListener("click", () => {
    window.location.href ="/telaComandas/index.html"
})

usuarios.addEventListener("click", () => {
    window.location.href =""
})

pedidoCozinha.addEventListener("click", () => {
    window.location.href ="/pedidoCozinha/index.html"
})

cardapio.addEventListener("click", () => {
    window.location.href = "/cardapio/index.html"
})

perfil.addEventListener("click", () => {
    botaoSair.classList.toggle("botao-sair")
})

botaoSair.addEventListener("click", () => {
    window.location.href = "/LOGIN/index.html"
})

