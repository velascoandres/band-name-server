import { port } from '..';
import { Band } from '../models/band';
import { BandRepository } from '../repositories/band.repository';


export const socket = (server: any) => {

    const bandRepository: BandRepository = new BandRepository();
    bandRepository
        .addBand(new Band('Queen'))
        .addBand(new Band('Metallica'))
        .addBand(new Band('Iron Maiden'))
        .addBand(new Band('Bon Jovi'))
        .addBand(new Band('Soda Stereo'))

    console.table(bandRepository.bands);

    const io = require('socket.io')(server);
    io.on(
        'connection',
        (client: any) => {
            console.log('Cliente conectado');

            client.emit('active-bands', { bands: bandRepository.bands })

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
                'active-bands',
                (payload: any) => io.emit('active-bands', { bands: bandRepository.bands }),
            );

            client.on(
                'add-band',
                (payload: Band) => {
                    bandRepository.addBand(
                        new Band(payload.name,),
                    );
                    io.emit('active-bands', { bands: bandRepository.bands });
                }
            )

            client.on(
                'vote',
                (payload: { id: string }) => {
                    bandRepository.voteBand(payload.id);
                    io.emit('active-bands', { bands: bandRepository.bands });
                }
            );

            client.on(
                'delete-band',
                (payload: { id: string }) => {
                    bandRepository.deleteBand(payload.id);
                    io.emit('active-bands', { bands: bandRepository.bands });
                }
            )
        },

    );
    server.listen(
        port,
        () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        }
    );

};

