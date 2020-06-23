import { Subject } from 'rxjs';
import { IMemoryHex } from './BoardUtils';

const onHoverCoordinate$ = new Subject<IMemoryHex[]>();

export const EventsService = {
    onHighlightCoordinates: () => {
        return onHoverCoordinate$;
    },
    highlightCoordinates: (coordinates: IMemoryHex[]) => {
        onHoverCoordinate$.next(coordinates);
    },
};
