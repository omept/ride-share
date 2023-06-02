import { Model } from 'objection';

import Table from '../resources/enums/Table';

class Ride extends Model {
  id!: number;
  customerId!: number;
  driverId!: number;
  fromLatitude!: string;
  toLatitude!: string;
  fromLongitude!: string;
  toLongitude!: string;
  destination!: string;
  startedFrom!: string;
  startedAt!: string;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.RIDES;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default Ride;
