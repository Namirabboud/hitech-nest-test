import {IsNotEmpty, Validate} from "class-validator";
import {GenreUniqueValidator} from "../validators/genre-unique.validator";

export class CreateGenreDto {
    @IsNotEmpty()
    @Validate(GenreUniqueValidator)
    name: string
}
