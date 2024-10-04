const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
async function login(){
    const email = document.getElementById("username")
    const pass = document.getElementById("password")
    const user = {
        email: email.value,
        senha: pass.value
    }
    // const user = {email:"teste@emaild.com",password:"1234"}
    const res = await fetch("https://localhost:7204/api/Usuarios",{
        method:"POST",
        body: JSON.stringify(user),
        headers: headers
    })
    console.log(res)
    const resJson = await res.json()
    console.log(resJson)
}

const form = document.querySelector("form")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    login()
})

const checkbox = document.getElementById("show-password");
const senhaInput = document.getElementById("password");

checkbox.addEventListener("change", function() {
  if (this.checked) {
    senhaInput.type = "text"; // Mostrar senha
  } else {
    senhaInput.type = "password"; // Ocultar senha
  }
});






