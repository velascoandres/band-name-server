import uuid from 'uuid';

export class Band {

    id: string;

    constructor(
       public name: string = 'no-name',
       public votes: number = 0,
    ) {
        this.id = uuid.v4(); // Identificador
    }

}