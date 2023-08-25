import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Genre} from "../entities/genre.entity";
import {Repository} from "typeorm";
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {GenreService} from "../services/genre.service";


@ValidatorConstraint({ name: 'GenreExists', async: true })
@Injectable()
export class GenreExistsValidator implements ValidatorConstraintInterface {

    constructor(
        protected readonly genreService: GenreService
    ) {}

    async validate(value: string[], validationArguments?: ValidationArguments) {
        try {
            if (value) {
                for (const slug of value) {
                    await this.genreService.getBySlugOrFail(slug)
                }
            }
        } catch (e) {
            return false
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid list of Genre`;
    }

}
