// const nome = document.getElementById('username').value;
// const email = document.getElementById('email').value;
// const senha = document.getElementById('password').value;
// const button = document.getElementById('button_cadastrar')
// const confirmacao = document.getElementById('password_confirm').value

async function cadastrarUsuario(){
    const nome = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const confirmacao = document.getElementById('password_confirm').value

    const url = "http://localhost:5080/usuario"

    if(email === '' || senha === '' || nome === '' || confirmacao === ''){
        alert('Preencha os campos corretamente!')
    } else{
        if (senha === confirmacao){
            const user = {
                nome: nome,
                email: email,
                senha: senha
            }
            try{
                const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                  }
        
                await fetch(url, options)
        
            } catch (error){
                console.error(error)
            }
            alert('Usuário cadastrado com sucesso!')
            window.location.href = '../login/login.html'
            
        } else{
            alert('Preencha corretamente!')
        }


}

// button.addEventListener("click", () => {

//     if (senha === confirmacao){
//         const user = {
//             nome: nome,
//             email: email,
//             senha: senha
//         }
//         cadastrarUsuario(user)

//     } else {
//         alert('Preencha corretamente!')
//     }


// })
}
