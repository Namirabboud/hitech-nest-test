import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Movie} from "./entities/movie.entity";
import {Genre} from "./entities/genre.entity";
import {MovieService} from "./services/movie.service";
import {MovieController} from "./controllers/movie.controller";
import {GenreController} from "./controllers/genre.controller";
import {GenreService} from "./services/genre.service";
import {GenreUniqueValidator} from "./validators/genre-unique.validator";
import {GenreExistsValidator} from "./validators/genre-exists.validator";
import {LoggerMiddleware} from "../middlewares/logger.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie, Genre])
    ],
    controllers: [
        MovieController,
        GenreController
    ],
    providers: [
        MovieService,
        GenreService,
        GenreUniqueValidator,
        GenreExistsValidator
    ]
})

export class MoviesModule {}
