import { Band } from '../models/band';
import { BandRepository } from '../repositories/band.repository';

const bandRepository: BandRepository = new BandRepository();
bandRepository
    .addBand(new Band('Queen'))
    .addBand(new Band('Kiss'))
    .addBand(new Band('Metallica'))
    .addBand(new Band('Iron Maiden'))
    .addBand(new Band('Pantera'))
    .addBand(new Band('Bon Jovi'));

console.log(bandRepository.bands);

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
                    //io.emit('mensaje', { admin: 'Nuevo mensaje' });
                    io.emit('mensaje', { admin: 'Nuevo mensaje' });
                },
            );
            client.on(
                'emitir-mensaje', (payload: any) => {
                    console.log(payload);
                    // io.emit('nuevo-mensaje', payload); // Emite a todos
                    client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos al emisor
                }
            );

            client.on(
                'bands',
                (payload: any) => io.emit('bands', { bands: bandRepository.bands }),
            );

            client.on(
                'vote',
                (payload: { id: string }) => {
                    bandRepository.voteBand(payload.id);
                    io.emit('bands', { bands: bandRepository.bands });
                }
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
