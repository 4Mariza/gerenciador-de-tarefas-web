// const criarCard = async (idUsuario) => {
//     const url = `http://localhost:5080/tarefas`
//     const response = await fetch(url)
//     const tarefas = await response.json()

//     const cardContainer = document.getElementById('cardContainer')
//     cardContainer.className = 'main'

//     tarefas.forEach((item) => {

//         if (idUsuario == item.idUsuario) {

//             const card = document.createElement('div')

//             card.classList.add('tarefa')

//             card.innerHTML = `
//                 <div class="dropdown">
//                     <button class="mainmenubtn">
//                         <img src="../img/arrow-right-bold-svgrepo-com.svg" alt="" width="40%">
//                     </button>
//                     <div class="dropdown-child">
//                         <p>${item.descrição}</p>
//                     </div>
//                 </div>
//                 <input type="checkbox" name="true_false" id="checkbox${item.id}">
//                 <h2>${item.descrição}</h2>
//                 <span>${item.dataConclusão}</span>
//                 <img src="../img/pencil-svgrepo-com.svg" alt="" width="3%" id="editar${item.id}"> 
//                 <img src="../img/trash-bin-minimalistic-svgrepo-com.svg" alt="" width="3%" id="lixeira${item.id}">
//             `

//             cardContainer.appendChild(card)

//             const lixeira = document.getElementById('lixeira' + item.id)
//             lixeira.addEventListener('click', function () {
//                 excluirTarefa(item.id)
//             })

//             const editar = document.getElementById('editar' + item.id)
//             editar.addEventListener('click', () => {
//                 editarTarefa(item.id)
//             })
//         }
//     })
// }

//criarCard(localStorage.getItem('id'))

constCriarCardEComentario = async () => {
    const url = `http://localhost:5080/tarefas`
    const response = await fetch(url)
    const tarefas = await response.json()

    const cardContainer = document.getElementById('cardContainer')
    cardContainer.className = 'main'

    tarefas.forEach((item) => {
        const card = document.createElement('div')

        card.classList.add('tarefa')

        card.innerHTML = `
                    <div class="dropdown">
                        <button class="mainmenubtn">
                            <img src="../img/arrow-right-bold-svgrepo-com.svg" alt="" width="40%">
                        </button>
                        <div class="dropdown-child">
                            <p>${item.descrição}</p>
                        </div>
                    </div>
                    <input type="checkbox" name="true_false" id="checkbox${item.id}">
                    <h2>${item.descrição}</h2>
                    <span>${item.dataConclusão}</span>
                    <img src="../img/pencil-svgrepo-com.svg" alt="" width="3%" id="editar${item.id}"> 
                    <img src="../img/trash-bin-minimalistic-svgrepo-com.svg" alt="" width="3%" id="lixeira${item.id}">
                    <img src="../img/comment-svgrepo-com.svg" alt="" width="3%" id="comment${item.id}">
                `
        cardContainer.appendChild(card)

        const comentario = document.getElementById('comment' + item.id)
        comentario.addEventListener('click', function () {

            const commentContainer = document.getElementById('comentarios')
            commentContainer.className = 'comentarios'

                console.log(item.comentarios);
                
                item.comentarios.forEach((elemento) => {
                    console.log(elemento)
                    
                    const comment = document.createElement('div')
                    comment.classList.add('comentarios-layout')
    
                    comment.innerHTML = `
                        <img src="${elemento.foto}" alt="" id="foto_perfil" width="18%">
                        <div class="infos">
                            <p class="texto">${elemento.comentario}</p>
                            <div class="usuario-data">
                                <span>${elemento.usuarioId}</span>
                                <span>${elemento.data}</span>
                            </div>
                        </div>
                        `
                    commentContainer.appendChild(comment)
                })
                commentContainer.style.display = "flex"


        })

        // const lixeira = document.getElementById('lixeira' + item.id)
        // lixeira.addEventListener('click', function () {
        //     excluirTarefa(item.id)
        // })

        // const editar = document.getElementById('editar' + item.id)
        // editar.addEventListener('click', () => {
        //     editarTarefa(item.id)
        // })
    })

}

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
constCriarCardEComentario()