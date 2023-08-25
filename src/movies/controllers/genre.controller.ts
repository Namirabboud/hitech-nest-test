import {Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {GenreService} from "../services/genre.service";
import {CreateGenreDto} from "../dto/create-genre.dto";
import {Genre} from "../entities/genre.entity";

@Controller('api/genre')
export class GenreController {
    constructor(private genreService: GenreService) {
    }

    @Get()
    async findAll(): Promise<Genre[]> {
        return await this.genreService.findAll()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto:CreateGenreDto) {
        return await this.genreService.create(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.genreService.delete(id)
    }
}
