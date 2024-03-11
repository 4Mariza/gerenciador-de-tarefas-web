const adicionarComentario = async (tarefa,texto) => {
    console.log(tarefa);
    console.log(texto);

    const idUsuario = localStorage.getItem("id");
    const today = new Date(); 
  
    try {
        const urlUsers = `http://localhost:5080/usuario`;
        const response = await fetch(urlUsers);
        const usuarios = await response.json();
      
        if (texto !== "" && texto !== undefined) {
            console.log('aqui');
            const url = `http://localhost:5080/comentarios`;

            const user = usuarios.find(user => user.id == idUsuario);
            if (user) {
                const newComment = {
                    usuarioId: user.id,
                    tarefaId: tarefa,
                    foto: user.foto,
                    comentario: texto,
                    data: today.toDateString(),
                };

                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newComment),
                };

                await fetch(url, options);
                alert("Comentario adicionado com sucesso!");
                input.value = "";
            } else {
                console.error("User not found.");
            }
        }
    } catch (error) {
        console.error(error);
    }
};