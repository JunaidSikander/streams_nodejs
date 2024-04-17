import fs from 'fs'

const writableStream = fs.createWriteStream('files/writable.txt');

for (let i = 0; i <= 1_000_00; i++) {
    writableStream.write(`${i}.This is some text being written to the file.\n`);
}

writableStream.on('ready', () => {
    console.log('writing to the file started');
})
writableStream.on('finish', () => {
    console.log('Successfully wrote to the file');
});

writableStream.on('error', (err) => {
    console.error(err);
});

