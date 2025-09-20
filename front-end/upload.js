const uploadButton = document.getElementById("upload-button"); //Chama o botão de Upload

const fileInput = document.getElementById("file-input"); //Chama o input de seleção de arquivo

const fileTable = document.getElementById("file-table"); //Chama a parte da tabela onde as linhas serão adicionadas

//Para dados fictícios

let fileIdCounter = 5;

let fileVersionCounter = 1.0;

//Oculta o botão input de arquivos

fileInput.style.display = "none";

//Adiciona o evento de click no botão Upload

uploadButton.addEventListener("click", () => {
  //Quando clica no botão de Upload, vai acionar o input de arquivos

  fileInput.click();
});

//Evento para quando o arquivo do input muda

fileInput.addEventListener("change", (event) => {
  //Vai pegar o primeiro arquivo da lista

  const file = event.target.files[0]; //Verifca se algum arquivo foi selecionado

  if (file) {
    //Vai incrementar o contador do arquivo novo

    fileIdCounter++;

    fileVersionCounter = (parseFloat(fileVersionCounter) + 0.1).toFixed(1); //Cria uma nova linha da tabela

    const newRow = document.createElement("tr"); //Adiciona o checkbox

    const fileCheck = document.createElement("td");

    fileCheck.innerHTML = `<input type="checkbox" name="file-check" id="file-check-1" class="file-checkbox" title="Selecionar arquivo">`;

    newRow.appendChild(fileCheck); //Adiciona o botão de download

    const btnDonwload = document.createElement("td");

    btnDonwload.textContent = "⬇️";

    newRow.appendChild(btnDonwload); //Adiciona o id do arquivo

    const fileId = document.createElement("td");

    const formatId = String(fileIdCounter).padStart(3, "0"); //Converte para String e adiciona zeros a esquerda

    fileId.textContent = formatId;

    newRow.appendChild(fileId); //Adiciona o nome do arquivo

    const fileName = document.createElement("td");

    fileName.textContent = file.name;

    newRow.appendChild(fileName); //Adiciona a versão do arquivo

    const fileVersion = document.createElement("td");

    fileVersion.textContent = fileVersionCounter;

    newRow.appendChild(fileVersion); //Adiciona a localização do arquivo

    const fileLocation = document.createElement("td");

    fileLocation.textContent = "/server/uploads"; //Caminho fictício

    newRow.appendChild(fileLocation); //Adiciona e converte o tamanho do arquivo

    const fileColumn = document.createElement("td");

    const fileSize = file.size; //Retorna o tamanho do arquivo //Verifica o tamanho do arquivo

    const formatSize =
      fileSize > 1024 * 1024
        ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB` //Se maior que o 1 MB
        : `${(fileSize / 1024).toFixed(2)} KB`; //Se menor que 1 MB

    fileColumn.textContent = formatSize;

    newRow.appendChild(fileColumn); //Adiciona um valor a quantidade de downloads

    const fileDonwloads = document.createElement("td");

    fileDonwloads.textContent = 0;

    newRow.appendChild(fileDonwloads); //Adiciona a nova linha a tabela

    fileTable.appendChild(newRow); //Limpa o valor de input

    event.target.value = "";
  }
});

function validateFileType(selectorField) {
  if (fileInput.files[0].type != "application/x-zip-compressed") {
    alert("Erro: Tipo arquivo inválido, selecione arquivo .rar!");

    fileInput.value = "";
  }
}
