import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Genre} from "../entities/genre.entity";
import {In, Repository} from "typeorm";
import {CreateGenreDto} from "../dto/create-genre.dto";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>
    ) {}

    async findAll(): Promise<Genre[]> {
        return await this.genreRepository.find()
    }

    async create(dto:CreateGenreDto) {
        return this.genreRepository.save({
            name: dto.name,
            slug: this.generateSlug(dto.name)
        });
    }

    async delete(id:string) {
        return this.genreRepository.delete(id)
    }

    async getByName(name:string) {
        return this.genreRepository.findOneBy({
            name: name
        })
    }

    async getBySlugOrFail(slug:string) {
        return this.genreRepository.findOneByOrFail({
            slug: slug
        })
    }

    async getListOfGenreBySlug(slugs:string[]) {

        return this.genreRepository.findBy({
            slug: In(slugs)
        })
    }

    private generateSlug(title:string) {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')  // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-')  // Replace spaces with hyphens
            .replace(/-+/g, '-')  // Replace consecutive hyphens with a single hyphen
            .trim();  // Remove leading and trailing spaces
    }
}
