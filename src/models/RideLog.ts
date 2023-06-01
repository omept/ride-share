import { Model } from 'objection';

import Table from '../resources/enums/Table';

class RideLog extends Model {
  id!: number;
  rideId!: number;
  current_latitude!: string;
  current_longitude!: string;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.RIDE_LOGS;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default RideLog;
