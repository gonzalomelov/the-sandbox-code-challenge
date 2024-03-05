import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TutorialsService } from './tutorials.service';
import { Tutorial as TutorialEntity } from './entities/tutorial.entity';
import { TutorialDto } from './dtos/tutorial.dto';
import { GetTutorialsQueryDto } from './dtos/getTutorialsQuery.dto';
import { Roles } from '../../core/decorators/roles.decorator';
import { RolesGuard } from '../../core//guards/roles.guard';
import { UserRoles } from '../../modules/users/entities/user.entity';

@Controller('tutorials')
export class TutorialsController {
  constructor(private readonly tutorialService: TutorialsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() queryParams: GetTutorialsQueryDto) {
    // get all filtered tutorials in the db
    return await this.tutorialService.findAll(queryParams);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('token')
  async token(): Promise<{ token: string }> {
    const token = await this.tutorialService.generateToken();
    return { token: token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TutorialEntity> {
    // find the tutorial with this id
    const tutorial = await this.tutorialService.findOne(id);

    // if the tutorial doesn't exit in the db, throw a 404 error
    if (!tutorial) {
      throw new NotFoundException("This Tutorial doesn't exist");
    }

    // if tutorial exist, return the tutorial
    return tutorial;
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('customHeaderJwt'))
  @Roles(UserRoles.ADMIN)
  @Post()
  async create(@Body() tutorial: TutorialDto): Promise<TutorialEntity> {
    // create a new tutorial and return the newly created tutorial
    return await this.tutorialService.create(tutorial);
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRoles.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() tutorial: TutorialDto,
  ): Promise<TutorialEntity> {
    // get the number of row affected and the updated tutorial
    const { numberOfAffectedRows } = await this.tutorialService.update(
      id,
      tutorial,
    );

    // if the number of row affected is zero,
    // it means the tutorial doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Tutorial doesn't exist");
    }

    // return the updated tutorial
    return await this.tutorialService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRoles.ADMIN)
  @Delete('mass_delete')
  async deleteAll() {
    const deleted = await this.tutorialService.deleteAll();

    // return success message
    return `Successfully deleted ${deleted} elements`;
  }

  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    // delete the tutorial with this id
    const deleted = await this.tutorialService.delete(id);

    // if the number of row affected is zero,
    // then the tutorial doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Tutorial doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
