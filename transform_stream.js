import fs from 'fs'; // Import the file system module
import express from 'express'; // Import the Express framework
import { Transform } from 'stream'
import { formatBytes } from './utils.js';

const app = express(); // Create an Express application instance

// Route handler for the root path ('/')
app.get('/', (req, res) => {
    let counter = 1; // Counter for tracking chunk number

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toLowerCase());
            console.log({
                chunk_no: counter,
                chunk_size: formatBytes(chunk.length),
                chunk_type: encoding
            })
            counter++
            callback();
        }
    });

    const readableStream = fs.createReadStream('files/readable.txt');
    const writableStream = fs.createWriteStream('files/transform.txt');

    readableStream.pipe(transformStream).pipe(writableStream);

    readableStream.on('error', (err) => {
        console.error(err);
    });

    writableStream.on('finish', () => {
        console.log('Successfully transformed and wrote the file');
        res.send('Successfully transformed and wrote the file')
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});