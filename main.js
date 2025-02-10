//  Construção dos elementos HTML para a lista de tarefas
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container'); 
// Função para adicionar uma nova tarefa à lista
function addTask() {
  // Verifica se o campo de entrada está vazio
  if (inputBox.value === '') {
    alert('Por favor, adicione uma tarefa.'); // Exibe um alerta se o campo estiver vazio
  } else {
    // Cria um novo elemento <li> para a tarefa
    let li = document.createElement("li");
    // Define o conteúdo do elemento <li> como o valor do campo de entrada
    li.innerHTML = inputBox.value;
    // Adiciona o novo elemento <li> à lista
    listContainer.appendChild(li);

    // Cria um novo elemento <span> para o botão de remoção
    let span = document.createElement("span");
    // Define o conteúdo do elemento <span> como o caractere "×" (Unicode \u00d7)
    span.innerHTML = "\u00d7";
    // Adiciona o elemento <span> ao elemento <li>
    li.appendChild(span);
  }
  // Limpa o campo de entrada após adicionar a tarefa
  inputBox.value = "";
  // Salva os dados da lista no localStorage
  saveData();
}

// Adiciona um listener de eventos de clique ao elemento listContainer
listContainer.addEventListener('click', function(e) {
  // Verifica se o elemento clicado é um <li>
  if (e.target.tagName === "LI") {
    // Adiciona ou remove a classe 'checked' do elemento <li> clicado
    e.target.classList.toggle('checked');
    // Salva os dados da lista no localStorage
    saveData();
  } 
  // Verifica se o elemento clicado é um <span>
  else if (e.target.tagName === "SPAN") {
    // Remove o elemento <li> pai do elemento <span> clicado da lista
    e.target.parentElement.remove();
    // Salva os dados da lista no localStorage
    saveData();
  }
}, false);

// Função para salvar os dados da lista no localStorage
function saveData() {
  // Salva o conteúdo da lista listContainer no localStorage com a chave 'data'
  localStorage.setItem('data', listContainer.innerHTML);
}

// Função para carregar os dados da lista do localStorage
function showTask() {
  // Define o conteúdo da lista listContainer com o conteúdo recuperado do localStorage
  listContainer.innerHTML = localStorage.getItem("data");
}

// Chama a função showTask() para carregar as tarefas salvas no localStorage ao carregar a página
showTask();

// Envia uma requisição HTTP POST para o arquivo save_task.php com a nova tarefa
fetch('save_task.php', {
  method: 'POST',
  body: JSON.stringify({ task: newTask }), // Define o corpo da requisição como um objeto JSON contendo a nova tarefa
  headers: { 'Content-Type': 'application/json' } // Define o tipo de conteúdo da requisição como JSON
});
