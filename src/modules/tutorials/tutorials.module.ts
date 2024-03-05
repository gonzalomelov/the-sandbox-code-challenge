import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TutorialsService } from './tutorials.service';
import { TutorialsController } from './tutorials.controller';
import { tutorialsProviders } from './tutorials.providers';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.CREATE_TUTORIAL_TOKEN_EXPIRATION },
    }),
  ],
  providers: [TutorialsService, ...tutorialsProviders],
  controllers: [TutorialsController],
})
export class TutorialsModule {}
