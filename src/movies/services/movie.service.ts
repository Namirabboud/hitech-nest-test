import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Movie} from "../entities/movie.entity";
import {Repository} from "typeorm";
import {CreateMovieDto} from "../dto/create-movie.dto";
import {GenreService} from "./genre.service";
import {UpdateMovieDto} from "../dto/update-movie.dto";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class MovieService {

    constructor(
        @InjectRepository(Movie)
        private moviesRepo: Repository<Movie>,
        protected readonly genreService: GenreService
    ) {}

    async findAll(): Promise<Movie[]> {
        return await this.moviesRepo.find({
            relations: {
                genres: true
            }
        })
    }

    async create(dto:CreateMovieDto) {
        return this.moviesRepo.save({
            title: dto.title,
            description: dto.description,
            release_date: dto.release_date,
            genres: await this.genreService.getListOfGenreBySlug(dto.genres)
        });
    }

    async update(id:string, dto:UpdateMovieDto) {
        return this.moviesRepo.save({
            id: id,
            ...(dto.title && {title: dto.title}),
            ...(dto.description && {description: dto.description}),
            ...(dto.release_date && {release_date: dto.release_date}),
            ...(dto.genres && {genres: await this.genreService.getListOfGenreBySlug(dto.genres)})
        })
    }

    async delete(id:string) {
        return this.moviesRepo.delete(id)
    }

    async paginate(options:IPaginationOptions, title?:string, genre?:string): Promise<Pagination<Movie>> {
        const qb = this.moviesRepo.createQueryBuilder('q')
        qb.orderBy('q.id', 'DESC')
        qb.leftJoinAndSelect('q.genres', 'r')
        if (title && genre) {
            qb.where("q.title ILIKE :title AND r.name ILIKE :genre", { title: `%${title}%`, genre: `%${genre}%` });
        } else if (title) {
            qb.where("q.title ILIKE :title", { title: `%${title}%` });
        } else if (genre) {
            qb.where("r.name ILIKE :genre", { genre: `%${genre}%` });
        }

        return paginate<Movie>(qb, options)
    }
}
