var ws =require('nodejs-websocket');

var server=ws.createServer(function (conn) {
    console.log('connected ');
    conn.on('text',function (str) {
         sendtohe(str);
        console.log(str);
    });
    conn.on('error',function (err) {
        console.log(err);
    })
}).listen(2333);

function sendtohe(str) {
    server.connections.forEach(function (conn) {
        console.log(conn);
        conn.sendText(str)

    })
}