import fs from 'fs'; // Import the file system module
import express from 'express'; // Import the Express framework
import { formatBytes } from './utils.js'; // Import the formatBytes function from utils.js

const app = express(); // Create an Express application instance

// Route handler for the root path ('/')
app.get('/', (req, res) => {
    let counter = 1; // Counter for tracking chunk number

    // Create a readable stream for the 'readable.txt' file
    const readableStream = fs.createReadStream('files/readable.txt');

    // Event listener for 'data' events from the readable stream
    readableStream.on('data', (chunk) => {
        // Write the chunk data as a string to the response object
        res.write(chunk.toString());

        // Log information about the current chunk
        console.log(`Chunk No ${counter} of size ${formatBytes(chunk.length)}.`);
        counter++; // Increment the chunk counter
    });

    // Event listener for the 'end' event of the readable stream
    readableStream.on('end', () => {
        console.log('Finished reading the file');
        res.end(); // End the response after all data is sent
    });

    // Event listener for 'error' events from the readable stream
    readableStream.on('error', (err) => {
        console.error(err); // Log any errors encountered during reading
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});