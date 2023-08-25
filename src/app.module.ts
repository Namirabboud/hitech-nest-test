import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Movie} from "./movies/entities/movie.entity";
import typeorm from './config/typeorm';
import {MoviesModule} from "./movies/movies.module";
import {LoggerMiddleware} from "./middlewares/logger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>  (config.get('typeorm'))
    }),
    MoviesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('/')
  }
}
