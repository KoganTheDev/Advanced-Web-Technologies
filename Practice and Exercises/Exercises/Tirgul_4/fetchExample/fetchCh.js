// This script demonstrates how to use the Fetch API with async/await syntax to fetch data in chunks from a URL.
async function fetchDataWithChunksAsync(url) {
    // The Fetch API is used to make a network request to the specified URL.
    // The `fetch` function returns a promise that resolves to the response of the request.
    // The `url` parameter is the URL from which data is being fetched.
    // The `fetch` function is called with the URL as an argument.
    // The `response` variable holds the response object returned by the fetch call.
    // The `response` object contains information about the response, including the status code, headers, and body.

    const response = await fetch(url);
    // The `response.body` property is a ReadableStream representing the response body.
    // The `getReader` method is called on the response body stream to create a reader object.
    // The `reader` object is used to read from the response body stream.
    // The `read` method is called on the reader object to read a chunk of data from the stream.
    // The `read` method returns a promise that resolves to an object with two properties: `done` and `value`.
    // The `done` property indicates whether the stream has been fully read.
    // The `value` property contains the chunk of data read from the stream.
    // The `reader` object is used to read from the response body stream.
    // The `read` method is called on the reader object until it resolves to an object with `done` set to `true`.
    const reader = response.body.getReader();
    let chunks = [];
  
    while (true) {
        // The `read` method returns a promise that resolves to an object with two properties: `done` and `value`.
        // The `done` property indicates whether the stream has been fully read.
        // The `value` property contains the chunk of data read from the stream.
        // The `reader` object is used to read from the response body stream.
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks = [...chunks, value];
        // The spread operator `...` is used to create a new array that includes all elements from the existing `chunks` array.
        // The `value` is the new chunk of data read from the stream, and it is added to the `chunks` array.
        // The `value` is a Uint8Array representing the chunk of data read from the stream.
      // Process each chunk here
      console.log('Received chunk:', value);
    }
  
    // Combine and process all chunks
    const combinedData = processChunks(chunks);
    return combinedData;
  }
  
  // Promises with chunks
  function fetchDataWithChunksPromise(url) {
    return fetch(url)
      .then(response => {
        const reader = response.body.getReader();
        let chunks = [];
  
        function read() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              return chunks;
            }
            chunks = [...chunks, value];
            // Process each chunk here
            // For example, you can log the chunk or store it in an array
            // This is where you can handle the chunk data as needed
            // The "spread operator" `...` is used to create a new array that includes all elements from the existing `chunks` array.
            // The `value` is the new chunk of data read from the stream, and it is added to the `chunks` array.
            console.log('Received chunk:', value);
            return read();
          });
        }
  
        return read();
      })
      .then(chunks => {
        // Combine and process all chunks
        const combinedData = processChunks(chunks);
        return combinedData;
      });
  }
  
  // Function to combine and process chunks (replace with your logic)
  function processChunks(chunks) {
    // Combine the chunks into a single Uint8Array
    const combinedLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    // The reduce function takes an accumulator (acc) and the current chunk (chunk)
    // and adds the length of the current chunk to the accumulator.
    const combined = new Uint8Array(combinedLength);
    let position = 0;
    for (const chunk of chunks) {
        // The `set` method copies the values from the chunk into the combined array at the specified position.
        // The `position` variable keeps track of the current position in the combined array.
      combined.set(chunk, position);
      position += chunk.length;
    }
  
    // Decode the Uint8Array to a string (if it's text data)
    const decoder = new TextDecoder();
    const text = decoder.decode(combined);
    return text;
  }
  
// Example usage
const url = 'https://api.vercel.app/blog';
const url2 = 'https://jsonplaceholder.typicode.com/comments';
fetchDataWithChunksAsync(url2)
fetchDataWithChunksPromise(url2)