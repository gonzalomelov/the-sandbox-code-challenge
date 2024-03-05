import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    defaultValue: 'user',
    values: [UserRoles.ADMIN, UserRoles.USER],
    allowNull: false,
  })
  role: string;
}
