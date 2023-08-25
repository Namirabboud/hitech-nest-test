import {IsArray, IsDateString, IsNotEmpty, Validate} from "class-validator";
import {GenreExistsValidator} from "../validators/genre-exists.validator";

export class CreateMovieDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description:string

    @IsNotEmpty()
    @IsDateString()
    release_date:string

    @IsNotEmpty()
    @IsArray()
    @Validate(GenreExistsValidator)
    genres: string[]
}
