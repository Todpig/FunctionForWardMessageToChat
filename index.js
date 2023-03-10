const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

function sleep(time_ms) {
    // Delays the execution by x miliseconds
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time_ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getAllNumbers(infoGrupo) {
    let listaNumeros = [];
    infoGrupo.participants.forEach((membro) => {
        listaNumeros.push(membro);
    });
    return listaNumeros;
}

const client = new Client({
    puppeteer: {
        headless: false,
    },
    authStrategy: new LocalAuth({ clientId: 'test' })
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
    console.log("Conexão feita! Valeu boy.");
    console.log('Pegando todos os grupos')
    const userGroups = await client.getChats()

    client.on('message', async (msg) => {
        console.log('Peguei a mensagem')
        let waitTime = getRandomInt(3231, 4928)
        await sleep(waitTime)
        const opts = {};
        msgEdit = {};
        userGroups.map(async (chat) => {
            let waitTime = getRandomInt(3231, 4928)
            await sleep(waitTime)
            const opts = {}
            opts.mentions = getAllNumbers(chat)
            msg.forward(chat)
            let waitTime2 = getRandomInt(3231, 4928)
            await sleep(waitTime2)
            await chat.sendMessage("", opts, chat.id._serialized)           
        });
    });
});

client.initialize();