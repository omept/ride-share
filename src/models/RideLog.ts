import { Model } from 'objection';

import Table from '../resources/enums/Table';
import Ride from './Ride';

class RideLog extends Model {
  id!: number;
  rideId!: number;
  ride?: Ride;
  current_latitude!: string;
  current_longitude!: string;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.RIDE_LOGS;
  }
  
  static relationMappings = {
    ride: {
      relation: Model.BelongsToOneRelation,
      modelClass: Ride,
      join: {
        from: 'ride_logs.ride_id',
        to: 'rides.id'
      }
    },
  };

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default RideLog;
