import { Band } from '../models/band';

export class BandRepository {

    private _bands: Band[];


    constructor(
    ) {
        this._bands = [];
    }

    addBand(band: Band): BandRepository {
        this._bands.push(band);
        return this;
    }

    get bands(): Band[] {
        return this._bands;
    }

    deleteBand(id: string): void {
        this._bands = this._bands.filter(
            (band: Band) => band.id !== id,
        );
    }


    voteBand(id: string) {
        const index = this._bands.findIndex(
            band => band.id === id,
        );

        if (index) {
            this._bands[index].votes++;
        }
    }
}