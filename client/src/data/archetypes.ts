import { IArchetype } from 'src/components/archetype/archetype.model';
export const archetypes: IArchetype[] = [
    {
        id: 'innocent',
        name: 'Innocent',
        flavour: 'A tremendous power dwells beneath a tranquil sea',
        imageUrl: './images/innocent.jpg',
        description: 'Render a memory untouchable (by players and abilities) for the next 2 turns.',
        charges: 2,
        turnType: 'instant',
    },
    // {
    //     id: 'sage',
    //     name: 'Sage',
    //     flavour: '',
    //     imageUrl: './images/sage.jpg',
    //     description:
    //         'Choose and point at any memory. The Vessel will indicate to you with a Yes or No whether that memory and all adjacent memories are safe.',
    //     charges: 1,
    //     turnType: 'instant',
    // },
];
