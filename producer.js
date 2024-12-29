const { kafka } = require("./client");

// Import the readline module to handle user input/output in the terminal
const readline = require('readline');

// Create a readline interface for reading input and writing output to the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init() {
    const producer = kafka.producer();

    console.log('Connecting Producer');
    await producer.connect();
    console.log('Producer Connected Successfully');

    // Configure the prompt symbol ("> ") for user input
    rl.setPrompt("> ");
    // Display the prompt to the user
    rl.prompt();

    // Listen for input lines from the user
    rl.on("line", async function (line) {
        const [riderName, location] = line.split(" ");
        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({ name: riderName, location }),
                },
            ],
        });
        // Prompt the user for another input after sending the message
        rl.prompt();
    }).on("close", async () => {
        await producer.disconnect();
        console.log('Producer disconnected');
    });


}

init();
