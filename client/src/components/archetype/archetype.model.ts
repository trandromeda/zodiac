export interface IArchetype {
    id?: string;
    name: string;
    description: string;
    flavour: string;
    imageUrl: string;
    charges: number;
    turnType: 'instant' | 'turn';
}

type TurnType = 'instant' | 'turn';

class Archetype {
    // id: string;
    // name: string;
    // description: string;
    // flavour: string;
    // image: string;
    // charges: number;
    // turnType: TurnType;

    constructor(opts: IArchetype) {
        Object.assign(this, opts);
        // this.id = id;
        // this.name = name;
        // this.description = description;
        // this.flavour = flavour;
        // this.image = image;
        // this.charges = charges;
        // this.turnType = turnType;
    }
}

export default Archetype;
