import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param, ParseIntPipe,
    Post,
    Put, Query,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {Movie} from "../entities/movie.entity";
import {MovieService} from "../services/movie.service";
import {CreateMovieDto} from "../dto/create-movie.dto";
import {UpdateMovieDto} from "../dto/update-movie.dto";
import {IPaginationOptions} from "nestjs-typeorm-paginate";

@Controller('api/movies')
export class MovieController {

    constructor(private moviesService: MovieService) {}

    @Get()
    @UsePipes(new ValidationPipe())
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page:number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit:number = 10,
        @Query('title', new DefaultValuePipe(null)) title: string = null,
        @Query('genre', new DefaultValuePipe(null)) genre: string = null
    ) {

        const options: IPaginationOptions = {
            limit, page
        }
        return await this.moviesService.paginate(options, title, genre)
        // return await this.moviesService.findAll()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto:CreateMovieDto) {
        return await this.moviesService.create(dto)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() dto:UpdateMovieDto) {
        return await this.moviesService.update(id, dto)
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    async delete(@Param('id') id: string) {
        return await this.moviesService.delete(id)
    }

    @Get()
    async search(): Promise<Movie[]> {
        return await this.moviesService.findAll()
    }



}
