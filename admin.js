const {kafka} = require("./client")

// connect admin
async function init() {
    const admin = kafka.admin();
    console.log('Admin connecting...');
    admin.connect();
    console.log('Admin Connected Success...');

    // create topics
    console.log('Creating Topic [rider-updates]')
    await admin.createTopics({
        topics: [
            {
            topic: "rider-updates",
            numPartitions: 2,
            },
    ],

    });
    console.log('Topic Created [rider-updates]');

    await admin.disconnect();
    console.log('Admin disconnected');
}

init();
