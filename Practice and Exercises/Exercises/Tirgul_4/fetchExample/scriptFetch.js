// This script demonstrates how to use the Fetch API with error handling, 
// including retry logic, caching, and aborting requests using AbortController. 
// It also shows how to fetch multiple URLs in parallel and handle errors appropriately.
// The script is designed to be run in a browser environment and interacts with the DOM.


// Reset result
function reset() {
    document.getElementById("results").innerText = "Results:\n";
}


// This function fetches data from a given URL using the Fetch API and handles errors appropriately.
// It uses the Fetch API to make a network request and returns the response as JSON.
// If the response is not OK (status code 200), it throws an error with the status code.
// If the fetch operation fails, it catches the error and logs it to the console.
// It also updates the results section of the HTML document with the fetched data or an error message.
// The script is designed to be run in a browser environment and interacts with the DOM
fetchWithPromisesErrorHandling = (url) => {
    console.log("Fetching data with Promises AbortController and error handling...");
    // AbortController is used to abort the request if it takes too long.
    // It creates a new AbortController instance and assigns its signal to the fetch request.
    // The signal is used to communicate with the fetch request and abort it if necessary.
    // The `setTimeout` function is used to abort the request after a specified time (2 seconds in this case).
    // The `controller.abort()` method is called to abort the request.
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
        controller.abort(); // Abort the request after 2 seconds
        console.log("Request aborted");
    }, 2000);

    // The Fetch API is used to make a network request to the specified URL.
    // The `fetch` function returns a promise that resolves to the response of the request.
    // The `url` parameter is the URL from which data is being fetched.
    // The '{signal}' option is passed to the fetch function to associate the request with the AbortController.
    fetch(url, { signal })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("results").innerText += "\nData fetched with Promises AbortController and error handling:\n" + JSON.stringify(data, null, 2);
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.error("Fetch aborted:", error.message);
            } else {
                console.error("Error with Promises and AbortController and error handling:", error);
            }
        });
}

// This function uses async/await syntax for better readability and error handling.
// If any of the responses are not OK (status code 200), it throws an error with the status code.
// If the fetch operation fails, it catches the error and logs it to the console.
// It also updates the results section of the HTML document with the fetched data or an error message.
async function fetchWithAsyncAwaitAbortErrorHandling(url) {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
        controller.abort(); // Abort the request after 2 seconds
        console.log("Request aborted");
    }, 2000);

    try {
        console.log("Fetching data with async/await and AbortController...");
        const response = await fetch(url, { signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("results").innerText += "\nData fetched with async/await and AbortController:\n" + JSON.stringify(data, null, 2);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("Fetch aborted:", error.message);
        } else {
            console.error("Error with async/await and AbortController:", error);
        }
    }
}


// This function fetches data from multiple URLs in parallel using the Fetch API and handles errors appropriately.
// The function takes an array of URLs as an argument and returns the fetched data as JSON.
// If any of the responses are not OK (status code 200), it throws an error with the status code.
// If the fetch operation fails, it catches the error and logs it to the console.
// It also updates the results section of the HTML document with the fetched data or an error message.
// The function uses the AbortController to abort the requests after a specified timeout (2 seconds in this case).
// It also handles the AbortError separately to provide a clear message when the request is aborted.
// The function is designed to be run in a browser environment and interacts with the DOM.
async function fetchMultipleUrlsAbortErrorHandling(urls) {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
        controller.abort(); // Abort the request after 2 seconds
        console.log("Request aborted");
    }, 2000);

    try {
        console.log("Fetching multiple URLs in parallel with AbortController...");
        const fetchPromises = urls.map(url => fetch(url, { signal }).then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        }));
        const results = await Promise.all(fetchPromises);
        document.getElementById("results").innerText += "\nFetching multiple URLs in parallel with AbortController:\n" + JSON.stringify(results, null, 2);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("Fetch aborted:", error.message);
        } else {
            console.error("Error fetching multiple URLs with AbortController:", error);
        }
    }
}

// this function retry the request if it fails, up to a specified number of retries (default is 3).
// It uses the Fetch API to make a network request and returns the response as JSON.
// If the response is not OK (status code 200), it throws an error with the status code.
fetchWithRetryErrorHandling = async (url, retries = 3) => {
    console.log("Fetching data with retry logic...");
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            document.getElementById("results").innerText += "\nData fetched with retry logic:\n" + JSON.stringify(data, null, 2);
            return;
        } catch (error) {
            console.error(`Attempt ${i + 1} failed:`, error.message);
        }
    }
    console.error("All attempts failed.");
}


// This function fetches data from a given URL using the Fetch API and implements caching logic.
// It uses the Fetch API to make a network request and returns the response as JSON.
// If the response is not OK (status code 200), it throws an error with the status code.
// If the fetch operation fails, it catches the error and logs it to the console.
fetchWithCacheErrorHandling = async (url) => {
    console.log("Fetching data with cache logic...");
    const cacheKey = `cache-${url}`;
    const cachedResponse = localStorage.getItem(cacheKey);

    if (cachedResponse) {
        console.log("Using cached response");
        document.getElementById("results").innerText += "\nUsing cached response:\n" + cachedResponse;
        return JSON.parse(cachedResponse);
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        document.getElementById("results").innerText += "\nData fetched with cache logic:\n" + JSON.stringify(data, null, 2);
    } catch (error) {
        console.error("Error with cache logic:", error.message);
    }
}

// This function fetches data from a given URL using the Fetch API and implements timeout logic.
// It uses the Fetch API to make a network request and returns the response as JSON.
// If the response is not OK (status code 200), it throws an error with the status code.
// If the fetch operation fails, it catches the error and logs it to the console.
// It also handles the AbortError separately to provide a clear message when the request is aborted.
// The function is designed to be run in a browser environment and interacts with the DOM.
fetchWithTimeoutErrorHandling = async (url, timeout = 5000) => {
    console.log("Fetching data with timeout logic...");
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
        controller.abort(); // Abort the request after timeout
        console.error("Request timed out");
    }, timeout);

    try {
        const response = await fetch(url, { signal });
        clearTimeout(timeoutId); // Clear the timeout if the request completes successfully
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("results").innerText += "\nData fetched with timeout logic:\n" + JSON.stringify(data, null, 2);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("Fetch aborted:", error.message);
        } else {
            console.error("Error with timeout logic:", error.message);
        }
    }
}