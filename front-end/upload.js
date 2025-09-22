const uploadButton = document.getElementById("upload-button");
const fileInput = document.getElementById("file-input");
const fileTable = document.getElementById("file-table");
const downloadButton = document.getElementById("download-button"); // Seleciona o novo botão

// Armazena os arquivos para download
const uploadedFiles = {};

// Dados fictícios
let fileIdCounter = 0;
let fileVersionCounter = 1.0;

// Oculta o botão de input
fileInput.style.display = "none";

// Adiciona evento de clique no botão Upload
uploadButton.addEventListener("click", () => {
  fileInput.click();
});

// Evento para quando o arquivo do input muda
fileInput.addEventListener("change", (event) => {
  // Pega o primeiro arquivo da lista
  const file = event.target.files[0];

  // Verifica se algum arquivo foi selecionado
  if (file) {
    // Pega o nome do arquivo, converte para minúsculo e checa a extensão
    const fileNameConvert = file.name.toLowerCase();

    // Validação da extensão do arquivo
    if (
      !fileNameConvert.endsWith(".zip") &&
      !fileNameConvert.endsWith(".rar")
    ) {
      alert(
        "Erro: Tipo de arquivo inválido. Por favor, selecione um arquivo .zip ou .rar."
      );
      event.target.value = ""; // Limpa o input
      return;
    }

    fileIdCounter++;
    fileVersionCounter = (parseFloat(fileVersionCounter) + 0.1).toFixed(1);

    // Adiciona o arquivo ao objeto uploadedFiles
    uploadedFiles[fileIdCounter] = {
      fileObject: file,
      version: fileVersionCounter,
    };

    const newRow = document.createElement("tr");
    newRow.setAttribute("data-file-id", fileIdCounter); // Adiciona um atributo para identificar a linha

    // Adiciona o checkbox
    const fileCheck = document.createElement("td");
    fileCheck.innerHTML = `<input type="checkbox" name="file-check" class="file-checkbox" title="Selecionar arquivo">`;
    newRow.appendChild(fileCheck);

    // Adiciona o botão de download individual
    const btnDownload = document.createElement("td");
    const downloadLink = document.createElement("a");
    const fileUrl = URL.createObjectURL(file);
    downloadLink.href = fileUrl;
    downloadLink.download = file.name;
    downloadLink.textContent = "⬇️";
    btnDownload.appendChild(downloadLink);
    newRow.appendChild(btnDownload);

    // Adiciona o id do arquivo
    const fileId = document.createElement("td");
    const formatId = String(fileIdCounter).padStart(3, "0");
    fileId.textContent = formatId;
    newRow.appendChild(fileId);

    // Adiciona o nome do arquivo
    const fileName = document.createElement("td");
    fileName.textContent = file.name;
    newRow.appendChild(fileName);

    // Adiciona a versão do arquivo
    const fileVersion = document.createElement("td");
    fileVersion.textContent = fileVersionCounter;
    newRow.appendChild(fileVersion);

    // Adiciona a localização do arquivo
    const fileLocation = document.createElement("td");
    fileLocation.textContent = "/server/uploads";
    newRow.appendChild(fileLocation);

    // Adiciona e converte o tamanho do arquivo
    const fileColumn = document.createElement("td");
    const fileSize = file.size;
    const formatSize =
      fileSize > 1024 * 1024
        ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
        : `${(fileSize / 1024).toFixed(2)} KB`;
    fileColumn.textContent = formatSize;
    newRow.appendChild(fileColumn);

    // Adiciona quantidade de downloads
    const fileDownloads = document.createElement("td");
    fileDownloads.textContent = 0;
    newRow.appendChild(fileDownloads);

    fileTable.appendChild(newRow);

    window.addEventListener("beforeunload", () => {
      URL.revokeObjectURL(fileUrl);
    });

    event.target.value = "";
  }
});

// Adiciona o evento de clique ao botão "Download Selecionados"
downloadButton.addEventListener("click", () => {
  const selectedCheckboxes = document.querySelectorAll(
    ".file-checkbox:checked"
  );
  if (selectedCheckboxes.length === 0) {
    alert("Nenhum arquivo selecionado para download.");
    return;
  }

  selectedCheckboxes.forEach((checkbox) => {
    const row = checkbox.closest("tr");
    const fileId = row.getAttribute("data-file-id");
    const fileInfo = uploadedFiles[fileId];

    if (fileInfo) {
      const file = fileInfo.fileObject;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revogar URL após o download
      URL.revokeObjectURL(link.href);
    }
  });

  alert(
    `${selectedCheckboxes.length} arquivo(s) selecionado(s) foram baixados!`
  );

  // Limpa os checkboxes selecionados após o download
  selectedCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Opcionalmente, desmarque o "Selecionar todos" se ele estiver marcado
  const checkAll = document.getElementById("check-all");
  if (checkAll.checked) {
    checkAll.checked = false;
  }
});

// Ativa a funcionalidade do checkbox "check-all"
const checkAll = document.getElementById("check-all");

checkAll.addEventListener("change", () => {
  // Seleciona todos os checkboxes individuais com a classe .file-checkbox
  const fileCheckboxes = document.querySelectorAll(".file-checkbox");

  // Percorre cada checkbox e define seu estado (checked) como o mesmo do "check-all"
  fileCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked;
  });
});

// Funcionalidade de Pesquisa/Filtro
const filterInput = document.getElementById("filter");
const searchButton = document.getElementById("search-button");

const filterTable = () => {
  // Converte o texto do input para minúsculas para uma comparação sem distinção de maiúsculas/minúsculas
  const filterText = filterInput.value.toLowerCase();

  // Seleciona todas as linhas (tr) na tabela de arquivos
  const tableRows = fileTable.querySelectorAll("tr");

  tableRows.forEach((row) => {
    // Pega o nome do arquivo, que está na 4ª coluna (índice 3)
    const fileNameCell = row.querySelector("td:nth-child(4)");

    if (fileNameCell) {
      const fileName = fileNameCell.textContent.toLowerCase();

      // Verifica se o nome do arquivo inclui o texto do filtro
      // Se sim, a linha é exibida; caso contrário, é ocultada
      if (fileName.includes(filterText)) {
        row.style.display = ""; // Exibe a linha
      } else {
        row.style.display = "none"; // Oculta a linha
      }
    }
  });
};

// Adiciona o evento de clique ao botão de pesquisa
searchButton.addEventListener("click", filterTable);

// Opcional: Adiciona o evento de 'input' para filtrar em tempo real
filterInput.addEventListener("input", filterTable);

// Ativa a funcionalidade do checkbox 'check-all'

checkAll.addEventListener("change", () => {
  const fileCheckboxes = document.querySelectorAll(".file-checkbox");
  fileCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked;
  });
});
