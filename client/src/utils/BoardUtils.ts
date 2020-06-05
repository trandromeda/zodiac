import { isEqual, intersectionWith } from 'lodash';
import { HexUtils } from '@trandromeda/react-hexgrid';

export interface IHex {
    q: number;
    r: number;
    s?: number;
}

export interface IMemoryHex extends IHex {
    memory?: string;
}

export class BoardUtils {
    static getNextHex = (firstHex: IHex, existingHexes: IHex[], hexagons: IHex[]): IHex => {
        const neighbours: IHex[] = HexUtils.neighbours(firstHex);
        const neighbour: IHex = neighbours[Math.floor(Math.random() * neighbours.length)];

        const hexExists = hexagons.some((hexagon: IHex) => isEqual(hexagon, neighbour));
        const hexIsNew = !existingHexes.some((hexagon: IHex) => isEqual(hexagon, neighbour));

        const newNeighbours = HexUtils.neighbours(neighbour);
        const hexHasTwoNeighbours = existingHexes.length <= 6 ? true : intersectionWith(existingHexes, newNeighbours, isEqual).length >= 2;

        if (hexExists && hexIsNew && hexHasTwoNeighbours) {
            return neighbour;
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
