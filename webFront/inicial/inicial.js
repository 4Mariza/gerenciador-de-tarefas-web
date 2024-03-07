const idUsuario = localStorage.getItem("id");
const userName = localStorage.getItem("user");

const userGreeting = document.getElementById("user_greeting");
userGreeting.textContent = `Olá, ${userName}`;

const criarCard = async () => {
  const url = `http://localhost:5080/tarefas`;
  const response = await fetch(url);
  const tarefas = await response.json();

  const urlUser = `http://localhost:5080/usuario/${idUsuario}`;
  const resposta = await fetch(urlUser);
  const usuario = await resposta.json();

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.className = "main";

  tarefas.forEach((item) => {
    if (usuario.id == item.idUsuario) {
      const card = document.createElement("div");
      card.className = "tarefa";

      const titulo = document.createElement("h2");
      titulo.className = "titulo";

      const data = document.createElement("span");
      data.className = "data";

      const editar = document.createElement("img");
      editar.className = "editar";
      editar.src = "../img/pencil-svgrepo-com.svg";

      const excluir = document.createElement("img");
      excluir.className = "excluir";
      excluir.src = "../img/trash-bin-minimalistic-svgrepo-com.svg";

      const comentar = document.createElement("img");
      comentar.className = "comentar";
      comentar.src = "../img/comment-svgrepo-com.svg";
      comentar.id = item.id;

      card.style.backgroundColor = "#f5b49f";

      editar.addEventListener("click", function () {
        editarTarefa(item.id);
      });

      excluir.addEventListener("click", function () {
        excluirTarefa(item.id);
      });

      comentar.addEventListener("click", function (event) {
        const tarefa = event.target.id;

        criarComentarios(tarefa);
      });

      titulo.textContent = item.descrição;
      data.textContent = item.dataConclusão;

      card.append(titulo, data, editar, excluir, comentar);
      cardContainer.appendChild(card);
    } else {
      const card = document.createElement("div");
      card.className = "tarefa";

      const titulo = document.createElement("h2");
      titulo.className = "titulo";

      const data = document.createElement("span");
      data.className = "data";

      const comentar = document.createElement("img");
      comentar.className = "comentar";
      comentar.src = "../img/comment-svgrepo-com.svg";
      comentar.id = item.id;

      comentar.addEventListener("click", function (event) {
        const teste = event.target.id;
        console.log(teste);

        criarComentarios(item.id);
      });

      titulo.textContent = item.descrição;
      data.textContent = item.dataConclusão;

      card.append(titulo, data, comentar);
      cardContainer.appendChild(card);
    }
  });
};

criarCard();

const adicionar = document.getElementById("adicionar");
adicionar.addEventListener("click", (async) => {
  const criarTarefaDiv = document.getElementById("criar_tarefa");
  criarTarefaDiv.style.display = "flex";
});

const criarComentarios = async (tarefa) => {
  const closeButton = document.getElementById("close");
  closeButton.style.display = "block";

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.className = "main";

  const url = `http://localhost:5080/comentarios`;
  const response = await fetch(url);
  const comentarios = await response.json();

  const urlUser = `http://localhost:5080/usuario`;
  const resposta = await fetch(urlUser);
  const usuario = await resposta.json();

  comentarios.forEach(async (elemento) => {
    if (tarefa == elemento.tarefaId) {
      const container = document.createElement("div");
      container.className = "comentarios";

      const comments = document.createElement("div");
      comments.className = "comentarios-layout";

      const foto_perfil = document.createElement("img");
      foto_perfil.src = `${elemento.foto}`;
      foto_perfil.className = "foto_perfil";

      const infos = document.createElement("div");
      infos.className = "infos";

      const texto = document.createElement("p");
      texto.className = "texto";
      texto.textContent = elemento.comentario;

      const usuarioInfoDiv = document.createElement("div");
      const nome = document.createElement("span");
      const data = document.createElement("span");
      usuario.forEach((item) => {
        if (item.id == elemento.usuarioId) {
          usuarioInfoDiv.className = "usuario-data";

          nome.textContent = item.nome;

          data.textContent = elemento.data;
        }
      });

      const commentInput = document.createElement("div");
      commentInput.className = "comment_input";
      
      const input = document.createElement("input");
      input.classList = "comentario";
      input.setAttribute("id", "input")
      input.setAttribute("type", "text")
     
      const enviarIcon = document.createElement("img");
      enviarIcon.className = "enviar";
      enviarIcon.src = "../img/send-alt-1-svgrepo-com.svg";

      commentInput.append(input, enviarIcon);
      usuarioInfoDiv.append(nome, data);
      infos.append(texto, usuarioInfoDiv);
      comments.append(foto_perfil, infos);
      container.append(comments, commentInput);
      cardContainer.appendChild(container);

      closeButton.addEventListener("click", function () {
        const closeButton = document.getElementById("close");
        closeButton.style.display = "none";

        container.style.display = "none";
      });

      enviarIcon.addEventListener("click", function () {
        const texto = input.value

        adicionarComentario(tarefa,texto);
      });
    } else {
        const cardContainer = document.getElementById("cardContainer");
        cardContainer.className = "main";

        const container = document.createElement("div");
        container.className = "comentarios";
        
        const closeButton = document.getElementById("close");
        closeButton.style.display = "block";
        
        const commentInput = document.createElement("div");
        commentInput.className = "comment_input";

        const input = document.createElement("input");
        input.classList = "comentario";
        input.setAttribute("id", "input")
        input.setAttribute("type", "text")
        
        const enviarIcon = document.createElement("img");
        enviarIcon.className = "enviar";
        enviarIcon.src = "../img/send-alt-1-svgrepo-com.svg";
        
        commentInput.append(input, enviarIcon);
        container.append(commentInput);
        cardContainer.appendChild(container);

        closeButton.addEventListener("click", function () {
            closeButton.style.display = "none";
    
            container.style.display = "none";
        });

        enviarIcon.addEventListener("click", function () {
            const texto = input.value
            adicionarComentario(tarefa, texto);
        });
    }
  });
};
