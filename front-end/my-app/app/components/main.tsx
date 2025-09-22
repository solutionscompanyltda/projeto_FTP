export default function Main(){
    return (
        <main id="main-content" className="main-content">
        <div className="container-table100">
            <div className="wrap-table100">
                <section id="search-section" className="search-section">
                    <input type="text" name="filter" id="filter" placeholder="Filtrar arquivos"/>
                    <button id="search-button" className="button">Pesquisar</button>
                    <button id="upload-button" className="button">Upload</button>
                    <button id="download-button" className="button">Download</button>
                    <input type="file" id="file-input" accept=".zip,.rar,application/zip,application/x-zip-compressed,application/vnd.rar,application/x-rar-compressed"/>
                </section>
                <section id="file-section" className="file-section">
                    <table>
                    <thead className="table100-head">
                        <tr>
                            <th className="column1"> 
                                    <input type="checkbox" name="check-all" id="check-all" title="Selecionar todos os arquivos"/>
                            </th>
                            <th className="column2"></th>
                            <th className="column2">ID</th>
                            <th className="column2">Nome</th>
                            <th className="column2">Versão</th>
                            <th className="column2">Local</th>
                            <th className="column2">Tamanho</th>
                            <th className="column2">Downloads</th>
                        </tr>
                    </thead>
                    <tbody id="file-table"></tbody>
                </table>
                </section>
            </div>
        </div>
    </main>
    )
}