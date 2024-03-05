async function validarLogin(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    
    if(email === '' || senha === ''){
        alert('Preencha os campos corretamente!')
    }

    try{
        const responseApi = await fetch('http://localhost:5080/usuario')
        const listUsers = await responseApi.json()
        
        listUsers.forEach((user) => {
            if(email === user.email && senha === user.senha){

                Toastify({
                    text: "Usuário Logado com Sucesso!",
                    duration: 5000,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                        width: '200px',
                        height: '30px',
                        textAlign: 'center',
                        alignItems: 'center',
                    }
                }).showToast();

                localStorage.setItem('user',user.nome)
                localStorage.setItem('id', user.id)
                localStorage.setItem('email', user.email)

                // alert('User logado com sucesso!!')
                window.location.href = "../inicial/inicial.html"
            }
        })
    }catch (error){
        console.error(error)
    }
} 