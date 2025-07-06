export interface Airport {
  displayName: string;
  id: string;
}

export const airports: Record<string, Airport> = {
  '1': {
    displayName: 'Vienna International Airport (VIE)',
    id: '1',
  },
  '2': {
    displayName: 'Istanbul Airport (IST)',
    id: '2',
  },
  '3': {
    displayName: 'Almaty International Airport (ALA)',
    id: '3',
  },
};
