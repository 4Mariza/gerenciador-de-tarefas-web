const criarCard = async (idUsuario) => {
    const url = `http://localhost:5080/tarefas`
    const response = await fetch(url)
    const tarefas = await response.json()
console.log(tarefas);

    const cardContainer = document.getElementById('cardContainer')
    cardContainer.className = 'tarefa'

    tarefas.forEach((item) =>{
        
        console.log(item);
        if(idUsuario == item.idUsuario){
            
            const card = document.createElement('div')
        
            card.classList.add('card')
        
            card.innerHTML = `
                <div class="dropdown">
                    <button class="mainmenubtn">
                        <img src="../img/arrow-right-bold-svgrepo-com.svg" alt="" width="40%">
                    </button>
                    <div class="dropdown-child">
                        <p>Descrição da tarefa aqui nsafjdbashfb shfbhasjfbwghaf vwehfbhvhavn bsbdvh bsahdfbsbdfbsjdi</p>
                    </div>
                </div>
                <input type="checkbox" name="true_false" id="checkbox">
                <h2>${item.descrição}</h2>
                <span>${item.dataConclusão}</span>
                <img src="../img/pencil-svgrepo-com.svg" alt="" width="3%" id="editar">
                <img src="../img/trash-bin-minimalistic-svgrepo-com.svg" alt="" width="3%" id="lixeira">
            `
    
            cardContainer.appendChild(card)
        }
    })
    
}
criarCard(3)