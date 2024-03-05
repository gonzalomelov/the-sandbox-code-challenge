import { IsNotEmpty, IsUrl, IsEnum } from 'class-validator';

import { PublishedStatus } from '../entities/tutorial.entity';

export class TutorialDto {
  @IsNotEmpty()
  readonly title: string;

  @IsUrl()
  readonly videoUrl: string;

  readonly description: string;

  @IsNotEmpty()
  @IsEnum(PublishedStatus, {
    message: 'publishedStatus must be one of draft, published or reviewed',
  })
  readonly publishedStatus: string;
}
