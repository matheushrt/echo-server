/* eslint-disable @typescript-eslint/camelcase */
import { Model } from 'objection';

export default class User extends Model {
  $beforeInsert(): void {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString();
  }

  created_at!: string;
  updated_at!: string;
  id!: string;
  display_name: string;
  email!: string;
  telegram_user_id!: number;
  href: string;
  image: string;
  product: string;
  type: string;
  uri: string;
  external_url: string;
  followers: number;

  // Table name is the only required property.
  static tableName = 'users';

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['id', 'email', 'telegram_user_id'],

    properties: {
      name: { type: ['string', 'null'] },
      email: { type: 'string', minLength: 10, maxLength: 100 },
      telegram_user_id: { type: 'integer' }
    }
  };
}
