import { Tutorial } from './entities/tutorial.entity';
import { TUTORIAL_REPOSITORY } from '../../core/constants';

export const tutorialsProviders = [
  {
    provide: TUTORIAL_REPOSITORY,
    useValue: Tutorial,
  },
];
