const button = document.getElementById('button_cadastrar')

async function cadastrarUsuario(usuario){

    const url = "http://localhost:3000/usuario"

    if(email === '' || senha === '' || nome === ''){
        alert('Preencha os campos corretamente!')
    }

    try{
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          }

        await fetch(url, options)

    } catch (error){
        console.error(error)
    }
} 

button.addEventListener("click", () => {

    const nome = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const user = {
        nome: nome,
        email: email,
        senha: senha
    }

    cadastrarUsuario(user)


    window.location.href = '../inicial/inicial.html'
    alert('Usuário cadastrado com sucesso!')
})


