import Dexie, { type EntityTable } from 'dexie';
import { Tally } from './types/tally';

export const blockLevels = ['yellow', 'green', 'blue', 'red', 'black', 'white'] as const;
export type BlockLevel = typeof blockLevels[number];

export const blockSublevels = ['I', 'II', '+'] as const;
export type BlockSublevel = typeof blockSublevels[number];

export const db = new Dexie('ClimbingStats') as Dexie & {
  tallies: EntityTable<Tally, 'id'>;
};

db.version(1).stores({
  tallies: 'id, createdAt, level',
});
