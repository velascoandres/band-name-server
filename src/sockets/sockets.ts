
// Mensajes de sockets
export function setupSockets(server: any, port: number | string) {
    const io = require('socket.io')(server);
    io.on(
        'connection',
        (client: any) => {
            console.log('Cliente conectado');
            client.on(
                'connect',
                () => {
                    console.log('conexion');
                },
            );
            client.on(
                'disconnect',
                () => {
                    console.log('disconnect');
                },
            );
            // evento mensaje
            client.on(
                'mensaje',
                (data: any) => {
                    console.log('mensaje: ', data);
                    io.emit('mensaje', { admin: 'Nuevo mensaje' });
                },
            );
        },

    );
    server.listen(
        port,
        () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        }
    );
    

}
