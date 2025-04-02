// Dynamic Table Functions
function loadDynamicJSON() {
    loadTableFromJSON('dynamicFileInput', 'dynamicTable');
}

function downloadDynamicJSON() {
    downloadTableAsJSON('dynamicTable', 'dynamic_table_data.json');
}

// Static JS Structure Table Functions
function loadStaticJSJSON() {
    loadTableFromJSON('staticFileInputJS', 'staticTableJS');
}

function downloadStaticJSJSON() {
    downloadTableAsJSON('staticTableJS', 'static_table_js_data.json');
}

// Static HTML Structure Table Functions
function loadStaticHTMLJSON() {
    loadTableFromJSON('staticFileInputHTML', 'staticTableHTML');
}

function downloadStaticHTMLJSON() {
    downloadTableAsJSON('staticTableHTML', 'static_table_html_data.json');
}

// Shared Functions
function loadTableFromJSON(fileInputId, tableId) {
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a JSON file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const jsonString = event.target.result;
            const jsonData = JSON.parse(jsonString);
            populateTable(tableId, jsonData);
        } catch (error) {
            console.error("JSON Parsing Error:", error); // Log the error to the console
            const table = document.getElementById(tableId);
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.textContent = "Error parsing JSON file. Please check the console for details.";
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
    };

    reader.readAsText(file);
}

function populateTable(tableId, jsonData) {
    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (jsonData.length > 0) {
        const headers = Object.keys(jsonData[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.classList.add('px-4', 'py-2', 'text-left');
            thead.appendChild(th);
        });

        jsonData.forEach(item => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header];
                td.classList.add('border', 'px-4', 'py-2');
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No data found in JSON.";
        tbody.appendChild(tr);
    }
}

function downloadTableAsJSON(tableId, filename) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
    const jsonData = [];

    rows.forEach((row, index) => {
        if (index > 0) { // Skip header row
            const rowData = {};
            Array.from(row.querySelectorAll('td')).forEach((td, i) => {
                rowData[headers[i]] = td.textContent;
            });
            jsonData.push(rowData);
        }
    });

    const jsonString = JSON.stringify(jsonData, null, 2);
    const encodedUri = "data:application/json;charset=utf-8," + encodeURIComponent(jsonString);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initial load for staticTableJS
window.onload = function() {
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            populateTable('staticTableJS', jsonData);
        });
};