
const criarCard = async (idUsuario) => {
    const url = `http://localhost:5080/tarefas`
    const response = await fetch(url)
    const tarefas = await response.json()

    const cardContainer = document.getElementById('cardContainer')
    cardContainer.className = 'main'

    tarefas.forEach((item) => {

        if (idUsuario == item.idUsuario) {

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
                <input type="checkbox" name="true_false" id="checkbox">
                <h2>${item.descrição}</h2>
                <span>${item.dataConclusão}</span>
                <img src="../img/pencil-svgrepo-com.svg" alt="" width="3%" id="editar${item.id}"> 
                <img src="../img/trash-bin-minimalistic-svgrepo-com.svg" alt="" width="3%" id="lixeira${item.id}">
            `

            cardContainer.appendChild(card)

            console.log(cardContainer)

            const lixeira = document.getElementById('lixeira' + item.id)
            lixeira.addEventListener('click', function () {
                excluirTarefa(item.id)
            })

            const editar = document.getElementById('editar' + item.id)
            editar.addEventListener('click', () => {
                editarTarefa(item.id)
            })
        }
    })

}

criarCard(localStorage.getItem('id'))

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

    console.log(data);

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
    })

    window.location.reload()
}

