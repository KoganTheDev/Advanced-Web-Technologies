const fs = require('fs'); // Used to import modules, JSON, and local files. module enables interacting with the file system in a way modeled on standard POSIX functions.
const path = require('path'); // The node:path module provides utilities for working with file and directory paths. It can be accessed using:



// Reading a text file
fs.readFile(path.join(__dirname, 'example.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading text file:', err);
        return;
    }
    console.log('Text file content:', data);
});

// Writing to a text file
const textContent = 'Hello, this is a sample text file content.';
fs.writeFile(path.join(__dirname, 'output.txt'), textContent, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to text file:', err);
        return;
    }
    console.log('Text file written successfully.');
});

// Reading a JSON file
fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    try {
        const jsonData = JSON.parse(data);
        console.log('JSON file content:', jsonData);
    } catch (parseErr) {
        console.error('Error parsing JSON file:', parseErr);
    }
});

// Writing to a JSON file
const jsonContent = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
};
fs.writeFile(path.join(__dirname, 'output.json'), JSON.stringify(jsonContent, null, 2), 'utf8', (err) => {
    if (err) {
        console.error('Error writing to JSON file:', err);
        return;
    }
    console.log('JSON file written successfully.');
});

