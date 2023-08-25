import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Genre} from "../entities/genre.entity";
import {Repository} from "typeorm";
import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import {GenreService} from "../services/genre.service";


@ValidatorConstraint({ name: 'GenreUnique', async: true })
@Injectable()
export class GenreUniqueValidator implements ValidatorConstraintInterface {

    constructor(
        protected readonly genreService: GenreService
    ) {}

    async validate(value: any, validationArguments?: ValidationArguments) {
        try {
            const exists = await this.genreService.getByName(value)
            if (exists) {
                return false
            }
        } catch (e) {
            return false
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Name is already taken`;
    }
}
