// Dynamic Table Functions
function loadDynamicCSV() {
    loadTableFromCSV('dynamicFileInput', 'dynamicTable');
}

function downloadDynamicCSV() {
    downloadTableAsCSV('dynamicTable', 'dynamic_table_data.csv');
}

// Static JS Structure Table Functions
function loadStaticJSCSV() {
    loadTableFromCSV('staticFileInputJS', 'staticTableJS');
}

function downloadStaticJSCSV() {
    downloadTableAsCSV('staticTableJS', 'static_table_js_data.csv');
}

// Static HTML Structure Table Functions
function loadStaticHTMLCSV() {
    loadTableFromCSV('staticFileInputHTML', 'staticTableHTML');
}

function downloadStaticHTMLCSV() {
    downloadTableAsCSV('staticTableHTML', 'static_table_html_data.csv');
}

// Shared Functions
function loadTableFromCSV(fileInputId, tableId) {
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').filter(row => row.trim() !== '');
        const table = document.getElementById(tableId);
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');

        thead.innerHTML = '';
        tbody.innerHTML = '';

        if (rows.length > 0) {
            const headers = rows[0].split(',');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                th.classList.add('px-4', 'py-2', 'text-left');
                thead.appendChild(th);
            });

            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(',');
                const tr = document.createElement('tr');
                rowData.forEach(cellData => {
                    const td = document.createElement('td');
                    td.textContent = cellData;
                    td.classList.add('border', 'px-4', 'py-2');
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            }
        } else {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = "No data found in CSV.";
            td.colSpan = headers.length;
            tbody.appendChild(tr);
        }
    };

    reader.readAsText(file);
}

function downloadTableAsCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(row => {
        const rowData = Array.from(row.querySelectorAll('td, th'))
            .map(cell => cell.textContent)
            .join(',');
        csvContent += rowData + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}