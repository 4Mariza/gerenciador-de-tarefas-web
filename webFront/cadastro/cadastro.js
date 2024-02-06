const button = document.getElementById('button_cadastrar')
// function cadastrarUsuario(usuario){

//     const url = "http://localhost:8080/usuario"

//     if(email === '' || senha === '' || nome === ''){
//         alert('Preencha os campos corretamente!')
//     }

//     console.log(usuario);

//     try{
//         const options = {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(usuario),
//           }




//         fetch(url, options)

//         }catch (error){
//         console.error(error)
//     }
// } 

button.addEventListener("click", () => {
    const user = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("password").value
    }

    console.log(nome)

    fetch('http://localhost:8080/usuario', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })

    // window.location.href = '../inicial/inicial.html'
    alert('Usuário cadastrado com sucesso!')
})


