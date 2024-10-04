import {formarProduto,criarProduto} from "./formarProduto.js"






formarProduto("#items")


const btnAdicionar =  document.querySelector(".add")

btnAdicionar.addEventListener("click",criarProduto)