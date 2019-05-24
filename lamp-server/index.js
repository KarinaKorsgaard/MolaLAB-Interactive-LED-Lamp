const puppeteer = require('puppeteer');
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 });

var options = {
    host: '127.0.0.1',
    port: 6454,
    refresh: 4000,
    sendAll: false,
    /*host (Default "255.255.255.255")
	port (Default 6454)
	refresh (millisecond interval for sending unchanged data to the Art-Net node. Default 4000)
	iface (optional string IP address - bind udp socket to specific network interface)
	sendAll (sends always the full DMX universe instead of only changed values. Default false)*/
}

var artnet = require('artnet')(options);

// set channel 1 to 255 and disconnect afterwards.
//artnet.set(1, 255, function (err, res) {
//    artnet.close();
//});


(async () => {

	const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
	const page = await browser.newPage();
	await page.goto('http://localhost:8081/');
	// await page.screenshot({path: 'example.png'});



	wss.on('connection', ws => {
	  ws.on('message', message => {
	  	// console.log('send')
	    // console.log(`Received message => ${message}`);
	  });
	  artnet.set(0, 1, [10, Math.floor(Math.random()*255), 255, 23], function (err, res) {
	    	console.log('send dmx')
		});
	  console.log('connected');
	  ws.send('ho!');
	});
	console.log("Started");



	// await browser.close();
})();


