import { Model } from 'objection';

import Table from '../resources/enums/Table';
import UserRole from './UserRole';

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  roleId!: number;
  role?: UserRole;
  createdAt!: string;
  updatedAt!: string;

  static get tableName(): string {
    return Table.USERS;
  }
  
  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserRole,
      join: {
        from: 'users.role_id',
        to: 'roles.id'
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

export default User;
