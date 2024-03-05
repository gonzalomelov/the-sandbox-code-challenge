import { IsString, IsEnum, IsOptional } from 'class-validator';

enum OrderById {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetTutorialsQueryDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEnum(OrderById, {
    message: 'orderById must be one of ASC or DESC',
  })
  readonly orderById: string;
}
