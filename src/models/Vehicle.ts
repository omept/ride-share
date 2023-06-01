import { Model } from 'objection';

import Table from '../resources/enums/Table';

class Vehicle extends Model {
  id!: number;
  make!: string;
  model!: string;
  year!: string;
  color!: string;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.VEHICLES;
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export default Vehicle;
