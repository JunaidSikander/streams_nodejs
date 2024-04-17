import net from 'net'

const socket = net.createServer((client) => {
    console.log('Client connected');

    client.on('data', (data) => {
        console.log('Received data from client:', data.toString());
        client.write('Hello from the server!');
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });

    client.on('error', (err) => {
        console.error(err);
    });
}).listen(8080, () => {
    console.log('Server listening on port 8080');
});