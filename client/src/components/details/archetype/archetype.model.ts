export interface IArchetype {
    id?: string;
    name: string;
    description: string;
    flavour: string;
    charges: number;
    turnType: 'instant' | 'turn';
}

type TurnType = 'instant' | 'turn';

class Archetype {
    id = '';
    name = '';
    description = '';
    flavour = '';
    image = '';
    charges = 1;
    turnType: TurnType = 'turn';

    constructor(args: IArchetype) {
        Object.assign(this, args);
    }
}

export default Archetype;
