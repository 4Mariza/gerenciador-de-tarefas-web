const criarTarefa = async () => {
    const tituloInput = document.getElementById("titulo").value;
    const dataInput = document.getElementById("data").value;
  
    if (titulo !== "" && data !== "") {
      const url = `http://localhost:5080/tarefas`;
  
      const tarefa = {
        descrição: tituloInput,
        dataConclusão: dataInput,
        idUsuario: localStorage.getItem("id"),
      };
  
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarefa),
        };
  
        await fetch(url, options);
      } catch (error) {
        console.error(error);
      }
      alert("Tarefa adicionada com sucesso!");
      window.location.reload();
    } else {
      alert("Preencha os campos corretamente!");
    }
  };
  
  const excluirTarefa = async (tarefa) => {
    const url = `http://localhost:5080/tarefas/${tarefa}`;
    await fetch(url, {
      method: "DELETE",
    });
    window.location.reload();
  };
  
  const editarTarefa = async (tarefa) => {
    const url = `http://localhost:5080/tarefas/${tarefa}`;
    const response = await fetch(url);
    const data = await response.json();
  
    console.log(data.id);
  
    const divTarefa = document.getElementById("editar_tarefa");
    divTarefa.style.display = "flex";
  
    const botao = document.getElementById("button_editar");
    botao.addEventListener("click", async () => {
      const tituloInput = document.getElementById("tituloAtualizado").value;
      const dataInput = document.getElementById("dataAtualizada").value;
  
      const tarefaAtualizada = {
        descrição: tituloInput,
        dataConclusão: dataInput,
        idUsuario: data.idUsuario,
      };
  
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefaAtualizada),
      };
      await fetch(url, options);
      window.location.reload();
    });
  };