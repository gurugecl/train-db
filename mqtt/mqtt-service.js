// import mqtt from 'mqtt';
// import WebSocket from 'ws';
//
// export function connectToType(server: MessageServerType, typeId: number) {
//     const {id} = server;
//     serverMap[id] = server;
//
//     const client = clientMap[id];
//     if (client) {
//         // already connected
//         subscribe(id, typeId);
//     } else {
//         const url = `mqtt://${server.host}:${server.port}`;
//         const options = {};
//         const client = mqtt.connect(url, options);
//         clientMap[id] = client;
//
//         client.on('connect', () => {
//             console.info(`MQTT server ${url} connected.`);
//             mqttConnected = true;
//             wsSend('MQTT connected');
//             subscribe(id, typeId);
//         });
//
//         client.on('message', handleMessage.bind(null, client));
//
//         client.on('close', () => {
//             console.info(`MQTT server ${url} connection closed.`);
//             if (mqttConnected) wsSend('MQTT closed');
//             mqttConnected = false;
//         });
//         client.on('error', err => {
//             console.error(`MQTT server ${url} error:`, err);
//         });
//         client.on('offline', () => {
//             console.info(`MQTT server ${url} is offline.`);
//         });
//         client.on('reconnect', () => {
//             console.info(`MQTT server ${url} reconnect started.`);
//         });
//     }
// }
//
// async function handleMessage(client, topic: string, message: Buffer) {
//     try {
//         const type = await getTopicType(topic);
//         if (!type) return;
//
//     }
//     catch (e) {
//         console.error('Server Error:', e.message);
//         console.error('Error Topic:', topic);
//     }
//
// }
//
// export function webSocketSetup() {
//     const wsServer = new WebSocket.Server({port: 1337});
//     console.info('waiting for WebSocket connection');
//     wsServer.on('connection', webSocket => {
//         console.info('got WebSocket connection to browser');
//         ws = webSocket;
//
//         ws.on('close', () => {
//             console.info('WebSocket connection to browser closed');
//             ws = null;
//         });
//
//         ws.on('error', error => {
//             if (error.code !== 'ECONNRESET') {
//                 console.error('WebSocket error:', error.code);
//             }
//         });
//
//         requestFeedback();
//     });
// }
//
// function wsSend(message: string): void {
//     if (ws) ws.send(message);
// }