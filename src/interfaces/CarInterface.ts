import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2),
  seatsQty: z.number().min(2),
});

export type Car = z.infer<typeof CarSchema>;

export { CarSchema };
