import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { GraphqlConfigModule } from './config/graphql.config';
import { EnvironmentModule } from './config/environment.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EnvironmentModule, GraphqlConfigModule, UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
