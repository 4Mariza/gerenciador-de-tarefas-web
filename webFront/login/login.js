async function validarLogin(){
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    
    if(email === '' || senha === ''){
        alert('Preencha os campos corretamente!')
    }

    try{
        const responseApi = await fetch('http://localhost:8080/usuario')
        const listUsers = await responseApi.json()
        
        listUsers.forEach((user) => {
            console.log(user.email);
            console.log(email);
            if(email === user.email && senha === user.senha){
                alert('User logado com sucesso!!')
                window.location.href = "../inicial/inicial.html"
            }
        })
    }catch (error){
        console.error(error)
    }
} 