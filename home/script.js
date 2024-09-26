const comandas = document.getElementById("comandas")
const usuarios = document.getElementById("usuarios")
const pedidoCozinha = document.getElementById("pedidoCozinha")
const cardapio = document.getElementById("cardapio")
const perfil = document.getElementById("perfil")

comandas.addEventListener("click", () => {
    window.location.href ="/TELA_Comandas/index.html"
})

usuarios.addEventListener("click", () => {
    window.location.href =""
})

pedidoCozinha.addEventListener("click", () => {
    window.location.href =""
})

cardapio.addEventListener("click", () => {
    window.location.href = "/cardapio/index.html"
})

perfil.addEventListener("click", () => {
    window.location.href = "/"
})

