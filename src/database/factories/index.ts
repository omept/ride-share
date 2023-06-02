import * as rideFactory from './rideFactory';
import RideDetail from '../../domain/entities/RideDetail';

interface Callback<T> {
  run: () => Promise<T>;
}

export enum FactoryType {
  RIDE = 'Ride'
}

export interface Factories {
  [FactoryType.RIDE]: Callback<RideDetail>;
}

const factories: Factories = { [FactoryType.RIDE]: rideFactory };

export default factories;
