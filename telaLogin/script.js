import { baseUrl } from "../configApi.js";

// Configuração dos cabeçalhos para a requisição
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// Função de login assíncrona
async function login() {
  // Captura os elementos de input
  const email = document.getElementById("username");
  const pass = document.getElementById("password");

  // Construção dos parâmetros de query para requisição GET
  const params = new URLSearchParams({
      email: email.value,
      senha: pass.value
  });

  try {
      // Realiza a requisição GET com os parâmetros
      const res = await fetch(`${baseUrl}/Usuarios?${params}`, {
          method: "GET",
          headers: headers
      });

      // Verifica se a resposta foi bem-sucedida
      if (!res.ok) {
          throw new Error('Erro na autenticação');
      }
      // Converte a resposta para JSON
      const resJson = await res.json();
      
      // Verifica se retornou algum usuário
      if (resJson && resJson.length > 0) {
        
        const usuario = resJson.find((res)=>{
           if(res.email === email.value && res.senha === pass.value){
            return res
           }
        
        });
        if(!usuario){
          const body = document.querySelector("body");
          body.insertAdjacentHTML("beforeend", `
              <div class="wapper">
                  <div class="modalErroDePermissao">
                      <button class="fecharModalPermissao" id="fecharModalPermissao">X</button>
                      <h1>Erro!</h1>
                      <h2>Usuário não encontrado</h2>
                  </div>
              </div>
          `);

          const btnSairModalEditar = document.getElementById("fecharModalPermissao");
          btnSairModalEditar.addEventListener("click", () => {
              const modal = document.querySelector(".wapper");
              modal.remove();
          });
          return
        }
        // Verificação específica para o email admin
        
          // Armazena informações do usuário no localStorage
          localStorage.setItem("usuario", usuario.email);
          
          // Redireciona para a página home
          window.location.href = "/home/index.html";
        
      } else {
        // Usuário não encontrado
        const body = document.querySelector("body");
        body.insertAdjacentHTML("beforeend", `
            <div class="wapper">
                <div class="modalErroDePermissao">
                    <button class="fecharModalPermissao" id="fecharModalPermissao">X</button>
                    <h1>Erro!</h1>
                    <h2>Usuário não encontrado</h2>
                </div>
            </div>
        `);

        const btnSairModalEditar = document.getElementById("fecharModalPermissao");
        btnSairModalEditar.addEventListener("click", () => {
            const modal = document.querySelector(".wapper");
            modal.remove();
        });
      }

  } catch (error) {
      
      // Tratamento de erro
      const body = document.querySelector("body");
      body.insertAdjacentHTML("beforeend", `
          <div class="wapper">
              <div class="modalErroDePermissao">
                  <button class="fecharModalPermissao" id="fecharModalPermissao">X</button>
                  <h1>Erro!</h1>
                  <h2>Usuário não encontrado</h2>
              </div>
          </div>
      `);

      const btnSairModalEditar = document.getElementById("fecharModalPermissao");
      btnSairModalEditar.addEventListener("click", () => {
          const modal = document.querySelector(".wapper");
          modal.remove();
      });
  }
}

// Evento de submit do formulário
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o envio padrão do formulário
  login(); // Chama a função de login
});

// Funcionalidade de mostrar/ocultar senha
const checkbox = document.getElementById("show-password");
const senhaInput = document.getElementById("password");

checkbox.addEventListener("change", function() {
  senhaInput.type = this.checked ? "text" : "password";
});