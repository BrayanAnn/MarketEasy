function convertCSVtoJSON() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('csvFileInput');
        const selectedFile = fileInput.files[0];

        if (!selectedFile) {
            reject('Please select a CSV file.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const csvData = event.target.result;

            Papa.parse(csvData, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    const jsonData = results.data;
                    resolve(jsonData);
                },
                error: function(error) {
                    reject(error.message);
                }
            });
        };

        reader.readAsText(selectedFile);
    });
}


function createTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    
    // Cria uma tabela HTML
    const table = document.createElement('table');
    table.className = 'data-table';

    // Cria o cabeçalho da tabela com base nas chaves do primeiro objeto do array
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    for (const key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Preenche a tabela com os dados
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');

        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Adiciona a tabela ao contêiner
    tableContainer.innerHTML = ''; // Limpa qualquer conteúdo anterior
    tableContainer.appendChild(table);
}

btnCarregarCsv = document.getElementById("btnCarregarCsv");
var listProducts = []

btnCarregarCsv.addEventListener('click', function() {
    convertCSVtoJSON().then(function(jsonData) {
            listProducts = jsonData
            console.log(jsonData);
        })
        .catch(function(error) {
            console.error(error);
        });
});

btnSearch = document.getElementById("searchProduct");

btnSearch.addEventListener("click", function(){
    inputText = document.getElementById("inputText").value.toLowerCase()
    console.log(inputText);
    const searchResult = listProducts.find(item => item.prod_code.trim() === inputText);
    listProducts.forEach(item => console.log(item.prod_code))
    // Display the search result
    const searchResultContainer = document.getElementById('searchResult');
    if (searchResult) {
        searchResultContainer.textContent = `Mercado com menor preço: ${searchResult.mercado}, Preço: ${searchResult.preco_adj}`;
    } else {
        searchResultContainer.textContent = 'Not found';
    }

})