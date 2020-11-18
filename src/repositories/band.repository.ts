import { Band } from '../models/band';

export class BandRepository {

    private _bands: Band[];


    constructor(
    ) {
        this._bands = [];
    }

    addBand(band: Band): void {
        this._bands.push(band);
    }

    get bands(): Band[] {
        return this.bands;
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
            this.bands[index].votes++;
        }
    }
}