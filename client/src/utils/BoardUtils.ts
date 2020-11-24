import { isEqual, intersectionWith } from 'lodash';
import { HexUtils } from '@trandromeda/react-hexgrid';

export interface IHex {
    q: number;
    r: number;
    s: number;
}

export interface IMemoryHex extends IHex {
    memory?: string;
}

/**
 * @params currentHex - represents the starting point from which to find new hexes
 * @params existingHexes - hexes that are active and added to play. Has an upper limit
 * @params hexagons - represents every hexagon on the board
 */
export class BoardUtils {
    static getNextHex = (currentHex: IHex, existingHexes: IHex[], hexagons: IHex[]): IHex => {
        const neighbours: IHex[] = HexUtils.neighbours(currentHex);
        const randomAdjacentHex: IHex = neighbours[Math.floor(Math.random() * neighbours.length)];

        const hexExists = hexagons.some((hexagon: IHex) => isEqual(hexagon, randomAdjacentHex));
        const hexIsNew = !existingHexes.some((hexagon: IHex) => isEqual(hexagon, randomAdjacentHex));

        const newNeighbours = HexUtils.neighbours(randomAdjacentHex);
        const hexHasTwoNeighbours = existingHexes.length <= 6 ? true : intersectionWith(existingHexes, newNeighbours, isEqual).length >= 2;

        if (hexExists && hexIsNew && hexHasTwoNeighbours) {
            return randomAdjacentHex;
        } else {
            const randomHex = existingHexes[Math.floor(Math.random() * existingHexes.length)];
            return BoardUtils.getNextHex(randomHex, existingHexes, hexagons);
        }
    };

    static shuffle = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };
}
