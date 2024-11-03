import { date, enum as enum_, number, object, output, string } from 'zod';
import { BlockLevel, blockLevels, blockSublevels } from "~/db";

export const labels: Record<BlockLevel, string> = {
  'black': 'Noire',
  'blue': 'Bleue',
  'green': 'Verte',
  'red': 'Rouge',
  'white': 'Blanche',
  'yellow': 'Jaune',
};

export const backgroundColors: Record<BlockLevel, string> = {
  'black': 'bg-gray-900',
  'blue': 'bg-blue-500',
  'green': 'bg-green-500',
  'red': 'bg-red-500',
  'white': 'bg-gray-100',
  'yellow': 'bg-yellow-500',
};

export const textColors: Record<BlockLevel, string> = {
  'black': 'text-gray-100',
  'blue': 'text-blue-100',
  'green': 'text-green-100',
  'red': 'text-red-100',
  'white': 'text-gray-900',
  'yellow': 'text-yellow-100',
};

export const tallySchema = object({
  createdAt: date({ required_error: 'The date is required', invalid_type_error: 'The date must be a valid date' }),
  level: enum_(blockLevels),
  subLevel: enum_(blockSublevels).optional().default('I'),
  id: string().uuid(),
})

export type Tally = output<typeof tallySchema>;
