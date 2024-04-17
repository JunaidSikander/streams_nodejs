import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    if (req.url === '/video.mp4') {
        const videoStream = fs.createReadStream('video.mp4'); // Readable stream

        res.writeHead(200, { 'Content-Type': 'video/mp4' }); // Set content type

        videoStream.on('data', (chunk) => {
            res.write(chunk); // Write data chunk to response
        });

        videoStream.on('end', () => {
            res.end(); // End response when all data is streamed
        });

        videoStream.on('error', (err) => {
            console.error(err);
            res.statusCode = 500;
            res.end('Error streaming video');
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});