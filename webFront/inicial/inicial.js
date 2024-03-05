const idUsuario = localStorage.getItem('id')
const userName = localStorage.getItem('user')

const userGreeting = document.getElementById('user_greeting')
userGreeting.textContent = `Olá, ${userName}`

const criarCard = async () => {
    const url = `http://localhost:5080/tarefas`
    const response = await fetch(url)
    const tarefas = await response.json()


    const urlUser = `http://localhost:5080/usuario/${idUsuario}`
    const resposta = await fetch(urlUser)
    const usuario = await resposta.json()

    const cardContainer = document.getElementById('cardContainer')
    cardContainer.className = 'main'

    tarefas.forEach((item) => {
        if (usuario.id == item.idUsuario) {

            const card = document.createElement('div')
            card.className = 'tarefa'

            const titulo = document.createElement('h2')
            titulo.className = 'titulo'

            const data = document.createElement('span')
            data.className = 'data'

            const editar = document.createElement('img')
            editar.className = 'editar'
            editar.src = '../img/pencil-svgrepo-com.svg'

            const excluir = document.createElement('img')
            excluir.className = 'excluir'
            excluir.src = '../img/trash-bin-minimalistic-svgrepo-com.svg'

            const comentar = document.createElement('img')
            comentar.className = 'comentar'
            comentar.src = '../img/comment-svgrepo-com.svg'
            comentar.id = item.id

            card.style.backgroundColor = '#f5b49f'

            editar.addEventListener('click', function(){
                editarTarefa(item.id)
            })
    
            excluir.addEventListener('click', function(){
                excluirTarefa(item.id)
            })

            comentar.addEventListener('click', function(event){
                const teste = event.target.id
                
                criarComentarios(teste)
            })

            titulo.textContent = item.descrição
            data.textContent = item.dataConclusão
           
            card.append(titulo, data, editar, excluir, comentar)
            cardContainer.appendChild(card)
        } else {
            const card = document.createElement('div')
            card.className = 'tarefa'

            const titulo = document.createElement('h2')
            titulo.className = 'titulo'

            const data = document.createElement('span')
            data.className = 'data'

            const comentar = document.createElement('img')
            comentar.className = 'comentar'
            comentar.src = '../img/comment-svgrepo-com.svg' 
            comentar.id = item.id

            comentar.addEventListener('click', function(event){
                const teste = event.target.id
                console.log(teste);
                
                criarComentarios(item.id)
            })
            
            titulo.textContent = item.descrição
            data.textContent = item.dataConclusão

            card.append(titulo, data, comentar)
            cardContainer.appendChild(card)
        }
    })
}

criarCard()

const adicionar = document.getElementById('adicionar')
adicionar.addEventListener('click', async => {
    const criarTarefaDiv = document.getElementById('criar_tarefa')
    criarTarefaDiv.style.display = 'flex'
})

const criarTarefa = async () => {
    const tituloInput = document.getElementById('titulo').value
    const dataInput = document.getElementById('data').value

    if (titulo !== "" && data !== "") {
        const url = `http://localhost:5080/tarefas`

        const tarefa = {
            descrição: tituloInput,
            dataConclusão: dataInput,
            idUsuario: localStorage.getItem('id')
        }

        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tarefa),
            }

            await fetch(url, options)
        } catch (error) {
            console.error(error)
        }
        alert('Tarefa adicionada com sucesso!')
        criarTarefaDiv.style.display = 'none'
        window.location.reload()
    } else {
        alert('Preencha os campos corretamente!')
    }
}

const excluirTarefa = async (tarefa) => {
    const url = `http://localhost:5080/tarefas/${tarefa}`
    await fetch(url, {
        method: 'DELETE'
    })
    window.location.reload()
   
    
}


const editarTarefa = async (tarefa) => {
    const url = `http://localhost:5080/tarefas/${tarefa}`
    const response = await fetch(url)
    const data = await response.json()

    console.log(data.id);

    const divTarefa = document.getElementById('editar_tarefa')
    divTarefa.style.display = 'flex'

    const botao = document.getElementById('button_editar')
    botao.addEventListener('click', async () => {
        const tituloInput = document.getElementById('tituloAtualizado').value
        const dataInput = document.getElementById('dataAtualizada').value

        const tarefaAtualizada = {
            descrição: tituloInput,
            dataConclusão: dataInput,
            idUsuario: data.idUsuario
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarefaAtualizada),
        }
        await fetch(url, options)
        window.location.reload()
    })

}

const criarComentarios = async(tarefa) => {
    const cardContainer = document.getElementById('cardContainer')
    cardContainer.className = 'main' 

    const url = `http://localhost:5080/comentarios`
    const response = await fetch(url)
    const comentarios = await response.json()

    const urlUser = `http://localhost:5080/usuario`
    const resposta = await fetch(urlUser)
    const usuario = await resposta.json()

    comentarios.forEach( async (elemento)=>{

        if(tarefa  == elemento.tarefaId){
            const container =  document.createElement('div')
            container.className = 'comentarios'
        
            const comments = document.createElement('div')
            comments.className = 'comentarios-layout'
    
            const foto_perfil = document.createElement('img')
            foto_perfil.src = `${elemento.foto}`
            foto_perfil.className =  'foto_perfil'
    
            const infos = document.createElement('div')
            infos.className = 'infos'
    
            const texto = document.createElement('p')
            texto.className = 'texto'
            texto.textContent = elemento.comentario
    
            const usuarioInfoDiv = document.createElement('div')
            const nome = document.createElement('span')
            const data = document.createElement('span')
            usuario.forEach((item) => {
                if(item.id == elemento.usuarioId){
                    usuarioInfoDiv.className = 'usuario-data'
                    
                    nome.textContent = item.nome
            
                    data.textContent = elemento.data
                }
            })
    
            const commentInput = document.createElement('div')
            commentInput.className = 'comment_input'
    
            const input = document.createElement('input')
            input.classList = 'comentario'
    
            const enviarIcon = document.createElement('img')
            enviarIcon.className = 'enviar'
            enviarIcon.src = '../img/send-alt-1-svgrepo-com.svg'
    
            commentInput.append(input,enviarIcon)
            usuarioInfoDiv.append(nome,data)
            infos.append(texto,usuarioInfoDiv)
            comments.append(foto_perfil,infos)
            container.append(comments,commentInput)
            cardContainer.appendChild(container)
        }
    })


}
