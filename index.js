let discord = require('discord-rpc'),
    winprocess = require('winprocess'),
    rp_id = '385716095702532096',
    image_key = 'cemu_logo';

let rpc = new discord.Client({
	transport: 'ipc'
});

function updateLoop() {
    let title = winprocess.getActiveWindowName(),
        params = title.match(/\](.*?)\[/g);

    if (!rpc || !params || !params[2]) return;

    title = params[2].substr(2);
    title = title.substr(0, title.length-2);
    
    let time = new Date();

    rpc.setActivity({
        details: 'Playing:',
        state: title,
        time,
        largeImageKey: image_key,
        largeImageText: undefined,
        instance: false,
    }).catch(error => {
        console.error(error)
    });
}

rpc.on('ready', () => {
	console.log(`Starting with rp_id ${rp_id}`);
	updateLoop();
	setInterval(() => {
		updateLoop();
	}, 500);
});

rpc.login(rp_id).catch(error => {
    console.error(error)
});