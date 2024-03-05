import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { Tutorial } from './entities/tutorial.entity';
import { TutorialDto } from './dtos/tutorial.dto';
import { GetTutorialsQueryDto } from './dtos/getTutorialsQuery.dto';
import { TUTORIAL_REPOSITORY } from '../../core/constants';

@Injectable()
export class TutorialsService {
  constructor(
    @Inject(TUTORIAL_REPOSITORY)
    private readonly tutorialRepository: typeof Tutorial,
    private readonly jwtService: JwtService,
  ) {}

  async create(tutorial: TutorialDto): Promise<Tutorial> {
    return await this.tutorialRepository.create<Tutorial>({
      ...tutorial,
    });
  }

  async findAll(
    getTutorialsQueryDto: GetTutorialsQueryDto,
  ): Promise<Tutorial[]> {
    const options = { where: {}, order: [] };

    if (getTutorialsQueryDto.title) {
      options.where = {
        ...options.where,
        title: { [Op.like]: `%${getTutorialsQueryDto.title}%` },
      };
    }
    if (getTutorialsQueryDto.description) {
      options.where = {
        ...options.where,
        description: { [Op.like]: `%${getTutorialsQueryDto.description}%` },
      };
    }

    if (getTutorialsQueryDto.orderById) {
      options.order = [['id', getTutorialsQueryDto.orderById]];
    }

    return await this.tutorialRepository.findAll<Tutorial>(options);
  }

  async findOne(id): Promise<Tutorial> {
    return await this.tutorialRepository.findOne({
      where: { id },
    });
  }

  async delete(id) {
    return await this.tutorialRepository.destroy({ where: { id } });
  }

  async deleteAll() {
    return await this.tutorialRepository.destroy({ where: {} });
  }

  async update(id, data) {
    const model = { ...data };
    const [numberOfAffectedRows] = await this.tutorialRepository.update(model, {
      where: { id },
    });
    return { numberOfAffectedRows };
  }

  async generateToken() {
    // using an empty payload only to validate creation and expiration time
    const token = await this.jwtService.signAsync({});
    return token;
  }
}
