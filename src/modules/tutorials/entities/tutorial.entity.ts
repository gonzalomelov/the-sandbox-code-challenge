import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum PublishedStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  REVIEWED = 'reviewed',
}

@Table({ paranoid: true })
export class Tutorial extends Model<Tutorial> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  videoUrl: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: [
      PublishedStatus.DRAFT,
      PublishedStatus.PUBLISHED,
      PublishedStatus.REVIEWED,
    ],
    allowNull: false,
  })
  publishedStatus: string;
}
